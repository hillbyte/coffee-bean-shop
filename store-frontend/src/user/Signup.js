import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });
  const { name, email, password, error, success, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch(() => {
        setValues({ ...values, error: "Network error. Please try again.", loading: false });
      });
  };

  return (
    <Base 
      title="Join Code Bean" 
      description="Create your account and start your coffee journey with us"
    >
      <div className="max-w-md mx-auto px-4">
        <div className="card-modern p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-coffee-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-person-plus text-cream-100 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-coffee-800 mb-2">Create Account</h2>
            <p className="text-coffee-600">Join our community of coffee lovers</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-6 animate-slide-down">
              <div className="flex items-center">
                <i className="bi bi-check-circle text-success-500 mr-2"></i>
                <span className="font-medium">Account created successfully!</span>
              </div>
              <p className="mt-1 text-sm">
                Please{' '}
                <Link 
                  to="/signin" 
                  className="text-success-600 hover:text-success-700 font-medium underline"
                >
                  sign in here
                </Link>
                {' '}to continue.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6 animate-slide-down">
              <div className="flex items-center">
                <i className="bi bi-exclamation-triangle text-error-500 mr-2"></i>
                <span className="font-medium">Error:</span>
              </div>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-coffee-50 border border-coffee-200 text-coffee-700 px-4 py-3 rounded-lg mb-6 animate-slide-down">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-coffee-500 mr-2"></div>
                <span>Creating your account...</span>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="form-label">
                <i className="bi bi-person mr-2"></i>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={handleChange("name")}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">
                <i className="bi bi-envelope mr-2"></i>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange("email")}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">
                <i className="bi bi-lock mr-2"></i>
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={handleChange("password")}
                className="form-input"
                required
                disabled={loading}
                minLength="6"
              />
              <p className="text-coffee-500 text-xs mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !name || !email || !password}
              className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cream-100 mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus mr-2"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-coffee-600 text-sm">
              Already have an account?{' '}
              <Link 
                to="/signin" 
                className="text-coffee-500 hover:text-coffee-600 font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Terms Notice */}
          <div className="mt-6 bg-coffee-50 border border-coffee-200 rounded-lg p-4">
            <p className="text-coffee-600 text-xs text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Signup;
