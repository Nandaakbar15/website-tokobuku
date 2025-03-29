/* eslint-disable no-unused-vars */
import React from "react";

export default function Sidebar() {
    return (
       <>
       <div className="container">
        <div className="sidebar" id="sidebar">
                <h4>Toko Buku Admin</h4>
                <ul className="nav flex-column mt-3">
                    <li className="nav-item"><a href="/admin/datauser" className="nav-link text-white">Data user</a></li>
                    <li className="nav-item"><a href="/admin/databuku" className="nav-link text-white">Data Buku</a></li>
                </ul>
        </div>  
       </div>
       </>
    );
}