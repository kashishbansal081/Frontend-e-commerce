import React, { useEffect } from "react";

export default function AlertMessage({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 2000); // hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#333",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "25px",
        fontSize: "0.85rem",
        minWidth: "fit-content",
        maxWidth: "80%",
        textAlign: "center",
        whiteSpace: "nowrap",
        opacity: 0.95,
        zIndex: 1000,
        boxShadow: "0px 3px 8px rgba(0,0,0,0.3)",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {message}
    </div>
  );
}
