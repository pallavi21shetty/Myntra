import React, { useReducer, useState } from "react";
import axios from "axios";
import Navbar from "./navBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/userReducer";

const Login = () => {
  //user Login infomation
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      // navigate("/");
      // console.log(res.data.user);

      dispatch(login(res.data.user));

      setMessage("Login successful!");

      if (res?.data?.token) {
        // Store the token or other data
        localStorage.setItem("token", res?.data?.token);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div
      className="container mt-5  "
      style={{ background: "#fdefe7", height: "100vh", width: "100vw" }}
    >
      <Navbar />
      <div
        className="row justify-content-center "
        style={{ background: "#fdefe7" }}
      >
        <div className="col-md-6 mt-5 " style={{ background: "#fdefe7" }}>
          <div className="card  ">
            <div className="card-body">
              <h1 className="text-center">Login Page</h1>
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

                <button
                  type="submit"
                  className="btn  w-100"
                  style={{
                    backgroundColor: "#ff3f6c",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
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
