import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Area</h4>
        <ul className="list-group">
          <li class="list-group-item">
            <Link className="nav-link text-dark" to="/admin/create/category">
              Add Category
            </Link>
          </li>
          <li class="list-group-item">
            <Link className="nav-link text-dark" to="/admin/categories">
              Manage Categories
            </Link>
          </li>
          <li class="list-group-item">
            <Link className="nav-link text-dark" to="/admin/create/product">
              Add Product
            </Link>
          </li>
          <li class="list-group-item">
            <Link className="nav-link text-dark" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li class="list-group-item">
            <Link className="nav-link text-dark" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>

        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-info mr-2 text-dark">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info mr-2 text-dark">Email:</span>
            {email}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to Admin Area"
      description="Manage all of products here"
      className="container bg-secondary p-4"
    >
      <div className="row">
        <div className="col-md-4 mb-2">{adminLeftSide()}</div>
        <div className="col-md-8">{adminRightSide()}</div>
      </div>
    </Base>
  );
};
export default AdminDashBoard;
