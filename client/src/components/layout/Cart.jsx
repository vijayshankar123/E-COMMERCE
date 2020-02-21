import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ cart: { cart } }) => {
  return (
    <div className=" containere">
      {cart === null || cart.length == 0 ? (
        <Fragment>
          <h3>Your Cart is Empty</h3>
          <br />
          <Link to="/shop">Continue Shopping</Link>
        </Fragment>
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <h3 className="mt-4 text-muted">My Cart ({cart.length})</h3>
              {cart.map(item => <CartItem key={item._id} product={item} />)}
            </div>
            <div className="col-lg-6 col-md-12">
              <Checkout />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(mapStateToProps)(Cart);
