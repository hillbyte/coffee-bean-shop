import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div className="text-white">
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removefromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div className="text-white">
        <h1>Payment Section</h1>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row ">
        <div className="col-sm-6">{loadAllProducts()}</div>
        <div className="col-sm-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
}
