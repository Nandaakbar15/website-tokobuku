/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

export default function DashboardAdmin() {
    
    useEffect(() => {
        document.title = "Toko Buku | Admin"
    }, [])

    return (
        <div className="container mt-5">
            <Sidebar/>
            <div className="row">
                <h1>Dashboard admin</h1>
            </div>
        </div>
    );
}