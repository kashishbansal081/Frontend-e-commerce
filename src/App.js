import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import ProductWishList from "./pages/ProductWishList";
import CartManagement from "./pages/CartManagement";
import WishListProvider from "./useContext/WishListContext";
import CartProvider from "./useContext/CartContext";
import AddressManagement from "./pages/AddressManagement";
import OrderSummary from "./pages/OrderSummary";
import OrderPage from "./pages/OrderPage";
import AddressProvider from "./useContext/AddressContext";
import UserAddresses from "./pages/UserAddresses";
import UserProfile from "./pages/UserProfile";
import { useState } from "react";


export default function App() {
    const [searchItem, setSearchItem] = useState("");

  return (
    <div className="App">
      <CartProvider>
        <WishListProvider>
          <AddressProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home setSearchItem={setSearchItem}/>} />
              <Route
                path="/productListing/:categoryId"
                element={<ProductListing  searchItem={searchItem} setSearchItem={setSearchItem}  />}
              />
              <Route path="/product/:productId" element={<ProductDetails  />} />
              <Route path="/wishlist" element={<ProductWishList />} />
              <Route path="/cart" element={<CartManagement  />} />
              <Route path="/address" element={<AddressManagement />} />
              <Route path="/orderSummary" element={<OrderSummary />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/user/addresses" element={<UserAddresses />} />
              <Route path="/userProfile" element={<UserProfile/>} />
            </Routes>
          </Router>
          </AddressProvider>
        </WishListProvider>
      </CartProvider>
    </div>
  );
}
