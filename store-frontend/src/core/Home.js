import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import Card from "./Card";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { data: products = [], isLoading: loading, error } = useProducts();

  return (
    <Base showHeader={false} className="">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582252852999-5ca546037481?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Coffee beans and brewing equipment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Craft Perfect Coffee
            <span className="block text-yellow-400">At Home</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
            Hi, we are <span className="font-semibold text-yellow-300">Code Bean</span> —
            home of the internet's favorite coffee. From bean to brew, we bring café-quality
            coffee to your kitchen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="btn-primary px-6 py-3"
            >
              Shop Coffee Collection
            </Link>
            <Link
              to="/about-us"
              className="btn-outline px-6 py-3"
            >
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-b from-coffee-900 to-coffee-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
              Featured Coffee
            </h2>
            <p className="text-lg text-cream-300 max-w-2xl mx-auto">
              Discover our handpicked selection of premium coffee beans,
              carefully sourced and roasted to perfection.
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-wrap -mx-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <div className="bg-cream-100 rounded-2xl p-6 animate-pulse">
                    <div className="bg-cream-300 h-48 rounded-xl mb-4"></div>
                    <div className="bg-cream-300 h-4 rounded mb-2"></div>
                    <div className="bg-cream-300 h-4 rounded w-3/4 mb-4"></div>
                    <div className="bg-cream-300 h-10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-error-100 border border-error-300 text-error-700 px-4 py-3 rounded-lg inline-block">
                <p className="font-medium">Unable to load products</p>
                <p className="text-sm mt-1">Please try refreshing the page</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-4">
              {products.slice(0, 6).map((product, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card product={product} />
                </div>
              ))}
            </div>
          )}

          {/* View All Products Button */}
          {products.length > 6 && (
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="btn-secondary text-lg px-8 py-4"
              >
                View All Products
                <i className="bi bi-arrow-right ml-2"></i>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-coffee-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8 text-center">
              <div className="w-16 h-16 bg-coffee-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-award text-2xl text-cream-100"></i>
              </div>
              <h3 className="text-xl font-semibold text-cream-100 mb-2">Premium Quality</h3>
              <p className="text-cream-300">
                Carefully selected beans from the world's finest coffee regions
              </p>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8 text-center">
              <div className="w-16 h-16 bg-coffee-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-truck text-2xl text-cream-100"></i>
              </div>
              <h3 className="text-xl font-semibold text-cream-100 mb-2">Fast Delivery</h3>
              <p className="text-cream-300">
                Fresh coffee delivered to your door within 2-3 business days
              </p>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8 text-center">
              <div className="w-16 h-16 bg-coffee-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-heart text-2xl text-cream-100"></i>
              </div>
              <h3 className="text-xl font-semibold text-cream-100 mb-2">Made with Love</h3>
              <p className="text-cream-300">
                Every cup is crafted with passion and attention to detail
              </p>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
