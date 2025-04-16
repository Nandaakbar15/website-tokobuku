/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { BtnKembali } from "../../components/Button";

export default function DetailBuku() {
    const {id_buku} = useParams();
    const [judulBuku, setJudulBuku] = useState("");
    const [penulis, setPenulis] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [gambar, setGambar] = useState("");

    useEffect(() => {
        document.title = "Toko Buku | Detail Buku"

        const getAllBooksById = async() => {
            try  {
                const response = await axios.get(`http://localhost:3000/api/pelanggan/detailBuku/${id_buku}`);
                const {judul_buku, penulis, penerbit, stok, harga, gambar} = response.data.data;
                setJudulBuku(judul_buku);
                setPenulis(penulis);
                setPenerbit(penerbit);
                setStock(stok);
                setPrice(harga);
                setGambar(gambar);
            } catch(error) {
                console.error("Error : ", error);
            }
        }

        getAllBooksById();
    },[id_buku])

    return (
        <>
            <div className="container">
                <div className="row">
                <Navbar/>
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        {gambar && (
                            <img
                                src={`http://localhost:3000/images/${gambar}`}
                                className="img-fluid rounded-start"
                                alt={judulBuku}
                            />
                        )}
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{judulBuku}</h5>
                            <p className="card-text">Penulis: {penulis}</p>
                            <p className="card-text">Penerbit: {penerbit}</p>
                            <p className="card-text">Harga: Rp. <small className="text-muted">{price}</small></p>
                            <p className="card-text">Stok buku: <small className="text-muted">{stock}</small></p>
                        </div>
                        </div>
                        <div className="mt-5">
                        <Link to={'/pelanggan/listbuku'}>
                            <BtnKembali/>
                        </Link>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    ); 
}