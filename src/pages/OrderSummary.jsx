import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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
        <h1 className="my-5">No orders found!</h1>
      </>
    );
  }

  const totalOfProducts = lastOrder.items.reduce(
    (acc, curr) => acc + curr.product.productPrice * curr.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <h1 className="my-5">Order has been Placed Successfully!</h1>

      <div className="container text-center text-md-start">
        <h2 className="text-center text-md-start fs-2">Order Summary</h2>
        <p>Items ({lastOrder.items.length}): Rs {totalOfProducts}</p>
        <p>Total: Rs {totalOfProducts}</p>
        <p>Post & Packaging: Rs 100</p>
        <hr />
        <h3 style={{ color: "Red" }}>
          Order Total: Rs {totalOfProducts + 100} 
        </h3>
        <hr />
      </div>
    </>
  );
}
