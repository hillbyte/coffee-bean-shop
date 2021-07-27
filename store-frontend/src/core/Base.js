import React, { Children } from "react";
import Menu from "../core/Menu";
import { Link } from "react-router-dom";

const Base = ({
  title = "my title",
  description = "my description",
  className = " text-white p-2",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className=" text-white text-center">
        <h2 className="text-light ">{title}</h2>
        <p className="">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer  mt-auto py-2 secondaryBg">
      <div className="container-fluid bg-dark text-white text-center py-3 secondaryBg">
        <h4>
          We'd love to help you!.If you got any questions,feel free to reach out
        </h4>

        <button className="btn btn-sm btn-outline-light">
          <Link className="text-warning text-decoration-none" to="/contact-us">
            Contact Us
          </Link>
        </button>
        <p className="text-center text-light">Made with ❤️ in India</p>
      </div>
    </footer>
  </div>
);
export default Base;
