import { useState, useEffect } from 'react';

import './App.css';
// import axios from 'axios';
import axios from "./components/axios/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/notes/PrivateRoute';
import Navbar from './components/navbar/Navbar';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/notes/Home';

const App = () => {

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkIsAuth = async () => {
      try {
        const response = await axios.get(
          "/auth/isauthenticated",
          { withCredentials: true }
        );
        if (response.data.auth)
        {
          setIsAuthenticated(true);
          navigate("/home", { replace: true });
        }
        else
          setIsAuthenticated(false);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkIsAuth();
  }, [navigate]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        "/auth/logout",
        { withCredentials: true }
      );
      toast.dismiss();
      toast.success("Logged out successfully", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error('Some error occurred while logging out', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar auth={isAuthenticated} logout={logout} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
