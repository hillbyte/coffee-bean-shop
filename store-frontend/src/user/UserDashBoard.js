import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const userActions = [
    {
      title: "Browse Products",
      description: "Explore our coffee collection",
      icon: "bi-cup-hot",
      link: "/products",
      color: "bg-coffee-500"
    },
    {
      title: "Shopping Cart",
      description: "View items in your cart",
      icon: "bi-cart-check",
      link: "/cart",
      color: "bg-mocha-500"
    },
    {
      title: "Order History",
      description: "View your past orders",
      icon: "bi-clock-history",
      link: "#",
      color: "bg-success-500"
    }
  ];

  return (
    <Base
      title="My Dashboard"
      description="Welcome to your coffee journey"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-coffee-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-coffee-500 rounded-full flex items-center justify-center">
              <i className="bi bi-person-circle text-cream-100 text-2xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-cream-100">Welcome back, {name}!</h2>
              <p className="text-cream-300">{email}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-coffee-100 text-coffee-800 mt-2">
                <i className="bi bi-cup-hot mr-1"></i>
                Coffee Lover
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {userActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="card-modern p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <i className={`${action.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-coffee-800 group-hover:text-coffee-900">
                    {action.title}
                  </h3>
                  <p className="text-coffee-600 text-sm">{action.description}</p>
                </div>
                <i className="bi bi-arrow-right text-coffee-400 ml-auto group-hover:text-coffee-600 transition-colors duration-200"></i>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="card-modern p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-coffee-800">Recent Orders</h3>
              <button className="text-coffee-500 hover:text-coffee-600 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="text-center py-8">
              <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-receipt text-coffee-500 text-2xl"></i>
              </div>
              <p className="text-coffee-600">No orders yet</p>
              <p className="text-coffee-400 text-sm mt-1">Start shopping to see your orders here</p>
              <Link to="/products" className="btn-primary mt-4">
                <i className="bi bi-cup-hot mr-2"></i>
                Shop Now
              </Link>
            </div>
          </div>

          {/* Favorites */}
          <div className="card-modern p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-coffee-800">Favorite Products</h3>
              <button className="text-coffee-500 hover:text-coffee-600 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="text-center py-8">
              <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-heart text-coffee-500 text-2xl"></i>
              </div>
              <p className="text-coffee-600">No favorites yet</p>
              <p className="text-coffee-400 text-sm mt-1">Add products to your favorites for quick access</p>
              <Link to="/products" className="btn-secondary mt-4">
                <i className="bi bi-search mr-2"></i>
                Browse Products
              </Link>
            </div>
          </div>
        </div>

        {/* Coffee Tips */}
        <div className="mt-8">
          <div className="bg-coffee-800/30 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-cream-100 mb-2">Coffee Tips</h3>
              <p className="text-cream-300">Enhance your coffee experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-coffee-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-thermometer-half text-cream-100 text-lg"></i>
                </div>
                <h4 className="font-semibold text-cream-100 mb-1">Perfect Temperature</h4>
                <p className="text-cream-300 text-sm">Brew at 195-205°F for optimal extraction</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-coffee-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-clock text-cream-100 text-lg"></i>
                </div>
                <h4 className="font-semibold text-cream-100 mb-1">Brewing Time</h4>
                <p className="text-cream-300 text-sm">4-6 minutes for French press, 2-4 for pour over</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-coffee-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="bi bi-droplet text-cream-100 text-lg"></i>
                </div>
                <h4 className="font-semibold text-cream-100 mb-1">Water Quality</h4>
                <p className="text-cream-300 text-sm">Use filtered water for the best taste</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
