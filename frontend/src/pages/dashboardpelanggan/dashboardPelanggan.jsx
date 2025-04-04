/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";

export default function DashboardPelanggan() {
    return (
        <div className="container mt-5">
            <div className="row">
                <Navbar/>
                <Banner/>
                <h1>Dashboard Pelanggan</h1>

                <p>Mau mencari buku yang ingin kamu baca? Website ini adalah jawabannya!</p>
            </div>
        </div>
    );
}