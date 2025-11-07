import { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { AddressContext } from "../useContext/AddressContext";
import Footer from "../components/Footer";

export default function UserAddresses() {
  const {
    addresses,
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleDelete,
    handleEdit,
    handleSubmit,
    resetForm,
  } = useContext(AddressContext);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (addresses.length === 0) setShowForm(true);
  }, [addresses]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
      <Navbar />
      <div className="container">
        <h2 className="my-4">Add / Update a Delivery Address</h2>

        {addresses.length > 0 ? (
          <div className="card">
            <ul className="list-group list-group-flush">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className="list-group-item d-flex align-items-start"
                >
                  <div className="text-start">
                    <p className="mb-0 fw-bold">{address.name}</p>
                    <p className="mb-0">
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.postalCode}, {address.country}
                    </p>
                    <p className="mb-2">
                      Phone: <strong>{address.phoneNumber}</strong>
                    </p>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(address)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(address.id)}
                    >
                      Delete
                    </button>
                  </div>
                </label>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-muted">No saved addresses yet.</p>
        )}

        <button
          className="btn btn-warning mt-4"
          onClick={() => {
            resetForm();
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Cancel" : "Add a New Delivery Address"}
        </button>

        {showForm && (
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Street"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success mt-3">
              {formData.id ? "Update Address" : "Save Address"}
            </button>
          </form>
        )}
      </div>
      </main>
      <Footer/>
    </div>
  );
}
