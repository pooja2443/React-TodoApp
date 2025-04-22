import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const validationEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validationPass = (pass: string) => {
        return pass.length >= 6;
    }

    const handleSubmit = () => {
        if(!email || !pass) {
            console.log("fill the fields");
        } 
        else if (!validationEmail(email)) {
            console.log("invalid email format");
        }
        else if (!validationPass(pass)) {
            console.log("Invalid password");
        }
        else {
            console.log("Login Successfull!");
            setEmail(""); 
            setPass(""); 
            navigate("/tasks");
        }
    }

  return (
    <div className="container">
      <div className="headerRow">
        <h1>Welcome To SaleSwift</h1>
      </div>

      <p className="subtitle">
        Create an account and discover products anywhere you go
      </p>

      <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="input" value={pass} onChange={(e) => setPass(e.target.value)} />

      <div className="rememberRow">
        <label className="checkboxLabel">
          <input type="checkbox" /> Remember me
        </label>
        <a href="#" className="link">Forgot Password</a>
      </div>

      <button className="signInButton" onClick={handleSubmit}>Sign In</button>

      <div className="orSection">
        <hr />
        <span>or continue with</span>
        <hr />
      </div>

      <div className="socialContainer">
        <button className="socialButton">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="socialIcon"
          />
        </button>

        <button className="socialButton">
          <img
            src="https://www.facebook.com/favicon.ico"
            alt="Facebook"
            className="socialIcon"
          />
        </button>

        <button className="socialButton">
          <img
            src="https://www.apple.com/favicon.ico"
            alt="Apple"
            className="socialIcon"
          />
        </button>

        <button className="socialButton">
          <img
            src="https://twitter.com/favicon.ico"
            alt="X"
            className="socialIcon"
          />
        </button>
      </div>

      <p className="registerText">
        Not registered? <a href="#" className="link">Register now</a>
      </p>

      <p className="termsText">
        By signing up you can acknowledge and agree to event.com 
        <a href="#" className="link"> General Terms of use </a> and 
        <a href="#" className="link"> Privacy Policy</a>
      </p>
    </div>
  );
};