import React from "react";
import Base from "./Base";
import "../styles.css";

export default function AboutUs() {
  return (
    <Base title="" description="">
      <div className=" text-secondary px-5 py-5 text-center ">
        <div className="py-1">
          <h1 className="display-5 fw-bold text-light">About Us Code Bean</h1>
          <hr />
          <div className="col-lg-10 mx-auto">
            <p className="fs-5 mb-4 text-light">
              Code Bean will help you make cafe-like coffee at home. Be it a
              short break from work, or conversations with friends, we have
              flavours for all occasions.. <br /> <br /> Our mission is to help
              our community experience joy in life's simple pleasures one cup at
              a time. Slow down, relax and savour the moment.
            </p>

            <p className="text-center text-info">Made with ❤️ in India</p>
            <p className="text-center text-info">
              Say hello at hello@hillbaky.me
            </p>
          </div>
        </div>
      </div>
    </Base>
  );
}
