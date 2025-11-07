import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../useContext/CartContext";
import ProductCardForCart from "../components/ProductCardForCart";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function CartManagement() {
  const { cartData,loading } = useContext(CartContext);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState(0);

  const discount = price >= 1000 ? Math.round(price * 0.1) : 0;
  const delivery = price > 1000 ? 0 : 99;
  const totalAmount = price - discount + delivery;

  useEffect(() => {
    if (cartData?.length > 0) {
      const total = cartData.reduce(
        (sum, item) => sum + item.product.productPrice * item.quantity,
        0
      );
      setItems(cartData.length);
      setPrice(total);
    } else {
      setPrice(0);
      setItems(0);
    }
  }, [cartData]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
      {loading ? (
        <>
          <div className="spinner-border text-info mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      ) : (
        <div className="container mt-4">
          <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

          {cartData?.length === 0 ? (
            <h5 className="text-center text-muted mt-5">
              Your cart is empty. Add some products!
            </h5>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <div className="row gap-4 gap-md-0">
                  {cartData.map((prod) => (
                    <ProductCardForCart
                      key={`${prod.product._id}-${prod.size || "nosize"}`}
                      prod={prod}
                    />
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-center my-5 mt-lg-0">
                  <div
                    className="card shadow-sm p-4"
                    style={{ maxWidth: "700px", width: "100%" }}
                  >
                    <h5 className="fw-bold mb-3 text-center">PRICE DETAILS</h5>
                    <hr />
                    <div className="d-flex justify-content-between mb-2">
                      <span>
                        Price ({items} item{items > 1 ? "s" : ""})
                      </span>
                      <span>₹{price}</span>
                    </div>

                    {discount > 0 && (
                      <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Discount (10%)</span>
                        <span>- ₹{discount}</span>
                      </div>
                    )}

                    <div className="d-flex justify-content-between mb-2">
                      <span>Delivery Charges</span>
                      <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>

                    {discount > 0 && (
                      <p className="text-success mt-3 mb-2 small text-center">
                        You will save ₹{discount} on this order
                      </p>
                    )}

                    <div className="text-center">
                      <Link className="btn btn-success mt-2 px-4" to="/address">
                        Place Order
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </main>
      <Footer/>
    </div>
  );
}
