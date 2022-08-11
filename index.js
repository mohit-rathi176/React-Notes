const express = require("express");
const app = express();

const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.log(err);
  });

// MongoDB store for storing sessions
const store = new MongoDBSession({
  uri: process.env.DB_CONNECTION,
  collection: "sessions",
});

// Import Routes
const authRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");

// Middlewares
app.use(
  session({
    name: "auth",
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    store: store,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});
