import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css files/Login-SignUp.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data === "Success") {
          // Fetch user details to determine the role
          axios
            .post("http://localhost:4000/getUserDetails", { email })
            .then((userDetails) => {
              const { designation } = userDetails.data;

              // Store the user's email and designation in localStorage
              localStorage.setItem("loggedInUserEmail", email);
              localStorage.setItem("loggedInUserDesignation", designation);

              // Redirect based on designation
              if (designation === "Employee") {
                navigate("/employeepage");
              } else if (designation === "User") {
                navigate("/userpage");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="full-screen-container">
      <div className="login-container1" id="loginContainer">
        <h1 className="login-title">Login</h1>
        <hr className="text-white" />
        <form className="form" id="signupForm" onSubmit={handleSubmit}>
          {/* Login form content */}
          <div className="input-group">
            <label htmlFor="signupEmail">Email</label>
            <input
              type="email"
              name="signupEmail"
              id="signupEmail"
              placeholder="Enter e-mail"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="createPassword">Enter Password</label>
            <input
              type="password"
              name="createPassword"
              id="createPassword"
              placeholder="Enter Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button mt-2">
            Login
          </button>
          <p className="text-center my-2 text-white">
            Not Registered?&nbsp;
            <Link to="/signup-role">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
