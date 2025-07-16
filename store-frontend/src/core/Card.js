import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAddToCart, useRemoveFromCart } from "../hooks/useCart";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCartMutation.mutateAsync({
        product,
        callback: () => setRedirect(true)
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCartMutation.mutateAsync(product._id);
      setReload(!reload);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const cardTitle = product ? product.name : "Coffee Product";
  const cardDescription = product ? product.description : "Premium coffee blend";
  const cardPrice = product ? product.price : "0";

  return (
    <div className="card-modern group overflow-hidden h-full flex flex-col">
      {getRedirect(redirect)}
      
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-2xl bg-cream-200">
        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
          <div className="w-40 h-40 overflow-hidden">
            <ImageHelper product={product} />
          </div>
        </div>
        
        {/* Quick Add Overlay (appears on hover) */}
        {addtoCart && (
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isLoading}
              className="btn-primary transform scale-90 group-hover:scale-100 transition-transform duration-200"
            >
              {addToCartMutation.isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                <>
                  <i className="bi bi-cart-plus mr-2"></i>
                  Quick Add
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Product Name */}
        <h3 className="text-xl font-semibold text-coffee-800 mb-2 line-clamp-2">
          {cardTitle}
        </h3>

        {/* Product Description */}
        <p className="text-coffee-600 text-sm mb-4 flex-1 line-clamp-3">
          {cardDescription}
        </p>

        {/* Price and Actions */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-coffee-800">
              ${cardPrice}
            </div>
            {product?.originalPrice && (
              <div className="text-sm text-coffee-400 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {addtoCart && (
              <button
                onClick={handleAddToCart}
                disabled={addToCartMutation.isLoading}
                className="w-full btn-primary flex items-center justify-center"
              >
                {addToCartMutation.isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cream-100 mr-2"></div>
                    Adding to Cart...
                  </div>
                ) : (
                  <>
                    <i className="bi bi-cart-check mr-2"></i>
                    Add to Cart
                  </>
                )}
              </button>
            )}

            {removefromCart && (
              <button
                onClick={handleRemoveFromCart}
                className="w-full btn-error flex items-center justify-center"
              >
                <i className="bi bi-trash mr-2"></i>
                Remove from Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Badge (if any) */}
      {product?.featured && (
        <div className="absolute top-4 left-4 bg-warning-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Featured
        </div>
      )}
      
      {product?.onSale && (
        <div className="absolute top-4 right-4 bg-error-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Sale
        </div>
      )}
    </div>
  );
};

export default Card;
