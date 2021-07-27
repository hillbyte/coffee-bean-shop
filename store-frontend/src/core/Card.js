import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setredirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const addToCart = () => {
    addItemToCart(product, () => setredirect(true));
  };
  const cardTitle = product ? product.name : " a photo";
  const cardDes = product ? product.description : " default des";
  const cardPrice = product ? product.price : "default price";
  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-sm btn-outline-success mt-2 mb-2"
        >
          <i className="bi bi-cart-check"></i>
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removefromCart) => {
    return (
      removefromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-sm btn-outline-danger mt-2 mb-2"
        >
          Remove fromCart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border">
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <h4 className="text-light text-start text-wrap fw-light">
          {cardTitle}
        </h4>

        <p className="fw-light text-wrap text-start">
          <span className="text-info">Details: </span> {cardDes}
        </p>
        <p className="text-start text-info fw-bold fs-5">Price: {cardPrice}$</p>
        <div className="row">
          <div className="col-12">
            <div className="d-grid gap-2 col-6 mx-auto">
              {showAddToCart(addtoCart)}
            </div>
          </div>
          <div className="col-12">{showRemoveFromCart(removefromCart)}</div>
        </div>
      </div>
    </div>
  );
};
export default Card;
