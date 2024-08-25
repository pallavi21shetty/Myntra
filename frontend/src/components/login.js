import React, { useReducer, useState } from "react";
import axios from "axios";
import Navbar from "./navBar";
import { useNavigate } from "react-router-dom";
import userReducer from "../reducers/userReducer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const initialState = {
    isLoggedIn: false,
    userDetails: null,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
      setMessage("Login successful!");

      if (res?.data?.token) {
        // Store the token or other data
        localStorage.setItem("token", res?.data?.token);
        console.log(res.data);
      } else {
        navigate("/login");
      }

      const login = () => {
        const userData = { email: formData.email };
        dispatch({ type: "LOGIN", payload: userData });
      };
      login();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div className="container mt-5 w-100 h-100">
      <Navbar />
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 ">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              {/* Success and error messages */}
              {message && (
                <p className="mt-3 text-center text-success">{message}</p>
              )}
              {error && <p className="mt-3 text-center text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
