import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useContext, useState } from "react";
import { WishListContext } from "../useContext/WishListContext";
import { CartContext } from "../useContext/CartContext";

export default function ProductCard({ product }) {
  const { wishListItems, setWishList } = useContext(WishListContext);
  const { addToCartPostHandler } = useContext(CartContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = (message, type = "success") => {
    setAlertMessage({ message, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

    const isWishlisted = wishListItems?.some(
    (item) => item._id === product._id
  );

  return (
    <>
      {showAlert && (
        <div
          className={`alert alert-${alertMessage.type} text-center position-fixed bottom-0 start-50 translate-middle-x w-75`}
          style={{ zIndex: 9999 }}
        >
          {alertMessage.message}
        </div>
      )}

      <div
        className="card mb-3 h-100 shadow-sm"
        key={product._id}
        style={{ minHeight: "550px" }} // ensures equal card height
      >
        {/* IMAGE SECTION */}
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <img
            src={product.productImage}
            alt={product.productName}
            className="img-fluid mx-auto d-block p-3"
            style={{
              minHeight: '260px',
              maxHeight: "260px",
              objectFit: "contain",
              width: "100%",
            }}
          />
        </Link>

        {/* TEXT SECTION */}
        <div className="card-body d-flex flex-column justify-content-between text-start">
          <div>
            <p
              className="btn btn-success btn-sm"
            >
              {product.productRating} <FaStar className="mb-1 ms-1" />
            </p>
            <Link
              to={`/product/${product._id}`}
              className="text-decoration-none text-dark"
            >
              <h5 className="card-title fs-4  text-center">
                {product.productName}
              </h5>
            </Link>

            {/* DESCRIPTION WITH TRUNCATION */}
            <p
              className="card-text text-muted text-center"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2, 
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "3.2em",
              }}
            >
              {product.productDescription.basic}
            </p>
          </div>

          {/* PRICE + BUTTONS */}
          <div className="mt-auto">
            <h3 className="fw-semibold mb-3 text-center">
              Rs {product.productPrice}
            </h3>

            <button
              className="btn btn-warning w-100 mb-2"
              onClick={() => {
                addToCartPostHandler(product._id);
                triggerAlert("Product added to cart!");
              }}
            >
              Add To Cart
            </button>

            <button
              className={`btn w-100 ${
              isWishlisted
                  ? "btn-danger"
                  : "btn-primary"
              }`}
              onClick={() => {
                setWishList(product._id);
                console.log(product._id)
                if (isWishlisted) {
                  triggerAlert("❌ Removed from wishlist!", "danger");
                } else {
                  triggerAlert("💖 Added to wishlist!", "success");
                }
              }}
            >
              {isWishlisted
                ? "Remove from WishList"
                : "Add To WishList"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
