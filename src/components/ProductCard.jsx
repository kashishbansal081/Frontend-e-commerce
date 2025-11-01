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
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

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

      <div className="card mb-3 px-md-2" key={product._id}>
        <div className="row g-5">
          <div className="col-md-3 px-md-2">
            <Link
              to={`/product/${product._id}`}
              className="text-decoration-none text-dark"
            >
              <img
                src={product.productImage}
                className="card-img-top p-3 img-fluid"
                style={{ width: "89%" }}
                alt={product.productName}
              />
            </Link>
          </div>
          <div className="col-md-6 text-start px-md-2">
            <Link
              to={`/product/${product._id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card-body">
                <h5 className="card-title fs-3 fw-medium">
                  {product.productName}
                </h5>

                <p className="btn btn-success btn-sm">
                  {product.productRating} <FaStar className="mb-1 ms-1" />
                </p>
                <p className="card-text">{product.productDescription.basic}</p>
                <div className="highlights text-start">
                  <p className="mt-2 fw-semibold me-3">Highlights: </p>
                  <ul>
                    {product.productDescription.highlights.map((feature) => {
                      return <li>{feature}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 px-md-2 mt-0 mt-md-5">
            <div className="card-body px-5 px-md-3">
              <h3>Rs {product.productPrice}</h3>
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
                  wishListItems?.includes(product._id)
                    ? "btn-danger"
                    : "btn-primary"
                }`}
                onClick={() => {
                  setWishList(product._id);
                  if (wishListItems?.includes(product._id)) {
                    triggerAlert("❌ Removed from wishlist!", "danger");
                  } else {
                    triggerAlert("💖 Added to wishlist!", "success");
                  }
                }}
              >
                {wishListItems?.includes(product._id)
                  ? "Remove from WishList"
                  : "Add To WishList"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
