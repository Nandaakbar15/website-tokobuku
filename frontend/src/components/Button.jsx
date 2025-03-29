/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function Button({children}) {
    return (
        <div className="button-body">
            {children}
        </div>
    );
}

export function BtnLogin() {
    return (
        <div className="button-login">
            <button className="btn btn-primary">Login</button>
        </div>
    );
}

export function BtnRegister() {
    return (
        <div className="button-register">
            <button className="btn btn-primary">Register</button>
        </div>
    );
}

export function BtnTambah() {
    return (
        <div className="button-add">
            <button className="btn btn-primary">Tambah</button>
        </div>
    );
}