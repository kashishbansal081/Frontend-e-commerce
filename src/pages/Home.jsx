import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Footer from "../components/Footer";

export default function Home() {
  const { data } = useFetch(
    "https://backend-e-commerce-ashen.vercel.app/v1/api/category"
  );
  // console.log(data)
  return (
    <>
      <Navbar />
      <div className="container container-fluid">
        {/* Categories */}
        <h1 className="mt-4 mb-4 fw-bold text-center">Shop by Categories</h1>
        <div>
          <div className="row g-4">
            {data?.data?.length > 0 ? (
              data.data.map((category) => {
                return (
                  <div
                    className="col-sm-12 col-md-6 col-lg-4"
                    key={category._id}
                  >
                    <div className="card shadow-sm border-0 rounded-3 text-center mx-auto" style={{width : '100%', maxWidth: '400px'}}>
                      <Link
                        to={`/productListing/${category._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="card-img-top rounded-top"
                          style={{ height: "260px", objectFit : 'cover'}}
                        />
                        <div className="card-body">
                          <h5 className="fw-semibold">{category.name}</h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Carousel */}
        <section className="mt-5">
          <div
            id="carouselExample"
            className="carousel slide shadow rounded-4 overflow-hidden"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images.unsplash.com/photo-1692726502690-07ee61102964?w=600&auto=format&fit=crop"
                  className="d-block w-100 img-fluid"
                  alt="Image"
                  style={{
                    height: "600px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FkZ2V0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
                  className="d-block w-100 img-fluid"
                  alt="Image"
                   style={{
            height: "600px",
            objectFit: "cover",
          }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1558234200-3efd43232f08?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGUlMjBjb21tZXJjZSUyMHNob3BwaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
                  className="d-block w-100 img-fluid"
                  alt="Image"
                   style={{
            height: "600px",
            objectFit: "cover",
          }}
                />
              </div>
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon bg-dark rounded-circle p-2"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon bg-dark rounded-circle p-2"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        {/* New Arrival Section */}

        <section className="my-5 py-4 border-top">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop"
                alt="Laptop Exploration"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6 ps-4">
              <p className="text-uppercase text-muted mb-1 mt-sm-2 mt-3">
                Tech Spotlight
              </p>
              <h3 className="fw-bold mb-3">Explore the Latest Laptops</h3>
              <p>
                Discover our latest lineup of high-performance laptops designed
                for work, creativity, and gaming. From sleek ultrabooks to
                powerful machines, find the perfect laptop that matches your
                lifestyle and needs.
              </p>
              <Link
                to="/productListing/68da6998fc09ee7f7e1d0b0e"
                className="btn btn-dark rounded-pill mt-3"
              >
                Explore Laptops
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
