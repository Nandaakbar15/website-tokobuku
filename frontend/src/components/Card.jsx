/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Card() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // Batasi jumlah data per halaman

    useEffect(() => {
        getAllBooks()
    }, [page]);

    const getAllBooks = async() => {
        try {
            const response = await axios.get(`http://localhost:3000/api/pelanggan/listbuku?page=${page}&limit=${limit}`);
            setBooks(Object.values(response.data.data));
            setTotalPages(response.data.totalPages);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                {books.map((book) => (
                    <div className="col-md-3" key={book.id_buku}>
                    <div className="card shadow-sm">
                        <Link to={`/pelanggan/detailbuku/${book.id_buku}`}><img src={`http://localhost:3000/images/${book.gambar}`} className="img-fluid card-img-top" alt={book.judul_buku} /></Link>
                        <div className="card-body text-center">
                            <h6 className="card-title">{book.judul_buku}</h6>
                            <p className="text-muted">{book.penulis}</p>
                            <div className="d-flex justify-content-between">
                                <small>Stock : {book.stok}</small>
                                <small>Rp. {book.harga}</small>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                </div>
            </div>
            <div className="pagination">
                <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span className="mx-3">Page {page} of {totalPages}</span>
                <button className="btn btn-secondary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
}