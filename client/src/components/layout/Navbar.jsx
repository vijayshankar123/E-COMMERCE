import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../actions/authAction";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "orange" };
  }
  return { color: "white" };
};

const Navbar = ({
  cart: { cart },
  logout,
  auth: { loading, user, isAuthenticated, isAuthenticatedAdmin },
  history
}) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-secondary">
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/home")}
            to="/home"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        {!loading && isAuthenticated && user && user.code ? (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={logout}
                className="nav-link"
                style={isActive(history, "/")}
                to="/"
              >
                Logout Admin
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/dashboard")}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                Cart{""}
                <sup>
                  <small className="cart-badge">
                    {cart === null ? 0 : cart.length}
                  </small>
                </sup>
              </Link>
            </li>
          </Fragment>
        )}
        {!loading &&
          user &&
          user.name && (
            <li className="nav-item">
              <Link
                onClick={logout}
                className="nav-link"
                style={isActive(history, "/")}
                to="/"
              >
                Logout
              </Link>
            </li>
          )}

        {!loading &&
          !user && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/login")}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </Fragment>
          )}
      </ul>
    </div>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});
export default connect(mapStateToProps, { logout })(withRouter(Navbar));
