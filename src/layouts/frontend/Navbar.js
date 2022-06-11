import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        //axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/logout').then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
            });
       // });

    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token')){
        AuthButtons = (

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );
    }else{
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
                </li>
            </ul>
        );
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {AuthButtons}
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;