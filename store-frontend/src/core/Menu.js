import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import { useCartItemCount } from "../hooks/useCart";

const Menu = ({ history }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useCartItemCount();

  const isCurrentPath = (path) => {
    return history.location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    signout(() => {
      history.push("/");
    });
    closeMobileMenu();
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick || closeMobileMenu}
      className={`nav-link-modern ${isCurrentPath(to) ? 'nav-link-active' : ''}`}
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick || closeMobileMenu}
      className={`block px-6 py-4 text-lg font-medium transition-colors duration-200 ${
        isCurrentPath(to) 
          ? 'bg-coffee-600 text-cream-100' 
          : 'text-cream-200 hover:bg-coffee-700 hover:text-cream-100'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-coffee-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-coffee-500 rounded-lg flex items-center justify-center">
                <span className="text-cream-100 font-bold text-lg">☕</span>
              </div>
              <span className="text-xl font-bold text-cream-100">Code Bean</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/about-us">About Us</NavLink>
              <NavLink to="/contact-us">Contact Us</NavLink>
              
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <NavLink to="/admin/dashboard">
                  <i className="bi bi-person mr-1"></i>Admin
                </NavLink>
              )}
              
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <NavLink to="/user/dashboard">
                  <i className="bi bi-person mr-1"></i>Dashboard
                </NavLink>
              )}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated() && (
              <Fragment>
                <NavLink to="/signin">Sign In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
              </Fragment>
            )}
            
            {/* Cart with badge */}
            <NavLink to="/cart">
              <div className="relative">
                <i className="bi bi-cart-check text-lg"></i>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-warning-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </NavLink>
            
            {isAuthenticated() && (
              <button
                onClick={handleSignOut}
                className="nav-link-modern text-error-400 hover:text-error-300"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-cream-500 hover:text-cream-500 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-coffee-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-coffee-900/95 backdrop-blur-sm">
            <div className="flex flex-col h-full">
              {/* Mobile header */}
              <div className="flex items-center justify-between p-4 border-b border-coffee-700">
                <Link to="/" onClick={closeMobileMenu} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-coffee-500 rounded-lg flex items-center justify-center">
                    <span className="text-cream-100 font-bold text-lg">☕</span>
                  </div>
                  <span className="text-xl font-bold text-cream-100">Code Bean</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md text-cream-500 hover:text-cream-500 hover:bg-coffee-700"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <MobileNavLink to="/">Home</MobileNavLink>
                  <MobileNavLink to="/products">Products</MobileNavLink>
                  <MobileNavLink to="/about-us">About Us</MobileNavLink>
                  <MobileNavLink to="/contact-us">Contact Us</MobileNavLink>
                  
                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <MobileNavLink to="/admin/dashboard">
                      <i className="bi bi-person mr-2"></i>Admin Dashboard
                    </MobileNavLink>
                  )}
                  
                  {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <MobileNavLink to="/user/dashboard">
                      <i className="bi bi-person mr-2"></i>User Dashboard
                    </MobileNavLink>
                  )}
                  
                  <MobileNavLink to="/cart">
                    <div className="flex items-center justify-between">
                      <span><i className="bi bi-cart-check mr-2"></i>Cart</span>
                      {cartItemCount > 0 && (
                        <span className="bg-warning-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </div>
                  </MobileNavLink>
                </div>

                {/* Mobile auth section */}
                <div className="border-t border-coffee-700 pt-4">
                  {!isAuthenticated() ? (
                    <div className="px-2 space-y-1">
                      <MobileNavLink to="/signin">Sign In</MobileNavLink>
                      <MobileNavLink to="/signup">Sign Up</MobileNavLink>
                    </div>
                  ) : (
                    <div className="px-2">
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-6 py-4 text-lg font-medium text-error-400 hover:bg-coffee-700 hover:text-error-300 transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default withRouter(Menu);
