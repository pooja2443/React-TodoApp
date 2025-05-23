import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {

    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const validationEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validationPass = (pass: string) => {
        return pass.length >= 6;
    }

    const handleSubmit = () => {
        if(!email || !pass || !name) {
            toast.error("Please fill all the fields");
        } 
        else if (!validationEmail(email)) {
            toast.error("Invalid email format");
        }
        else if (!validationPass(pass)) {
            toast.error("Password must be at least 6 characters long");
        }
        else {
            toast.success("Sign up successful!");
            setEmail(""); 
            setPass(""); 
            setName("");
        }
    }

    return(
        <div className="container">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="headerRow">
                <h1>Create an accout</h1>
            </div>
            <p>Name:</p>
            <input type="text" placeholder="Name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
            <p>Email:</p>
            <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>Password:</p>
            <input type="password" placeholder="Password" className="input" value={pass} onChange={(e) => setPass(e.target.value)} />


            <button className="signInButton" onClick={handleSubmit}>Sign Up</button>


            <p className="registerText">
                Already registered?{" "}
                <button className="link" onClick={() => navigate('/')}>
                    SignIn
                </button>
            </p>

        </div>
    )
}