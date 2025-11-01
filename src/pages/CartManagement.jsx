import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../useContext/CartContext";
import ProductCardForCart from "../components/ProductCardForCart";
import { Link } from "react-router-dom";


export default function CartManagement() {
  const { cartData } = useContext(CartContext);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState(0);

  useEffect(() => {
    if (cartData?.length > 0) {
      const total = cartData.reduce(
        (sum, item) => sum + item.product.productPrice * item.quantity,
        0
      );
      setItems(cartData.length)
      setPrice(total);
    } else {
      setPrice(0);
      setItems(0)
    }
  }, [cartData]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

        {cartData?.length === 0 ? (
          <h5 className="text-center text-muted mt-5">
            Your cart is empty. Add some products!
          </h5>
        ) : (
          <>
            <div className="row">
              {cartData.map((prod) => (
                <ProductCardForCart key={prod.product._id} prod={prod} />
              ))}
            </div>

            <div className="text-center text-md-end mt-4">
              <h4 className="fw-bold">No Of Items ({items})</h4>
              <h4 className="fw-bold">Total: ₹{price}</h4>
              <Link className="btn btn-success mt-2" to= '/address'>Proceed to Checkout</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
