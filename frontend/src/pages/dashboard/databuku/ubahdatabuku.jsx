/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BtnUbah, BtnKembali } from "../../../components/Button";
import { useNavigate, useParams, Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Modal from "../../../components/Modal";


export default function FormUbahBuku() {
    const {id_buku} = useParams();
    const [judulBuku, setJudulBuku] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [penulis, setPenulis] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [gambar, setGambar] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getBookById = async() => {
            try {
                const response = await axios.get(`http://localhost:3000/api/admin/databuku/${id_buku}`);
                const {judul_buku, penerbit, penulis, stok, harga, gambar} = response.data.data;
                setJudulBuku(judul_buku);
                setPenerbit(penerbit);
                setPenulis(penulis);
                setStock(stok);
                setPrice(harga);
                setGambar(null);
                setPreview(gambar ? `http://localhost:3000/images/${gambar}` : null)
            } catch(error) {
                console.error("Error : ", error);
                setMessage("Error! Could not get the data with that ID!");
            }
        }

        getBookById();
    }, [id_buku])

    const updateBooks = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("judul_buku", judulBuku);
            formData.append("penerbit", penerbit);
            formData.append("penulis", penulis);
            formData.append("stok", stock);
            formData.append("harga", price);
            if(gambar) {
                formData.append("gambar", gambar);
            }

            const response = await axios.put(`http://localhost:3000/api/admin/ubahdatabuku/${id_buku}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/formdata'
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            setTimeout(() => {
                setShowModal(false);
                navigate("/admin/databuku");  // Ganti dengan rute tabel game
            }, 2000);
        } catch(error) {
            console.error("Error : ", error);
            setMessage("Error! Could not update the data!");
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setGambar(file);
        setPreview(URL.createObjectURL(file)); // Membuat preview dari file yang dipilih
    };

    return (
        <>
            <div className="container mt-5">
                <Sidebar/>
                <div className="row">
                    <h1>Form Ubah Data Buku</h1>

                    <form onSubmit={updateBooks}>
                        <div className="mb-3">
                            <label htmlFor="judul_buku" className="form-label">Judul Buku</label>
                            <input type="text" className="form-control" id="judul_buku" name="judul_buku"  value={judulBuku} onChange={(e) => setJudulBuku(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="penulis" className="form-label">Penulis</label>
                            <input type="text" className="form-control" id="penulis" name="penulis" value={penulis}  onChange={(e) => setPenulis(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="penerbit" className="form-label">Penerbit</label>
                            <input type="text" className="form-control" id="penerbit" name="penerbit" value={penerbit} onChange={(e) => setPenerbit(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="harga" className="form-label">Harga</label>
                            <input type="number" className="form-control" id="harga" name="harga" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stok" className="form-label">Stok</label>
                            <input type="number" className="form-control" id="stok" name="stok" value={stock} onChange={(e) => setStock(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gambar" className="form-label">Gambar</label>
                            {preview && (
                                <div>
                                    <img src={preview} alt="" width="100"/>
                                    <input type="file" className="form-control" id="gambar" name="gambar" onChange={handleFileChange} />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <BtnUbah/>
                        </div>

                        <Link to="/admin/databuku">
                                <BtnKembali/>
                        </Link>
                    </form>
                </div>
            </div>
            {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
        </>
    );
}