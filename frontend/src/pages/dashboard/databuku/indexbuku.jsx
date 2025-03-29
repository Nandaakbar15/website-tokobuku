/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

export default function DataBukuAdmin() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAllBook();
    }, []);

    const getAllBook = async() => {
        try {
            const response = await axios.get("http://localhost:3000/api/admin/databuku");
            setBooks(Object.values(response.data.data));
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    return (
        <>
            <div className="container">
                <Sidebar/>
                <div className="row">
                <h1>Data Buku</h1>

                <h2><Link to={`/tambahdatabuku`} className="btn btn-primary">Tambah data buku</Link></h2>
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
                            <td>{book.harga}</td>
                            <td>
                                <Link to={`ubahdatabuku/${book.id_buku}`} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                                <button className="btn btn-danger">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                </div>
            </div>
        </>
    );
}