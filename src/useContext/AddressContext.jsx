import { createContext, useContext, useState } from "react";
import { CartContext } from "./CartContext";

export const AddressContext = createContext();

export default function AddressProvider({ children }) {
  const { cartData, clearCartHandler } = useContext(CartContext);
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  async function orderPlaceHandler() {
    const isOrders = JSON.parse(window.localStorage.getItem("orders") || "[]");
    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId
    );

    const price = cartData.reduce(
      (sum, item) => sum + item.product.productPrice * item.quantity,
      0
    );
    const discount = price >= 1000 ? Math.round(price * 0.1) : 0;
    const delivery = price > 1000 ? 0 : 99;
    const totalAmount = price - discount + delivery;

    const order = {
      items: cartData,
      address: selectedAddress,
      orderDate: new Date().toString(),
      price,
      discount,
      delivery,
      totalAmount,
    };

    if (isOrders.length === 0) {
      window.localStorage.setItem("orders", JSON.stringify([order]));
    } else {
      window.localStorage.setItem(
        "orders",
        JSON.stringify([...isOrders, order])
      );
    }

    await clearCartHandler();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      const updated = addresses.map((addr) =>
        addr.id === formData.id ? formData : addr
      );
      setAddresses(updated);
    } else {
      const newAddress = { ...formData, id: Date.now().toString() };
      setAddresses([...addresses, newAddress]);
    }

    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
    });
  };

  const handleEdit = (address) => {
    setFormData(address);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = addresses.filter((addr) => addr.id !== id);
    setAddresses(updated);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        setAddresses,
        selectedAddressId,
        setSelectedAddressId,
        showForm,
        setShowForm,
        formData,
        setFormData,
        orderPlaceHandler,
        handleDelete,
        handleEdit,
        handleSubmit,
        resetForm,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
