
# Coffee Bean E-commerce Store

An E-commerce app for Coffee Beans Selling with Payment gateway intregation.


## Features

- Payment Gateway Intregation
- Admin Dashboard
- Single Page App(SPA)
- Mobile responsive

  
## Tech Stack & Library

**Client:** React, React-Stripe-Checkout, Bootstrap

**Server:** Node, MongoDB, Express, Mongoose, JWT, Stripe, 

  
## Environment Variables

To run this project, you will need to add the following environment variables to your frontend and backend .env file

Backend env

`DB_URL`

`PRIVATE_STRIPE_KEY`

`SECRET=random string for jwt goes here`

Frontend env

`REACT_APP_BACKEND=localhost:8000/api`

`STRIPE_KEY=stripe publisable key goes here`


  
## Run Locally

Clone the project

```bash
  git clone https://github.com/hillbyte/coffee-bean-shop.git
```

Go to the project backend and frontend directory one by one

```bash
  cd store-backend
  cd store-frontend
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  node app.js
```

Start the frontend client
```bash
  npm start
```
  
## API Reference

#### Get all products

```http
  GET /api/products
```
#### Get a single product

```http
  GET /api/product/:productId
```
#### Create product

```http
  POST /api/product/create/:userId
```
#### Update product

```http
  PUT /api/product/:productId/:userId
```
#### Delete product

```http
  DELETE /api/product/:productId/:userId
```





  
### Other routes

There are more five routes available in backend 

Explore following routes by visiting backend routes dir

**auth route, user route, category route, order route, payment route**

