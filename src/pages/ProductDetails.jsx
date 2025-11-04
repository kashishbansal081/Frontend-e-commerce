import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useFetch from "../customHooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faTruck,
  faLock,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import { WishListContext } from "../useContext/WishListContext";
import { CartContext } from "../useContext/CartContext";

function Rating({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} color="#ffc107" />); // full star
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#ffc107" />); // half star
    } else {
      stars.push(<FaRegStar key={i} color="#ffc107" />); // empty star
    }
  }
  return <div className="d-flex">{stars}</div>;
}

export default function ProductDetails() {
  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `https://backend-e-commerce-ashen.vercel.app/v1/api/product/${productId}`
  );
  const { setWishList, wishListItems } = useContext(WishListContext);
  const { addToCartPostHandler } = useContext(CartContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const triggerAlert = (message, type = "success") => {
    setAlertMessage({ message, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        {showAlert && (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className={`alert alert-${alertMessage.type} text-center position-fixed bottom-0 w-50`}
              style={{ zIndex: 9999 }}
            >
              {alertMessage.message}
            </div>
          </div>
        )}

        {loading ? (
          <>
            <div className="spinner-border text-info mt-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : data ? (
          <div className="container-fluid mt-4">
            <div className="productDetail d-flex flex-column flex-md-row">
              <div className="productImage">
                <div className="image-wishlist border d-flex position-relative">
                  <img
                    src={data.data.productImage}
                    alt="Image"
                    className="p-4 px-5 img-fluid"
                  />
                  <Link>
                    <FaHeart
                      className="position-absolute top-0 end-0 mt-2 me-3"
                      size={25}
                      color={
                        wishListItems.some((product) => product._id === productId)
                          ? "#e3002a"
                          : "#999"
                      }
                      onClick={() => {
                        setWishList(productId);
                        if (wishListItems.some((product) => product._id === productId)) {
                          triggerAlert("❌ Removed from wishlist!", "danger");
                        } else {
                          triggerAlert("💖 Added to wishlist!", "success");
                        }
                      }}
                    />
                  </Link>
                </div>

                <br />
                <Link
                  className="btn btn-warning mt-2 w-100"
                  onClick={() => {
                    addToCartPostHandler(productId, quantity);
                    triggerAlert("Product added to cart!");
                  }}
                >
                  Add To Cart
                </Link>
                <br />
                <Link
                  className="btn btn-primary mt-2 w-100"
                  to={"/cart"}
                  onClick={() => {
                    addToCartPostHandler(productId, quantity);
                  }}
                >
                  Buy Now
                </Link>
              </div>
              <div className="productData w-75 mt-4 mt-md-0 text-start ps-5">
                <h3 className="fs-4 fs-md-3">{data.data.productName}</h3>

                {/* Rating stars + number */}
                <div className="d-flex align-items-center mt-3">
                  <Rating value={data.data.productRating} />
                  <span className="ms-2 fs-6">{data.data.productRating}</span>
                </div>

                <div className="prices d-flex mt-2">
                  <h4 className="mt-1 fw-medium me-3 fs-5 fs-md-4">
                    Rs {data.data.productPrice}
                  </h4>
                  <h4 className="mt-1 text-decoration-line-through text-body-secondary fs-6">
                    Rs 80000
                  </h4>
                </div>
                <h4 className="mt-2 text-body-secondary fw-medium fs-6">29% off</h4>
                <div className="quantity d-flex align-items-center">
                  <p className="mt-4 fw-semibold me-3 fs-6">Quantity:</p>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>

                  <p className="mt-3 mx-3 border rounded py-1 px-3">{quantity}</p>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="highlights">
                  <p className="mt-2 fw-semibold me-3 fs-6">Highlights: </p>
                  <ul>
                    {data.data.productDescription.highlights.map((feature, index) => {
                      return <li key={index} className="fs-6">{feature}</li>;
                    })}
                  </ul>
                </div>
                <hr />
                <div className="delivery-Detail row text-center mt-3">
                  <div className="col-6 col-md-3 mb-3">
                    <FontAwesomeIcon icon={faArrowRotateLeft} className="fa-2x mb-2" />
                    <p className="mb-0 small fs-6">10 days Returnable</p>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="fa-2x mb-2" />
                    <p className="mb-0 small fs-6">Pay Cash On Delivery</p>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <FontAwesomeIcon icon={faTruck} className="fa-2x mb-2" />
                    <p className="mb-0 small fs-6">Free Delivery</p>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <FontAwesomeIcon icon={faLock} className="fa-2x mb-2" />
                    <p className="mb-0 small fs-6">Secure Payment</p>
                  </div>
                </div>

                <hr />
                <div className="description">
                  <p className="mt-4 fw-semibold me-3 fs-6">Description: </p>
                  <p className="fs-6">{data.data.productDescription.basic}</p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        ) : (
          <p>No Data found</p>
        )}
      </div>
    </>
  );
}
