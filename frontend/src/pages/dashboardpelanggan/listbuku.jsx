/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";

export default function ListBuku() {
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