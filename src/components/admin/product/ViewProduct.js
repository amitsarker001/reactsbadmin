import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    document.title = 'VIew Product';
    useEffect(() => {
        axios.get('api/view-product').then(res => {
            //console.log(res.data.product);
            if (res.status === 200) {
                setProductList(res.data.product);
            }
            setLoading(false);
        });
    }, []);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        const thisClicked = e.target;
        thisClicked.innerText = "Deleting";
        axios.delete(`api/delete-product/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var viewProductHtmlTable = '';
    if (loading) {
        return (<h4>Loading product...</h4>);
    } else {
        viewProductHtmlTable = productList.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.category.category_name}</td>
                    <td>{item.product_name}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} alt={item.product_name} /></td>
                    <td>
                        <Link className="btn btn-warning text-white px-4" to={`/admin/edit-product/${item.id}`}>Edit</Link>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger px-4">Delete</button>
                    </td>
                </tr>
            )
        });
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
                            <div className="w-50 float-start">View Product</div>
                            <div className="float-end"><Link className="nav-link btn btn-primary text-white" to="/admin/add-product">Add</Link></div>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <th scope="row">Code</th>
                                        <th scope="row">Description</th>
                                        <th scope="row">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewProductHtmlTable}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ViewProduct;