import React from "react";
import Base from "./Base";
import "../styles.css";

export default function ContactUs() {
  return (
    <Base title="" description="">
      <div className="text-center col-lg-10 mx-auto">
        <h1>Contact Us</h1>
        <p>
          There is nothing we love more than hearing back from you. We would be
          happy to help. Call us at: +910101010101. <br /> You can also Email
          at: ahillbaky@gmail.com
        </p>
        <hr />
     
      </div>
      <div className="">
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="col-md-12">
            <label className="form-label">Phone Number</label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-12">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name=""
              id=""
              cols="5"
              rows="5"
            ></textarea>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-outline-success">
              SEND
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
