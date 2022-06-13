import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct(props) {
    let { id } = useParams();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [productInput, setProduct] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [errorList, setError] = useState([]);

    useEffect(() => {
        const product_id = id;
        //console.log(category_id);
        axios.get(`api/edit-product/${product_id}`).then(res => {
            //console.log();
            if (res.data.status === 200) {
                setProduct(res.data.product);
            } else if (res.data.status === 404) {
                swal("error", res.data.message, "error");
                navigate('/admin/view-product');
            }
            setLoading(false);
        });
    }, [id, navigate]);

    // const [productInput, setProduct] = useState({
    //     category_id: '',
    //     product_name: '',
    //     is_active: '',
    // });
    const [picture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] });
    }

    useEffect(() => {
        axios.get('api/all-category').then(res => {
            if (res.status === 200) {
                setCategoryList(res.data.category);
            }
            setLoading(false);
        });
    }, []);

    const updateProduct = (e) => {
        e.preventDefault();
        const product_id = id;
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('product_name', productInput.product_name);
        formData.append('is_active', productInput.is_active);

        axios.post(`/api/update-product/${product_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 400) {
                setError(res.data.validation_errors);
            }else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-product');
            }
        });
    }

    const updateProduct1 = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('product_name', productInput.product_name);
        formData.append('is_active', productInput.is_active);

        axios.post('/api/store-product', formData).then(res => {
            if(res.data.status === 200){
                swal("Success", res.data.message, "success");
                errorList([]);
                document.getElementById('product-form').reset();
            }else if(res.data.status === 400){
                swal("All The Fields are Mandatory.", res.data.message, "error");
                setError(res.data.validation_errors);
            }
        });
    }

    if (loading) {
        return (<h4>Loading Product...</h4>);
    }

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Product</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Product</li>
                </ol>
                <div className="card mb-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="w-50 float-start">Edit Product</div>
                            <div className="float-end"><Link className="nav-link btn btn-primary text-white" to="/admin/view-product">View</Link></div>
                        </div>
                        <div className="card-body">
                            <form id="product-form" onSubmit={updateProduct} encType="multipart/form-data">
                                <div className="mb-3 row">
                                    <label htmlFor="category_id" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select id='category_id' name="category_id" onChange={handleInput} value={productInput.category_id} className="form-select">
                                            <option>Please Select</option>
                                            {
                                                categoryList.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.category_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <span className="text-danger">{errorList.category_id}</span>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="product_name" className="col-sm-2 col-form-label">Product Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="product_name" name="product_name" onChange={handleInput} value={productInput.product_name} className="form-control" placeholder="Product Name" />
                                        <span className="text-danger">{errorList.product_name}</span>

                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="is_active" className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Image</label>
                                            <input type="file" id="formFile" name="image" onChange={handleImage} className="form-control" />
                                            <span className="text-danger">{errorList.image}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="is_active" className="col-sm-2 col-form-label">Is Active</label>
                                    <div className="col-sm-10">
                                        <input type="checkbox" id="is_active" name="is_active" onChange={handleInput} value={productInput.is_active}  />
                                        <span className="text-danger">{errorList.is_active}</span>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="" className="col-sm-2 col-form-label"></label>
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

export default EditProduct;