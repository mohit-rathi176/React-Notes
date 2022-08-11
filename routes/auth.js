const router = require("express").Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const {
  registerValidation,
  loginValidation,
} = require("../validation/validate");

router.post("/register", async (req, res) => {
  // Validate registration data
  const joi_result = registerValidation(req.body);
  if (joi_result.error)
    return res.status(400).json({ error: joi_result.error.details[0].message });

  // Check if user is already registered
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const result = await user.save();
    res.status(201).json({ success: "Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Some error occurred" });
  }
});

router.post("/login", async (req, res) => {
  // Validate login data
  const joi_result = loginValidation(req.body);
  if (joi_result.error)
    return res.status(400).json({ error: joi_result.error.details[0].message });

  // Check if the user exists in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email does not exist" });

  // Check if password is correct
  const pass = await bcrypt.compare(req.body.password, user.password);
  if (!pass) return res.status(400).json({ error: "Incorrect password" });

  // If user details are correct, initialise session
  req.session.user = user;
  req.session.isAuth = true;
  res.status(200).json({ success: "Logged in successfully" });
});

router.get("/isauthenticated", (req, res) => {
  if (req.session.isAuth) res.status(200).json({ auth: true });
  else res.status(403).json({ auth: false });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).json({ error: "Some error occurred" });
    else res.status(200).json({ success: "Logged out successfully" });
  });
});

module.exports = router;
