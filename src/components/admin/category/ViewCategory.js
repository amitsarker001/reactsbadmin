import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get('api/view-category').then(res => {
            //console.log(res.data.category);
            if (res.status === 200) {
                setCategoryList(res.data.category);
            }
            setLoading(false);
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.target;
        thisClicked.innerText = "Deleting";
        axios.delete(`api/delete-category/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var viewCategoryHtmlTable = '';
    if (loading) {
        return (<h4>Loading category...</h4>);
    } else {
        viewCategoryHtmlTable = categoryList.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.category_name}</td>
                    <td>{item.category_code}</td>
                    <td>{item.description}</td>
                    <td>
                        <Link className="btn btn-warning text-white px-4" to={`/admin/edit-category/${item.id}`}>Edit</Link>
                        <button type="button" onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger px-4">Delete</button>
                    </td>
                </tr>
            )
        });
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
                            <div className="w-50 float-start">View Category</div>
                            <div className="float-end"><Link className="nav-link btn btn-primary text-white" to="/admin/add-category">Add</Link></div>
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
                                    {viewCategoryHtmlTable}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ViewCategory;