import { useContext } from "react";
import { WishListContext } from "../useContext/WishListContext";
import Navbar from "../components/Navbar";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../useContext/CartContext";

export default function ProductWishList({}) {
  const { setWishList, wishListItems, triggerAlert, showAlert, alertMessage } =
    useContext(WishListContext);
  const { addToCartPostHandler, cartData } = useContext(CartContext);

  const handleMoveToCart = async (product) => {
    const cartItem = cartData.find((item) => item.product._id === product._id);

    if (cartItem) {
      await addToCartPostHandler(product._id, cartItem.quantity + 1);
    } else {
      await addToCartPostHandler(product._id, 1);
    }
  };
  return (
    <>
      <Navbar />
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

      <h1 className="my-3">My WishList</h1>
      <div className="container">
        <div className="row g-4">
          {wishListItems?.length > 0 ? (
            wishListItems?.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card h-100 text-center wishlist-card">
                  <div className="img-heart d-flex">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="card-img-top mx-auto mt-3"
                      style={{
                        height: "260px",
                        width: "200px",
                        overflow: "hidden",
                      }}
                    />
                    <button
                      type="button"
                      className="btn position-absolute top-0 end-0 mt-2 me-0  p-1 bg-white border-0 rounded-circle"
                    >
                      <FaHeart
                        className="me-3"
                        size={25}
                        color={
                          wishListItems.some((item) => item._id === product._id)
                            ? "#e3002a"
                            : "#999"
                        }
                        onClick={() => {
                          setWishList(product._id);
                          if (
                            wishListItems.some(
                              (item) => item._id === product._id
                            )
                          ) {
                            triggerAlert("❌ Removed from wishlist!", "danger");
                          } else {
                            triggerAlert("💖 Added to wishlist!", "success");
                          }
                        }}
                      />
                    </button>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">{product.productName}</h6>
                    <p className="card-text fs-5">Rs. {product.productPrice}</p>
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => {
                      handleMoveToCart(product);
                      triggerAlert("Product added to cart!");
                    }}
                  >
                    Move To Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="fs-4 text-center">No Item added to the WishList</p>
          )}
        </div>
      </div>
    </>
  );
}
