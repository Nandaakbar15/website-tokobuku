/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BtnKembali, BtnTambah } from "../../../components/Button";
import Modal from "../../../components/Modal";

export default function FormTambahBuku() {
    useEffect(() => {
        document.title = "Toko Buku | Form Tambah Buku Admin"
    }, [])

    const [judulBuku, setJudulBuku] = useState("");
    const [penulis, setPenulis] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [gambar, setGambar] = useState(null);
    const [message, setMessage] = useState("");
    const [showModal, setModal] = useState(false);
    const navigate = useNavigate();

    const addBuku = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("judul_buku", judulBuku);
            formData.append("penulis", penulis);
            formData.append("penerbit", penerbit);
            formData.append("stok", stock);
            formData.append("harga", price);
            formData.append("gambar", gambar);


            const response = await axios.post("http://localhost:3000/api/admin/tambahdatabuku", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });

            setModal(true);
            setMessage(response.data.message);

            setJudulBuku("");
            setPenulis("");
            setPenerbit("");
            setPrice("");
            setStock("");
            setGambar(null);

            // Alihkan ke halaman tabel setelah 2 detik
            setTimeout(() => {
                setModal(false);
                navigate("/admin/databuku");  // Ganti dengan rute tabel game
            }, 2000);
        } catch(error) {
            console.error("Error : ", error);
            setMessage("Error! Could not add the data!");
        }
    }


    return (
        <>
            <div className="container mt-5">
                <Sidebar/>
                <div className="row">
                    <h1>Form Tambah Data buku</h1>

                    <form onSubmit={addBuku}>
                        <div className="mb-3">
                            <label htmlFor="judul_buku" className="form-label">Judul Buku</label>
                            <input type="text" className="form-control" id="judul_buku" name="judul_buku" onChange={(e) => setJudulBuku(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="penulis" className="form-label">Penulis</label>
                            <input type="text" className="form-control" id="penulis" name="penulis" onChange={(e) => setPenulis(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="penerbit" className="form-label">Penerbit</label>
                            <input type="text" className="form-control" id="penerbit" name="penerbit" onChange={(e) => setPenerbit(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="harga" className="form-label">Harga</label>
                            <input type="number" className="form-control" id="harga" name="harga" onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stok" className="form-label">Stok</label>
                            <input type="number" className="form-control" id="stok" name="stok" onChange={(e) => setStock(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gambar" className="form-label">Gambar</label>
                            <input type="file" className="form-control" id="gambar" name="gambar" onChange={(e) => setGambar(e.target.files[0])}/>
                        </div>
                        <div className="mb-3">
                            <BtnTambah/>
                        </div>

                        <Link to="/admin/databuku">
                                <BtnKembali/>
                        </Link>
                    </form>
                </div>
            </div>
            {showModal && <Modal show={showModal} onClose={() => setModal(false)} message={message} />}
        </>
    );
}