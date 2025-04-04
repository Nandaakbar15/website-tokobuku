/* eslint-disable no-unused-vars */
import React from "react";

export default function Navbar() {
    return (
        <>
            <div className="container">
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="/pelanggan/dashboardpelanggan">Toko Buku</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="/pelanggan/listbuku">Buku</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        </>
    );
}