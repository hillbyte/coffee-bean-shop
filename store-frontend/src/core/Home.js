import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
  }, []);
  // console.log(process.env.REACT_APP_BACKEND);
  return (
    <Base title="" description="">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1582252852999-5ca546037481?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
              className="d-block w-100 img-carousel"
              style={{ height: "25rem" }}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Make Cafe-Like Coffee At Home</h1>
              <h5>
                Hi, we are Code Bean — home of the internet's favourite coffee.
              </h5>
            </div>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>

      <div className="row text-center my-2">
        <h3 className="text-white">Shop Now</h3>
        <div className="row" id="products">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-md-4 mb-2">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
