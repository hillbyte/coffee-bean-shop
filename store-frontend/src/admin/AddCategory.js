import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";
const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
        Back to Home
      </Link>
    </div>
  );
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend req fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };
  const successMessage = () => {
    if (success) {
      return <h5 className="text-success">Category added Successfully</h5>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h5 className="text-waring">failed to add Category</h5>;
    }
  };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead text-white">Enter category</p>
        <input
          type="text"
          onChange={handleChange}
          value={name}
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Expresso "
        />
        <button className="btn btn-sm btn-outline-success" onClick={onSubmit}>
          Add Category
        </button>
      </div>
    </form>
  );
  return (
    <Base title="" description="" className="container p-4">
      <h3 className="text-white text-center">Create new category</h3>
      <div className="row rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
