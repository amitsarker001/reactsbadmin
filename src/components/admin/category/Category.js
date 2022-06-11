import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Category() {

    const navigate = useNavigate();
    const [categoryInput, setCategory] = useState({
        category_name: '',
        category_code: '',
        description: '',
        is_active: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const categorySubmit = (e) => {
        e.preventDefault();
        const data = {
            category_name: categoryInput.category_name,
            category_code: categoryInput.category_code,
            description: categoryInput.description,
            is_active: categoryInput.is_active,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/store', data).then(res => {
                if (res.data.status === 200) {

                    swal("Success", res.data.message, "success");
                    document.getElementById('category-form').reset();
                    //navigate('/');
                }
                else {
                    setCategory({ ...categoryInput, error_list: res.data.validation_errors });
                }
            }).catch(error => {
                console.log(error);
            });
        });

    }

    var display_errors = [];
    if (categoryInput.error_list) {
        display_errors = [
            categoryInput.error_list.category_name,
            categoryInput.error_list.category_code,
            categoryInput.error_list.description,
        ];
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Category</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Category</li>
                </ol>
                <div className="card mb-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="w-50 float-start">Add Category</div>
                            <div className="float-end"><Link className="nav-link btn btn-primary text-white" to="/admin/view-category">View</Link></div>
                        </div>
                        {
                            display_errors.map((item) => {
                                // return (<li className="text-danger">{item}</li>)
                            })
                        }
                        <div className="card-body">
                            <form id="category-form" onSubmit={categorySubmit}>
                                <div className="mb-3 row">
                                    <label for="category_name" className="col-sm-2 col-form-label">Category Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="category_name" name="category_name" onChange={handleInput} value={categoryInput.category_name} className="form-control" placeholder="Category Name" />
                                        <span className="text-danger">{categoryInput.error_list.category_name}</span>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="category_code" className="col-sm-2 col-form-label">Category Code</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="category_code" name="category_code" onChange={handleInput} value={categoryInput.category_code} className="form-control" placeholder="Category Code" />
                                        <span className="text-danger">{categoryInput.error_list.category_code}</span>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea id="description" name="description" onChange={handleInput} value={categoryInput.description} className="form-control" placeholder="Description"></textarea>
                                        <span className="text-danger">{categoryInput.error_list.description}</span>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="is_active" className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <div className="form-check form-switch">
                                            <input type="checkbox" id="is_active" name='is_active' onChange={handleInput} value={categoryInput.is_active} className="form-check-input" />
                                            <span className="text-danger">{categoryInput.error_list.is_active}</span>
                                            <label className="form-check-label" for="flexSwitchCheckDefault">Is Active</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="" className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary px-4 float-end">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Category;