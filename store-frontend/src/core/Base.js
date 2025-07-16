import React from "react";
import Menu from "../core/Menu";
import { Link } from "react-router-dom";

const Base = ({
  title = "",
  description = "",
  className = "",
  children,
  showHeader = true,
}) => (
  <div className="min-h-screen flex flex-col">
    <Menu />
    
    <main className="flex-1">
      {/* Page Header */}
      {showHeader && (title || description) && (
        <header className="bg-gradient-to-r from-coffee-800 to-coffee-700 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {title && (
              <h1 className="text-2xl md:text-3xl font-bold text-cream-100 mb-3 animate-fade-in">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-base text-cream-200 max-w-2xl mx-auto animate-slide-up">
                {description}
              </p>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <div className={`${className || 'max-w-7xl mx-auto px-4 py-6'}`}>
        {children}
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-coffee-900 border-t border-coffee-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-coffee-500 rounded-lg flex items-center justify-center">
                <span className="text-cream-100 font-bold text-lg">☕</span>
              </div>
              <span className="text-xl font-bold text-cream-100">Code Bean</span>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed">
              Crafting perfect coffee experiences, one cup at a time. 
              From bean to brew, we're here to elevate your coffee journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-cream-100 font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/products" 
                className="block text-cream-300 hover:text-cream-100 transition-colors duration-200"
              >
                Shop Coffee
              </Link>
              <Link 
                to="/about-us" 
                className="block text-cream-300 hover:text-cream-100 transition-colors duration-200"
              >
                About Us
              </Link>
              <Link 
                to="/contact-us" 
                className="block text-cream-300 hover:text-cream-100 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-cream-100 font-semibold mb-4">Get in Touch</h3>
            <p className="text-cream-300 text-sm mb-4">
              We'd love to help you! If you have any questions, feel free to reach out.
            </p>
            <Link 
              to="/contact-us"
              className="inline-flex items-center px-4 py-2 bg-coffee-600 hover:bg-coffee-500 text-cream-100 rounded-lg transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-coffee-800 pt-8 text-center">
          <p className="text-cream-400 text-sm">
            Made with ❤️ in India | © {new Date().getFullYear()} Code Bean. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Base;
