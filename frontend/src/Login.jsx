/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { BtnLogin } from './components/Button';

export default function LoginPage() {
    useEffect(() => {
        document.title = "Toko Buku | Login"
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [alert, setAlertType] = useState("");

    const Login = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/login", {
                email: email,
                password: password
            });
    
            const token = response.data.token;
            localStorage.setItem("token", token); // Simpan token di localStorage
    
            // Decode token untuk mendapatkan role
            const payload = JSON.parse(atob(token.split(".")[1])); 
            setRole(payload.role);
    
            if (payload.role === 'admin') {
                navigate("/admin/dashboardadmin");
            } else {
                navigate("/pelanggan/dashboardpelanggan");
            }
        } catch(error) {
            setAlertType("danger");
            setMessage("Error! Email or password is invalid!");
            console.error("Error : ", error);
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
                <h1>Login</h1>
                <form onSubmit={Login}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <BtnLogin/>

                <Link to="/register">Belum punya akun? Register aja!</Link>
                </form>
            </div>
        </div>
    );
}