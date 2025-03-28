/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { BtnRegister } from "./components/Button";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlertType] = useState("");
    const navigate = useNavigate();

    const Register = async(e) => {
        try {
            e.preventDefault();
            const response = await axios.post("http://localhost:3000/api/register", {
                username: username,
                email: email,
                password: password
            });

            setMessage(response.data.message);
            setAlertType("success");
            navigate("/login");

        } catch(error) {
            console.error("Error : ", error);
            setAlertType("danger");
            setMessage("Error! Could not register!");
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {message && (
                    <div className={`alert alert-${alert}`} role="alert">
                        {message}
                    </div>
                )}
                <h1>Register</h1>
                <form onSubmit={Register}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <BtnRegister/>

                <Link to='/login'>Udah punya akun? Langsung login aja!</Link>
                </form>
            </div>
        </div>
    );
}