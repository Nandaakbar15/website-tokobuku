/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

export default function DataUser() {
    const [users, setUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async() => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/admin/datauser", {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });
            setUser(Object.values(response.data.data));
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const deleteUser = async(idUser) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/admin/hapusUser/${idUser}`);
            setShowModal(true);
            setMessage(response.data.message);

            setTimeout(() => {
                setShowModal(false);
                navigate("/admin/datauser");
            });
        } catch(error) {    
            console.error("Error :", error);
            setShowModal(true);
            setMessage("Error! Could not delete user data!");

            setTimeout(() => {
                setShowModal(false);
                navigate("/admin/datauser");
            });

        }
    }

    return (
        <>
            <div className="container mt-5">
                <Sidebar/>
                <div className="row">
                    <h1>Tabel Data User</h1>
                    <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
        </>
    );
}