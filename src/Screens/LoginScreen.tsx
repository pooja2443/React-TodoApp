import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.error("Please fill all the fields");
        } 
        else if (!validationEmail(email)) {
            toast.error("Invalid email format");
        }
        else if (!validationPass(pass)) {
            toast.error("Password must be at least 6 characters long");
        }
        else {

          const username = email.split('@')[0];

            toast.success("Login successful!");
            setEmail(""); 
            setPass(""); 

            navigate("/tasks", {state : { username }});
        }
    }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="headerRow">
        <h1>Welcome To SaleSwift</h1>
      </div>

      <p className="subtitle">
        Create an account and discover products anywhere you go
      </p>

      <p>Email :</p>
      <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>Password :</p>
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
      src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
      alt="Google"
      className="socialIcon"
    />
    </button>

    <button className="socialButton">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
        alt="Facebook"
        className="socialIcon"
      />
    </button>

    <button className="socialButton">
      <img
        src="https://cdn-icons-png.flaticon.com/512/0/747.png"
        alt="Apple"
        className="socialIcon"
      />
    </button>

      <button className="socialButton">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3256/3256013.png"
          alt="X"
          className="socialIcon"
        />
      </button>
    </div>

      <p className="registerText">
          Not registered?{" "}
          <button className="link" onClick={() => navigate('/signup')}>
            Register now
          </button>
      </p>

      <p className="termsText">
        By signing up you can acknowledge and agree to event.com 
        <a href="#" className="link"> General Terms of use </a> and 
        <a href="#" className="link"> Privacy Policy</a>
      </p>
    </div>
  );
};