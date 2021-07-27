import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Products() {
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
      <div className="row text-center my-2">
        <h3 className="text-white">Shop Now</h3>
        <div className="row" id="products">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-2">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
