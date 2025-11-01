import { createContext, useState, useEffect } from "react";
import useFetch from "../customHooks/useFetch";

export const WishListContext = createContext();

export default function WishListProvider({ children }) {
  // Fetching Data
  const { data } = useFetch("https://backend-e-commerce-ashen.vercel.app/v1/api/wishList");

  const isDataThere =
    (data && data?.data[0]?.products.map((pId) => pId._id)) || [];

  // Managing States
  const [wishlist, setWishList] = useState("");
  const [wishListItems, setWishListItems] = useState(isDataThere);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //   Functions

  async function postWishListItemHandler(id) {
    try {
      const response = await fetch("https://backend-e-commerce-ashen.vercel.app/v1/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      setWishListItems((prev) => [...prev, id]);

      const responseData = await response.json();
      console.log("Response from server:", responseData);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteWishListItemHandler(id) {
    try {
      const response = await fetch(
        `https://backend-e-commerce-ashen.vercel.app/v1/api/wishlist/${id}`,
        {
          method: "DELETE",
        }
      );

      setWishListItems((prev) => prev.filter((pid) => pid !== id));
      if (!response.ok) {
        throw new Error("Failed to delete item");
      } else {
        console.log("It got deleted successfully", response.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function wishListHandler() {
    if (!wishlist) return;

    const idPresent = wishListItems?.includes(wishlist);

    console.log(idPresent);

    if (!idPresent) {
      postWishListItemHandler(wishlist);
    } else {
      deleteWishListItemHandler(wishlist);
    }
    setWishList("");
  }

  const triggerAlert = (message, type = "success") => {
    setAlertMessage({ message, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  //   useEffect Handle

  useEffect(() => {
    if (data && data.data && data.data[0]?.products) {
      setWishListItems(data.data[0].products.map((p) => p._id));
    }
  }, [data]);

  useEffect(() => {
    if (!wishlist) return;
    if (data && data.data && data.data[0]?.products) {
      wishListHandler();
    }
  }, [data, wishlist, setWishList]);

  return (
    <WishListContext.Provider
      value={{
        wishlist,
        setWishList,
        wishListItems,
        setWishListItems,
        triggerAlert,
        showAlert,
        alertMessage,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
