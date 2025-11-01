import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { WishListContext } from "../useContext/WishListContext";
import { CartContext } from "../useContext/CartContext";

export default function Navbar({ setSearchItem }) {
  const { wishListItems } = useContext(WishListContext);
  const { cartData } = useContext(CartContext);
  const [isLogin, setIsLogin] = useState(true);
  const numberOfItems = cartData && cartData?.length;

  function searchHandler(e) {
    if (setSearchItem) {
      setSearchItem(e.target.value);
    }
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <div className="d-flex align-items-center">
            <NavLink className="navbar-brand fw-bold text-light me-4" to="/">
              MyShoppingSite
            </NavLink>
          </div>

          <form className="d-flex m-0 mx-md-auto  w-50" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              onChange={searchHandler}
            />
          </form>

          <div
            className="d-flex align-items-center justify-content-between gap-3 position-relative mx-auto"
            style={{ minWidth: "120px" }}
          >
            {isLogin ? (
              <div className="dropdown">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-light"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/userProfile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user/addresses">
                      Addresses
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => setIsLogin(false)}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-outline-success px-3"
                type="button"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            )}

            <Link to="/wishlist" className="position-relative">
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "gray", fontSize: "20px", cursor: "pointer" }}
              />
              {wishListItems?.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}
                >
                  {wishListItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="position-relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ color: "gray", fontSize: "20px", cursor: "pointer" }}
              />
              {numberOfItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}
                >
                  {numberOfItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
