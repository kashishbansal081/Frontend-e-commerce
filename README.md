# DesiKart

A full-stack e-commerce web application that allows users to browse product categories, filter products, manage wishlist and cart, select delivery addresses, and place orders successfully.  
Built using a React frontend, Node.js/Express backend, and MongoDB database.

---

## Demo Link

[Live Demo](https://frontend-e-commerce-iota-nine.vercel.app/)

---

## Quick Start

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev      # or `npm start`
```

---

## Technologies Used

### Frontend
- React JS
- React Router

### Backend
- Node.js
- Express

### Database
- MongoDB

---

## Environment Setup

Create a `.env` file in the root of your backend directory and add the following variables:

```
MONGODB=your_mongodb_connection_string
```

Replace the values with your own configuration details.

Make sure MongoDB is running locally or provide a valid MongoDB Atlas connection string.

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:  
[Demo Video Link](https://drive.google.com/file/d/1vnlAMuKR0tK6dkgcff7DfE0VEU0FlSt3/view)

---

## Features

### Home
- Displays a list of product categories for easy navigation.
- Allows users to navigate to sections such as Mobiles, Clothing, and other categories.

### Product Listing
- Displays all products based on the selected category.
- Provides advanced filtering options including:
  - Filtering by rating.
  - Filtering by price.
  - Filtering by brand.
  - Sorting products from low to high price.
  - Sorting products from high to low price.

### Product Details
- Displays complete product information including highlights and specifications.
- Allows users to select available sizes.
- Allows users to choose product quantity.
- Enables users to add products to their wishlist.
- Enables users to add products to their cart.
- Shows estimated delivery time.

### Wishlist
- Allows users to add products to their favourite section.
- Stores wishlist data in MongoDB.
- Enables users to remove products from the wishlist.
- Allows users to move wishlist items directly to the cart.

### Cart Management
- Allows users to add products to the cart.
- Enables users to update product quantity.
- Allows users to remove individual cart items.
- Enables users to clear the entire cart.
- Allows users to proceed to checkout.

### Delivery Address
- Allows users to select a delivery address.
- Enables users to remove previously saved addresses.
- Stores address information per user.

### Order Placement
- Allows users to place orders successfully.
- Displays order summary in the profile section after successful order placement.

---

## API Reference

### **GET /v1/api/products**  
Retrieves all products.

Sample Response:
```
{
  "data": [
    {
      "_id": "68de3178577cb2b833f2d8e3",
      "productName": "Apple iPhone 16 (Black, 128 GB)",
      "productPrice": 56999,
      "productRating": 4.6,
      "productBrandName": "iPhone"
    }
  ]
}
```

---

### **GET /v1/api/product/:productId**  
Retrieves details of a specific product.

Sample Response:
```
{
  "data": {
    "_id": "6906039d014ad09cb05614b6",
    "productName": "realme TechLife 7 kg Washing Machine",
    "productPrice": 7790,
    "productRating": 4.2,
    "productBrandName": "Realme"
  },
  "msg": "Data has been read successfully."
}
```

---

### **GET /v1/api/category**  
Retrieves all product categories.

Sample Response:
```
{
  "data": [
    {
      "_id": "68da528776a945642e4fa1cc",
      "name": "Mobiles"
    }
  ]
}
```

---

### **POST /v1/api/wishlist**  
Adds a product to the wishlist.

Sample Response:
```
{
  "success": true,
  "products": [...]
}
```

---

### **DELETE /v1/api/wishlist/:productId**  
Removes a product from the wishlist.

Sample Response:
```
{
  "success": true,
  "products": [...]
}
```

---

### **POST /v1/api/cart/updateItem**  
Adds or updates a cart item.

Sample Response:
```
{
  "success": true,
  "msg": "Item added/updated successfully.",
  "data": [...]
}
```

---

### **DELETE /v1/api/cart/items**  
Removes a specific item from the cart.

Sample Response:
```
{
  "success": true,
  "msg": "Item removed successfully from cart"
}
```

---

### **GET /v1/api/address/:userId**  
Retrieves user delivery addresses.

Sample Response:
```
{
  "address": [...]
}
```

---

## Contact

For bugs or feature requests, please reach out to:  
kashishbansal081@gmail.com
