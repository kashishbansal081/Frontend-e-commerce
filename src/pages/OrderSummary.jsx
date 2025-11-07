import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'

export default function OrderSummary() {
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    if (orders.length > 0) {
      setLastOrder(orders[orders.length - 1]);
    }
  }, []);

  if (!lastOrder) {
    return (
      <>
        <Navbar />
        <div className="container text-center my-5">
          <h2 className="text-muted">No orders found!</h2>
        </div>
      </>
    );
  }

  const { items, price, discount, delivery, totalAmount } = lastOrder;

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
      <Navbar />

      <div className="container mt-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-success">
            Order Placed Successfully!
          </h2>
          <p className="text-muted mt-2">
            Thank you for shopping with us. Your order details are below.
          </p>
        </div>

        <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "700px" }}>
          <h4 className="fw-bold mb-3 text-center">🧾 Order Summary</h4>
          <hr />

          <div className="d-flex justify-content-between mb-2">
            <span>Items ({items.length})</span>
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
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          {discount > 0 && (
            <p className="text-success text-center mt-3 small">
              You saved ₹{discount} on this order 🎉
            </p>
          )}
        </div>

        <div className="text-center mt-5">
          <a href="/" className="btn btn-outline-success px-4 py-2">
            Continue Shopping
          </a>
        </div>
      </div>
      </main>
      <Footer/>
    </div>
  );
}
