import React, { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import Card from "./Card";
import { useCart } from "../hooks/useCart";
import StripeCheckout from "./StripeCheckout";

export default function Cart() {
  const { data: products = [], isLoading, error } = useCart();
  const [reload, setReload] = useState(false);

  // Calculate totals
  const getCartTotal = () => {
    return products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
  };

  const getItemCount = () => {
    return products.length;
  };

  const EmptyCart = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-coffee-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="bi bi-cart-x text-coffee-500 text-4xl"></i>
      </div>
      <h2 className="text-2xl font-bold text-cream-100 mb-4">Your cart is empty</h2>
      <p className="text-cream-300 mb-8 max-w-md mx-auto">
        Looks like you haven't added any coffee to your cart yet. 
        Discover our amazing selection of premium coffee beans.
      </p>
      <Link to="/products" className="btn-primary text-lg px-8 py-4">
        <i className="bi bi-cup-hot mr-2"></i>
        Shop Coffee
      </Link>
    </div>
  );

  const CartItems = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cream-100">
          Cart Items ({getItemCount()})
        </h2>
        <Link 
          to="/products" 
          className="text-coffee-300 hover:text-coffee-200 transition-colors duration-200 text-sm"
        >
          <i className="bi bi-plus-circle mr-1"></i>
          Continue Shopping
        </Link>
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <Card
              product={product}
              removefromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-coffee-800/50 backdrop-blur-sm rounded-2xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-cream-100 mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-cream-200">
            <span>Items ({getItemCount()})</span>
            <span>${getCartTotal()}</span>
          </div>
          <div className="flex justify-between text-cream-200">
            <span>Shipping</span>
            <span className="text-success-400">Free</span>
          </div>
          <div className="border-t border-coffee-700 pt-3">
            <div className="flex justify-between text-lg font-semibold text-cream-100">
              <span>Total</span>
              <span>${getCartTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Base 
      title="Shopping Cart" 
      description={products.length > 0 ? "Review your items and proceed to checkout" : "Your cart is currently empty"}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {products.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-2">
              <CartItems />
            </div>

            {/* Checkout Section - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="card-modern p-6">
                  <h3 className="text-xl font-semibold text-coffee-800 mb-6 text-center">
                    <i className="bi bi-credit-card mr-2"></i>
                    Secure Checkout
                  </h3>
                  
                  {/* Order Summary for Checkout */}
                  <div className="bg-coffee-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-coffee-600">Items:</span>
                      <span className="font-medium text-coffee-800">{getItemCount()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-coffee-600">Subtotal:</span>
                      <span className="font-medium text-coffee-800">${getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-coffee-600">Shipping:</span>
                      <span className="font-medium text-success-600">Free</span>
                    </div>
                    <div className="border-t border-coffee-200 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-coffee-800">Total:</span>
                        <span className="text-xl font-bold text-coffee-800">${getCartTotal()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stripe Checkout Component */}
                  <StripeCheckout products={products} setReload={setReload} />

                  {/* Security Notice */}
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center text-coffee-500 text-sm">
                      <i className="bi bi-shield-check mr-2"></i>
                      <span>Secure SSL encrypted payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products Section */}
        {products.length > 0 && (
          <section className="mt-16 bg-coffee-800/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cream-100 mb-2">You might also like</h2>
              <p className="text-cream-300">Complete your coffee experience with these recommendations</p>
            </div>
            
            <div className="text-center">
              <Link to="/products" className="btn-secondary">
                <i className="bi bi-eye mr-2"></i>
                Browse More Coffee
              </Link>
            </div>
          </section>
        )}
      </div>
    </Base>
  );
}
