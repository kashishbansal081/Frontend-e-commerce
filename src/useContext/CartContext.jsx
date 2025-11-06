import { createContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState([]);
  const [addToCart, setAddToCart] = useState({ productId: "", quantity: 1 });
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedSize, sizeHandler] = useState("");

  const { data: cartDat, loading } = useFetch(`https://backend-e-commerce-ashen.vercel.app/v1/api/cart`);

  async function addToCartPostHandler(productId, quantity = 1, size = "") {
    if (!productId) {
      console.log("No productId provided");
      return;
    }

    try {
      console.log("I am adding / updating the values");
      const bodyData = { productId, quantity };
      if (size) {
        bodyData.size = size;
      }
      const result = await fetch(
        "https://backend-e-commerce-ashen.vercel.app/v1/api/cart/updateItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      const responseData = await result.json();
      setCartData(responseData?.data?.[0]?.products || []);
      setAddToCart({ productId: "", quantity: 1 });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCartItemHandler(productId, size) {
    try {
      const response = await fetch(`https://backend-e-commerce-ashen.vercel.app/v1/api/cart/items`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({productId, size})
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setCartData((prev) =>
        prev.filter(
          (item) => !(item.product._id === productId && item.size === size)
        )
      );
      console.log("Item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCartHandler() {
    try {
      const response = await fetch("https://backend-e-commerce-ashen.vercel.app/v1/api/cart", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCartData([]);
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  const triggerAlert = (message, type = "success") => {
    setAlertMessage({ message, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    if (cartDat?.data?.[0]?.products) {
      setCartData(cartDat.data[0].products);
    }
  }, [cartDat]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        loading,
        setCartData,
        addToCart,
        setAddToCart,
        deleteCartItemHandler,
        addToCartPostHandler,
        clearCartHandler,
        triggerAlert,
        showAlert,
        alertMessage,
        selectedSize,
        sizeHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
