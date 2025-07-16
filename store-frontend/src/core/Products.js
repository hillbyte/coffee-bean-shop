import React, { useState } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const { data: products = [], isLoading: loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort products
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const LoadingSkeleton = () => (
    <div className="flex flex-wrap -mx-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mb-6">
          <div className="bg-cream-100 rounded-2xl p-6 animate-pulse">
            <div className="bg-cream-300 h-48 rounded-xl mb-4"></div>
            <div className="bg-cream-300 h-4 rounded mb-2"></div>
            <div className="bg-cream-300 h-4 rounded w-3/4 mb-4"></div>
            <div className="bg-cream-300 h-10 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="bg-error-100 border border-error-300 text-error-700 px-6 py-4 rounded-lg inline-block max-w-md">
        <div className="flex items-center mb-2">
          <i className="bi bi-exclamation-triangle text-error-500 text-xl mr-2"></i>
          <p className="font-medium">Unable to load products</p>
        </div>
        <p className="text-sm">Please check your connection and try again</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary mt-4 text-sm"
        >
          <i className="bi bi-arrow-clockwise mr-2"></i>
          Retry
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-coffee-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className="bi bi-search text-coffee-500 text-3xl"></i>
      </div>
      <h3 className="text-xl font-semibold text-cream-100 mb-2">No products found</h3>
      <p className="text-cream-300 mb-4">
        Try adjusting your search or filter criteria
      </p>
      <button
        onClick={() => setSearchTerm("")}
        className="btn-secondary"
      >
        Clear Search
      </button>
    </div>
  );

  return (
    <Base
      title="Our Coffee Collection"
      description="Discover premium coffee beans from around the world, carefully selected and roasted to perfection."
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="bg-coffee-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="bi bi-search text-cream-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search coffee products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 bg-cream-100/90 text-coffee-800 placeholder-coffee-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <label className="text-cream-200 text-sm font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input bg-cream-100/90 text-coffee-800 min-w-0"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-cream-300 text-sm">
              {loading ? "Loading..." : `${filteredProducts.length} products`}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState />
        ) : filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex flex-wrap -mx-3 mb-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product._id || index}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mb-6 animate-fade-in"
                  style={{ animationDelay: `${(index % 8) * 0.1}s` }}
                >
                  <Card product={product} />
                </div>
              ))}
            </div>

            {/* Load More Button (if needed for pagination) */}
            {products.length > 20 && (
              <div className="text-center">
                <button className="btn-secondary">
                  <i className="bi bi-plus-circle mr-2"></i>
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}

        {/* Coffee Facts Section */}
        {!loading && !error && (
          <section className="mt-16 bg-coffee-800/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cream-100 mb-2">Why Choose Our Coffee?</h2>
              <p className="text-cream-300">Every bean tells a story of quality and craftsmanship</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-coffee-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-geo-alt text-cream-100 text-lg"></i>
                </div>
                <h4 className="font-semibold text-cream-100 mb-1">Origin Sourced</h4>
                <p className="text-cream-300 text-sm">Direct from coffee farms worldwide</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-coffee-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-fire text-cream-100 text-lg"></i>
                </div>
                <h4 className="font-semibold text-cream-100 mb-1">Fresh Roasted</h4>
                <p className="text-cream-300 text-sm">Roasted in small batches weekly</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-coffee-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-shield-check text-cream-100 text-lg"></i>
                </div>
                <h4 className="font-semibold text-cream-100 mb-1">Quality Tested</h4>
                <p className="text-cream-300 text-sm">Every batch cupped and approved</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-coffee-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-truck text-cream-100 text-lg"></i>
                </div>
                <h4 className="font-semibold text-cream-100 mb-1">Fast Shipping</h4>
                <p className="text-cream-300 text-sm">Delivered fresh to your door</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </Base>
  );
}
