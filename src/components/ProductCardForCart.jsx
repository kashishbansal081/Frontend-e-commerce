import { useState, useContext } from "react";
import { WishListContext } from "../useContext/WishListContext";
import { CartContext } from "../useContext/CartContext";

export default function ProductCardForCart({ prod }) {
  const [count, setCount] = useState(prod.quantity);
  const { setWishList, wishListItems } = useContext(WishListContext);
  const {
    deleteCartItemHandler,
    addToCartPostHandler,
    triggerAlert,
    showAlert,
    alertMessage,
  } = useContext(CartContext);

  const handleQuantityChange = async (newCount) => {
    if (newCount < 1) return; // prevent negative quantity
    setCount(newCount);
    await addToCartPostHandler(prod.product._id, newCount);
  };

  return (
    <>
      {showAlert && (
        <div class="d-flex justify-content-center align-items-center">
          <div
            className={`alert alert-${alertMessage.type} text-center position-fixed bottom-0 w-50`}
            style={{ zIndex: 9999 }}
          >
            {alertMessage.message}
          </div>
        </div>
      )}
      <div className="col-md-12">
        <div className="card pt-3 px-3">
          <div className="d-flex flex-column flex-md-row text-start">
            {/* Product Image */}
            <div className="product-thumbnail">
              <img
                src={prod.product.productImage}
                alt={prod.product.productName}
                className="img-fluid d-block mx-auto"
                style={{ width: "120px" }}
              />
            </div>

            {/* Product Info */}
            <div className="product-info ms-md-5 mt-4 mt-md-0">
              <h2 className="text-center text-md-start">
                {prod.product.productName}
              </h2>

              {/* Quantity Controls */}
              <div className="quantity d-flex flex-column flex-md-row align-items-center mt-4">
                <p className="fw-semibold me-3 text-center text-md-start mb-0">
                  Quantity:
                </p>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    disabled={count === 1}
                    onClick={() => {
                      handleQuantityChange(count - 1);
                      triggerAlert("Quantity Decreased by 1 😔", "info");
                    }}
                  >
                    -
                  </button>

                  <p className="mt-3 mx-3 border py-1 px-2">{count}</p>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      handleQuantityChange(count + 1);
                      triggerAlert("Quantity Increased by 1 😊", "info");
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  className="btn btn-danger btn-sm ms-0 ms-md-4 mt-3 mt-md-0 "
                  onClick={() => {
                    deleteCartItemHandler(prod.product._id);
                    triggerAlert("❌ Product Removed", "danger");
                  }}
                >
                  Remove
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => {
                    setWishList(prod.product._id);
                    if (
                      wishListItems.some(
                        (item) => item._id === prod.product._id
                      )
                    ) {
                      triggerAlert("❌ Removed from wishlist!", "danger");
                    } else {
                      triggerAlert("💖 Added to wishlist!", "success");
                    }
                  }}
                  className={`btn btn-sm ms-0 ms-md-2 mt-3 mt-md-0 ${
                    wishListItems.some((item) => item._id === prod.product._id)
                      ? "btn-primary"
                      : "btn-warning"
                  }`}
                >
                  {wishListItems.some((item) => item._id === prod.product._id)
                    ? "Remove from WishList"
                    : "Add To WishList"}
                </button>
              </div>

              <h4 className="my-3 text-center text-md-start">
                Rs {prod.product.productPrice}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
