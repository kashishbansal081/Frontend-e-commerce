import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  console.log(orders);
  useEffect(() => {
    const storedOrders = window.localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="my-4 text-center">My Orders</h1>

      <div className="container">
        <div className="d-flex mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search your orders here"
          />
          <button className="btn btn-primary">Search</button>
        </div>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="card mb-4 p-3 shadow-sm">
              <h5 className="text-start" style={{ fontSize: "1rem" }}>
                Order Date: {new Date(order.orderDate).toLocaleString()}
              </h5>

              <div className="row">
                {order.items.map((item, i) => (
                  <div key={i} className="col-md-12 mb-3">
                    <div className="card p-3 d-flex flex-row align-items-center">
                      <img
                        src={item.product.productImage[0]}
                        alt={item.product.productName}
                        className="img-fluid rounded"
                        style={{
                          height: "150px",
                          width: "140px",

                          marginRight: "20px",
                        }}
                      />
                      <div className="card-body p-0">
                        <h6>{item.product.productName}</h6>
                        <p className="mb-1">
                          Brand: {item.product.productBrandName}
                        </p>
                        {item.size && <p className="mb-1">Size: {item.size}</p>}
                        <p className="mb-1">
                          Price: ₹{item.product.productPrice}
                        </p>
                        <p className="mb-1">Quantity: {item.quantity}</p>
                        <p className="fw-bold mb-0">
                          Total: ₹{item.product.productPrice * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No orders found.</p>
        )}
      </div>
      <Footer/>
    </>
  );
}
