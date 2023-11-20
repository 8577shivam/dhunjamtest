import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { postApi } from "../apis/api";

const Auth = () => {
  const [userCred, setUserCred] = useState({ username: "", password: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "pwd") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserCred({ username, password }); // Update userCred with the actual values

    try {
      const response = await fetch(postApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response.status, response.statusText);
        return;
      }

      const result = await response.json();
      const { data } = result;
      console.log("Success:", data);

      // Redirect to Dashboard upon successful login
      // Note: Ensure that the 'Link' component is used appropriately in your routing setup
    } catch (error) {
      console.error("Error:", error.message);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="Signin-layout">
      <h1>Venue Admin Login</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="username-field field-container ">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="pwd-field field-container ">
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <FaEye />
        </div>
        {username && password ? (
          <button id="submit" type="submit">
            <Link to="Admin-Detail">Sign In</Link>
          </button>
        ) : (
          <button id="submit" type="submit" disabled>
            Sign In
          </button>
        )}
        <p className="signin-text">New Registration</p>
      </form>
    </div>
  );
};

export default Auth;
