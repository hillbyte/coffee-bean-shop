import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { createOrder } from "./helper/OrderHelper";
import { Link } from "react-router-dom";
import StripeCheckoutCard from "react-stripe-checkout";
import { API, STRIPE_KEY } from "../backend";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        const orderData = {
          products: products,
          // transaction_id: response.transaction.id,
          // amount: response.transaction.amount,
        };
        createOrder(userId, token, orderData);
        cartEmpty(() => {
          console.log("Did got a crash");
        });
        setReload(!reload);

        console.log(response);
        //storing order data
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutCard
        stripeKey="pk_test_51HRuDgLzOiFxUrYZyD0RHvKblQEKEyquwnnw8Dm8wyrDmEC0npaRPJBVwSg3xEFmJQdbV2KuSjJeFfaDW7EEq0V600H5JCfZwD"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Coffee"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay Securely With Stripe</button>
      </StripeCheckoutCard>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Please Sign in to checkout</button>
      </Link>
    );
  };
  return (
    <div>
      <h3>Your final billing amount is {getFinalAmount()} $</h3>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
