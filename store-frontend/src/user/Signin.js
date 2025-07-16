import React, { useState } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth/helper'

const Signin = () => {
  const [values, setValues] = useState({
    email: 'anon@test.com',
    password: '123456',
    error: '',
    loading: false,
    didRedirect: false,
  })
  const { email, password, error, loading, didRedirect } = values
  const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true })
          })
        }
      })
      .catch(() => {
        setValues({ ...values, error: 'Network error. Please try again.', loading: false })
      })
  }

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  }

  return (
    <Base 
      title="Welcome Back!" 
      description="Sign in to your account to continue your coffee journey"
    >
      <div className="max-w-md mx-auto px-4">
        <div className="card-modern p-6">
          {performRedirect()}
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-coffee-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-person-circle text-cream-100 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-coffee-800 mb-2">Sign In</h2>
            <p className="text-coffee-600">Enter your credentials to access your account</p>
          </div>

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
                <span>Signing you in...</span>
              </div>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="form-label">
                <i className="bi bi-envelope mr-2"></i>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange('email')}
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
                placeholder="Enter your password"
                value={password}
                onChange={handleChange('password')}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cream-100 mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right mr-2"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-coffee-600 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-coffee-500 hover:text-coffee-600 font-medium transition-colors duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>

          {/* Demo Credentials Notice */}
          <div className="mt-6 bg-coffee-50 border border-coffee-200 rounded-lg p-4">
            <div className="flex items-start">
              <i className="bi bi-info-circle text-coffee-500 mr-2 mt-0.5"></i>
              <div>
                <p className="text-coffee-700 text-sm font-medium">Demo Credentials</p>
                <p className="text-coffee-600 text-xs mt-1">
                  Use the pre-filled credentials to test the application
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  )
}

export default Signin
