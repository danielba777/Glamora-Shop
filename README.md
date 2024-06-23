# Glamora E-Commerce Fashion Store
> Full-featured e-commerce platform built with the MERN stack & Redux.

![Screenshot collection of the Glamora E-Commerce Fashion Store](https://ibb.co/QYDDf3G)

This is an e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and Redux for state management. The platform includes features such as product browsing, user authentication, product management for admins, and order management.

## Features

* Full-featured shopping cart
* Product pagination
* Product search feature
* User profile with orders
* Admin product management
* Admin user management
* Admin Order details page
* Mark orders as delivered option
* Checkout process (shipping, payment method, etc)
* PayPal / credit card integration
* Database seeder (products & users)

## Test User Accounts

```
# Normal User
john@email.com
Password: 123456

# Admin User
admin@email.com
Password: 123456
```

## Usage

* Create a MongoDB database and obtain your **MONGO_URI** 
* Create a PayPal Account and obtain your **Client_ID**

### .env - Variables
Rename the *example.env* to *.env* and add the following:

```
NODE_ENV=development
PORT=8000
MONGO_URI=YOUR_MONGO_URI_HERE
JWT_SECRET=YOUR_JWT_SECRET_HERE
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID_HERE
```

You can change the *JWT_SECRET* to a value you want to use as a secret key

### Install dependencies (frontend + backend)

```
npm install
cd frontend
npm install
```

### Run 

```
# Run frontend & backend
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

### Create frontend production build

```
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data.

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
