import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios/axios";

const PrivateRoute = (props) => {
  const [isAuth, setIsAuth] = useState(undefined);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get("/auth/isauthenticated", {
          withCredentials: true,
        });
        if (response.data.auth) setIsAuth(true);
        else setIsAuth(false);
      } catch (error) {
        setIsAuth(false);
      }
    }
    checkAuthentication();
  }, []);

  return (
    <>
      {isAuth === undefined && null}
      {isAuth !== undefined &&
        (isAuth ? props.children : <Navigate to="/login" />)}
    </>
  );
};

export default PrivateRoute;
