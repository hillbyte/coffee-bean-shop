import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error });
        return data.error;
      } else {
        preloadCategories();

        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const preloadCategories = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const onSubmit = (event) => {
    //
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h5>{createdProduct} updated successfully</h5>
    </div>
  );
  const errorMessage = () => {
    if (error) {
      return <div className="alert alert-danger">failed to update product</div>;
    }
  };
  const updateProductForm = () => (
    <form>
      <span>Chose photo</span>
      <div className="form-group mb-2">
        <label className="btn  btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a photo"
          />
        </label>
      </div>
      <div className="form-group mb-2">
        <label class="form-label">Product Name</label>
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-2">
        <label class="form-label">Product Description</label>

        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-2">
        <label class="form-label">Price</label>

        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Chose Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-2">
        <label class="form-label">Stock</label>

        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      <div className="d-grid gap-2">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Update Product
        </button>
      </div>
    </form>
  );
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  const performRedirect = () => {
    if (getRedirect) {
      setTimeout(() => {
        return <Redirect to="/admin/dashboard" />;
      }, 2000);
    }
  };
  return (
    <Base title="" description="" className="container p-4 ">
      <h3 className="text-white text-center">Update Existing Product</h3>
      <Link to="/admin/dashboard" className="btn btn-sm btn-dark mb-3">
        Go to Home
      </Link>
      <div className="row text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}

          {loadingMessage()}
          {updateProductForm()}
          {errorMessage()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};
export default UpdateProduct;
