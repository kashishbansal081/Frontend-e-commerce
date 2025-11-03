import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Footer from "../components/Footer";

export default function Home() {
  const { data } = useFetch("https://backend-e-commerce-ashen.vercel.app/v1/api/category");
  // console.log(data)
  return (
    <>
      <Navbar />
      <div className="container container-fluid">
        {/* Categories */}
        <h1 className="mt-4 mb-4 fw-bold text-center">Shop by Categories</h1>
        <div className="row g-4">
          {data?.data?.length > 0 ? (
            data.data.map((category) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4" key={category._id}>
                  <div className="card shadow-sm border-0 rounded-3 text-center">
                    <Link
                      to={`/productListing/${category._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="card-img-top rounded-top"
                        style={{ height: "220px" }}
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
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://media.istockphoto.com/id/2096316448/photo/stoves-and-washing-machines-for-sale-in-a-department-store-or-showroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=xS-pdjJLwNLVPA0_AfEQy8pPA5q2dYEbQy0oyPnr4gg="
                  className="d-block w-100 img-fluid"
                  alt="Image"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1591815421748-5d50ffaf1ace?w=600&auto=format&fit=crop"
                  className="d-block w-100 img-fluid"
                  alt="Image"
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
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop"
                alt="New Arrivals"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6 ps-4">
              <p className="text-uppercase text-muted mb-1">New Arrivals</p>
              <h3 className="fw-bold mb-3">Summer Collection</h3>
              <p>
                Explore our fresh and stylish summer collection crafted for
                comfort and elegance. From lightweight outfits to breezy
                designs, find your perfect match for the season.
              </p>
              <Link
                to="/wishlist"
                className="btn btn-dark rounded-pill mt-3"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}
