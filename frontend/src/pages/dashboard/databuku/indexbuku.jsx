/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Modal from "../../../components/Modal";

export default function DataBukuAdmin() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // Batasi jumlah data per halaman
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllBook();
    }, [page]);

    const getAllBook = async() => {
        try {
            const token = localStorage.getItem("token"); // ambil token dari localstorage
            const response = await axios.get(`http://localhost:3000/api/admin/databuku?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(Object.values(response.data.data));
            setTotalPages(response.data.totalPages);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const deleteBook = async(idBuku) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/admin/hapusdatabuku/${idBuku}`);
            setShowModal(true);
            setMessage(response.data.message);

            setTimeout(() => {
                setShowModal(false);
                navigate("/admin/databuku");
            }, 2000)
        } catch(error) {
            console.error("Error : ", error);
            setMessage("Error! Could not delete the data!");
        }
    }

    return (
        <>
            <div className="container mt-5">
                <Sidebar/>
                <div className="row">
                <h1>Data Buku</h1>

                <h2><Link to={`/admin/tambahdatabuku`} className="btn btn-primary">Tambah data buku</Link></h2>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Gambar</th>
                        <th scope="col">Judul Buku</th>
                        <th scope="col">Penulis</th>
                        <th scope="col">Penerbit</th>
                        <th scope="col">Stok</th>
                        <th scope="col">Harga</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id_buku}>
                            <td><img src={`http://localhost:3000/images/${book.gambar}`} alt="" width="100"/></td>
                            <td>{book.judul_buku}</td>
                            <td>{book.penulis}</td>
                            <td>{book.penerbit}</td>
                            <td>{book.stok}</td>
                            <td>Rp. {book.harga}</td>
                            <td>
                                <Link to={`/admin/ubahdatabuku/${book.id_buku}`} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteBook(book.id_buku)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                    <div className="pagination">
                            <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                                Previous
                            </button>
                            <span className="mx-3">Page {page} of {totalPages}</span>
                            <button className="btn btn-secondary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                                Next
                            </button>
                    </div>
                </div>
                {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
            </div>
        </>
    );
}