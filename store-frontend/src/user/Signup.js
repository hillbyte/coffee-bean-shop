import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("failed to signup"));
  };
  const signUpFrom = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            <h2 className="text-center">Create Account</h2>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                type="text"
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                onClick={onSubmit}
                className="btn btn-outline-success my-2"
                type="button"
              >
                <i class="bi bi-box-arrow-in-right"></i> SignUp
              </button>
            </div>
            <p className="text-light">
              Already have an account?
              <Link
                className="text-success fw-normal text-decoration-none"
                to="/signin"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account created successfully. Please{" "}
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="
    "
      description=""
    >
      {successMessage()}
      {errorMessage()}
      {signUpFrom()}
    </Base>
  );
};
export default Signup;
