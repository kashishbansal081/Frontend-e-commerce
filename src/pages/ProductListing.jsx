import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSection from "../components/FilterSection";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function ProductListing({ searchItem, setSearchItem }) {
  const { categoryId } = useParams();
  const [filterProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleFilterChange(findFilteredProducts) {
    setFilteredProducts(findFilteredProducts);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
  }, [categoryId]);

  return (
    <>
      <Navbar setSearchItem={setSearchItem} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-md-none text-end my-md-3 mt-3 ">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filterCollapse"
              aria-expanded="false"
              aria-controls="filterCollapse"
            >
              ☰ Show Filters
            </button>
          </div>

          <section
            className="col-12 col-md-3 col-lg-3 text-dark p-3 collapse d-md-block  "
            id="filterCollapse"
          >
            <FilterSection
              categoryId={categoryId}
              onFilterChange={handleFilterChange}
              searchItem={searchItem}
            />
          </section>

          {/* Product section */}
          <section className="col-12 col-md-9 col-lg-9 p-4">
            <h4 className="mb-3">
              Showing All Products ({filterProducts.length})
            </h4>

            <div className="row">
              {loading ? (
                <div className="text-center my-5">
                  <div
                    className="spinner-grow text-primary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filterProducts.length > 0 ? (
                filterProducts.map((product) => (
                  <div
                    key={product._id}
                    className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4"
                  >
                    <ProductCard product={product} searchItem={searchItem} />
                  </div>
                ))
              ) : (
                <div className="text-center text-muted mt-5">
                  <h5>No products found for this category.</h5>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      {!loading && <Footer />}
    </>
  );
}
