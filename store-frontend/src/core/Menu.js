import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#EEB76B" };
  } else {
    return { color: "#4F0E0E " };
  }
};
const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-pills justify-content-center  bg-dark secondaryBg ">
      <li className="nav-item fw-bolder">
        <Link style={currentTab(history, "/")} className="nav-link" to={"/"}>
          <span style={{ fontSize: "1.2rem" }}> Home</span>
        </Link>
      </li>
      <li className="nav-item fw-bolder">
        <Link
          style={currentTab(history, "/products")}
          className="nav-link"
          to="/products"
        >
          <span style={{ fontSize: "1.2rem" }}>Products</span>
        </Link>
      </li>
      <li className="nav-item fw-bolder">
        <Link
          style={currentTab(history, "/about-us")}
          className="nav-link"
          to="/about-us"
        >
          <span style={{ fontSize: "1.2rem" }}>About Us</span>
        </Link>
      </li>
      <li className="nav-item fw-bolder">
        <Link
          style={currentTab(history, "/contact-us")}
          className="nav-link"
          to="/contact-us"
        >
          <span style={{ fontSize: "1.2rem" }}>Contact Us</span>
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item fw-bolder" style={{ fontSize: "1.2rem" }}>
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            <i class="bi bi-person"></i> Admin
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item fw-bolder">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            <i class="bi bi-person" style={{ fontSize: "1.2rem" }}></i>
            Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item fw-bolder " style={{ fontSize: "1.2rem" }}>
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              SignIn
            </Link>
          </li>
          <li className="nav-item fw-bolder" style={{ fontSize: "1.2rem" }}>
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              SignUp
            </Link>
          </li>
        </Fragment>
      )}
      <li className="nav-item fw-bolder" style={{ fontSize: "1.2rem" }}>
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
          <i className="bi bi-cart-check"></i>
        </Link>
      </li>
      {isAuthenticated() && (
        <li className="nav-item" style={{ fontSize: "1.2rem" }}>
          <button
            className="nav-link text-dark fw-bolder"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Sign Out
          </button>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
