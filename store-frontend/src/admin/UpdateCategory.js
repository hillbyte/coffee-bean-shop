import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setName] = useState({
    name: "",
    category:"",
    error: "",
    formData: "",
  });
  const { name,category,error,formData } = values;

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
        setName({ ...values, error: data.error });
        return data.error;
      } else {
        setName({
          ...values,
          name: data.name,
          category:data.category,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
        Back to Home
      </Link>
    </div>
  );
  const handleChange = (name) => (event) => {
     const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setName({ ...values, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setName({ ...values });
    updateCategory(match.params.categoryId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setName({ ...values });
        } else {
          setName({
            ...values,
            category: "",
          });
        }
      }
    );
  };
  //   const successMessage = () => {
  //     if (success) {
  //       return <h5 className="text-success">Category updated Successfully</h5>;
  //     }
  //   };
  //   const errorMessage = () => {
  //     if (error) {
  //       return <h5 className="text-waring">failed to update Category</h5>;
  //     }
  //   };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead text-white">Enter category</p>
        <input
          type="text"
          onChange={handleChange("name")}
          value={name}
          className="form-control my-3"
          required
        />
        <button className="btn btn-outline-info" onClick={onSubmit}>
          Update Category
        </button>
      </div>
    </form>
  );
  return (
    <Base
      title="Update existing category"
      description=""
      className="container p-4"
    >
      <div className="row rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategory;
