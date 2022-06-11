import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';

function EditCategory(props) {
    let { id } = useParams();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState({});
    const [error, setError] = useState({});
    useEffect(() => {
        const category_id = id;
        console.log(category_id);
        axios.get(`api/edit-category/${category_id}`).then(res => {
            console.log();
            if (res.data.status === 200) {
                setCategory(res.data.category);
            } else if (res.data.status === 404) {
                swal("error", res.data.message, "error");
                navigate('/admin/view-category');
            }
            setLoading(false);
        });
    }, [id, navigate]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const updateCategory = (e) => {
        e.preventDefault();
        const category_id = id;
        const data = categoryInput;
        axios.put(`/api/update-category/${category_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 400) {
                setError(res.data.validation_errors);
            }else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-category');
            }
        });
    }

    if (loading) {
        return (<h4>Loading category...</h4>);
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
                            <div className="w-50 float-start">Edit Category</div>
                            <div className="float-end"><Link className="nav-link btn btn-primary text-white" to="/admin/view-category">Back</Link></div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateCategory}>
                                <div className="mb-3 row">
                                    <label for="category_name" className="col-sm-2 col-form-label">Category Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="category_name" name="category_name" onChange={handleInput} value={categoryInput.category_name} className="form-control" placeholder="Category Name" />
                                        <span className="text-danger">{error.category_name}</span>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="category_code" className="col-sm-2 col-form-label">Category Code</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="category_code" name="category_code" onChange={handleInput} value={categoryInput.category_code} className="form-control" placeholder="Category Code" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea id="description" name="description" onChange={handleInput} value={categoryInput.description} className="form-control" placeholder="Description"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="is_active" className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <div className="form-check form-switch">
                                            <input type="checkbox" id="is_active" name='is_active' onChange={handleInput} value={categoryInput.is_active} className="form-check-input" />
                                            <label className="form-check-label" for="flexSwitchCheckDefault">Is Active</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="" className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
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

export default EditCategory;