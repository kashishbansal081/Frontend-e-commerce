import { createContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState([]);
  const [addToCart, setAddToCart] = useState({ productId: "", quantity: 1 });
   const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { data: cartDat } = useFetch(`https://backend-e-commerce-ashen.vercel.app/v1/api/cart`);

  async function addToCartPostHandler(productId, quantity = 1) {
     if (!productId) {
      console.log("No productId provided");
      return;
    }

    try {
      console.log("I am adding / updating the values");
      const result = await fetch(
        "https://backend-e-commerce-ashen.vercel.app/v1/api/cart/updateItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );

      const responseData = await result.json();
      setCartData(responseData?.data?.[0]?.products || []);
      setAddToCart({ productId: "", quantity: 1 });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCartItemHandler(id) {
    try {
      const response = await fetch(`https://backend-e-commerce-ashen.vercel.app/v1/api/cart/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update UI instantly
      setCartData((prev) => prev.filter((p) => p.product._id !== id));
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
        setCartData,
        addToCart,
        setAddToCart,
        deleteCartItemHandler,
        addToCartPostHandler,
        clearCartHandler,
        triggerAlert,
        showAlert,
        alertMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
