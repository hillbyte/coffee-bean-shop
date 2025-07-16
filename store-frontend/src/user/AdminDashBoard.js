import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminActions = [
    {
      title: "Categories",
      description: "Manage product categories",
      icon: "bi-tags",
      color: "bg-coffee-500",
      actions: [
        { label: "Add Category", link: "/admin/create/category", icon: "bi-plus-circle" },
        { label: "Manage Categories", link: "/admin/categories", icon: "bi-list-ul" }
      ]
    },
    {
      title: "Products", 
      description: "Manage coffee products",
      icon: "bi-cup-hot",
      color: "bg-mocha-500",
      actions: [
        { label: "Add Product", link: "/admin/create/product", icon: "bi-plus-circle" },
        { label: "Manage Products", link: "/admin/products", icon: "bi-grid" }
      ]
    },
    {
      title: "Orders",
      description: "View and manage orders", 
      icon: "bi-receipt",
      color: "bg-success-500",
      actions: [
        { label: "Manage Orders", link: "/admin/orders", icon: "bi-clipboard-check" }
      ]
    }
  ];

  return (
    <Base
      title="Admin Dashboard"
      description="Manage your coffee store efficiently"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-coffee-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-coffee-500 rounded-full flex items-center justify-center">
              <i className="bi bi-person-gear text-cream-100 text-2xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-cream-100">Welcome back, {name}!</h2>
              <p className="text-cream-300">{email}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800 mt-2">
                <i className="bi bi-shield-check mr-1"></i>
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-modern p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-coffee-100 rounded-lg flex items-center justify-center mr-4">
                <i className="bi bi-cup-hot text-coffee-600 text-xl"></i>
              </div>
              <div>
                <p className="text-coffee-600 text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold text-coffee-800">--</p>
              </div>
            </div>
          </div>
          
          <div className="card-modern p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mr-4">
                <i className="bi bi-receipt text-success-600 text-xl"></i>
              </div>
              <div>
                <p className="text-coffee-600 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-coffee-800">--</p>
              </div>
            </div>
          </div>
          
          <div className="card-modern p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mr-4">
                <i className="bi bi-tags text-warning-600 text-xl"></i>
              </div>
              <div>
                <p className="text-coffee-600 text-sm font-medium">Categories</p>
                <p className="text-2xl font-bold text-coffee-800">--</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {adminActions.map((section, index) => (
            <div key={index} className="card-modern overflow-hidden">
              {/* Section Header */}
              <div className={`${section.color} p-6 text-white`}>
                <div className="flex items-center space-x-3">
                  <i className={`${section.icon} text-2xl`}></i>
                  <div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <p className="text-sm opacity-90">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="p-6">
                <div className="space-y-3">
                  {section.actions.map((action, actionIndex) => (
                    <Link
                      key={actionIndex}
                      to={action.link}
                      className="flex items-center p-3 rounded-lg hover:bg-coffee-50 transition-colors duration-200 group"
                    >
                      <div className="w-10 h-10 bg-coffee-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-coffee-200 transition-colors duration-200">
                        <i className={`${action.icon} text-coffee-600`}></i>
                      </div>
                      <div>
                        <p className="font-medium text-coffee-800 group-hover:text-coffee-900">
                          {action.label}
                        </p>
                      </div>
                      <i className="bi bi-arrow-right text-coffee-400 ml-auto group-hover:text-coffee-600 transition-colors duration-200"></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <div className="card-modern p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-coffee-800">Recent Activity</h3>
              <button className="text-coffee-500 hover:text-coffee-600 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-clock-history text-coffee-500 text-2xl"></i>
              </div>
              <p className="text-coffee-600">No recent activity to display</p>
              <p className="text-coffee-400 text-sm mt-1">Activity will appear here as you manage your store</p>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
