/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";

export default function ListBuku() {
    useEffect(() => {
        document.title = "Toko Buku | List Buku"
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <Navbar/>
                    <Banner/>
                    <Card/>
                </div>
            </div>
        </>
    )
}