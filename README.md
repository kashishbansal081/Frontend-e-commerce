# DesiKart

A full-stack e-commerce web application where users can browse different product categories, filter products, manage wishlist and cart, select delivery addresses, and place orders successfully.  
Built with a React frontend, Express/Node backend, and MongoDB database.

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

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:  
[Loom Video Link]()

---

## Features

### Home
- Displays a list of product categories
- Navigate to sections like Mobiles, Clothing, and more

### Product Listing
- Displays all products based on selected category
- Advanced filtering options:
  - Filter by rating
  - Filter by price
  - Filter by brand
  - Sort by Low to High price
  - Sort by High to Low price

### Product Details
- View complete product information
- Check available sizes
- Select quantity
- Add to Wishlist
- Add to Cart
- Delivery time estimation
- Product highlights and specifications

### Wishlist
- Add products to favourite section
- Remove products from wishlist
- Move products directly to cart
- Wishlist data stored in MongoDB

### Cart Management
- Add products to cart
- Update product quantity
- Remove individual items
- Clear entire cart
- Proceed to checkout

### Delivery Address
- Select delivery address
- Remove previously saved address
- Address data stored per user

### Order Placement
- Place order successfully
- View order summary in profile section

---

## API Reference

### **GET /v1/api/products**  
Get all products  

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
Get details of a particular product  

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
Get all product categories  

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
Add product to wishlist  

Sample Response:
```
{
  "success": true,
  "products": [...]
}
```

---

### **DELETE /v1/api/wishlist/:productId**  
Remove product from wishlist  

Sample Response:
```
{
  "success": true,
  "products": [...]
}
```

---

### **POST /v1/api/cart/updateItem**  
Add or update cart item  

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
Remove specific item from cart  

Sample Response:
```
{
  "success": true,
  "msg": "Item removed successfully from cart"
}
```

---

### **GET /v1/api/address/:userId**  
Get user delivery addresses  

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
