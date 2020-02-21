import React, { useEffect, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import ShowPhoto from "./ShowPhoto";
import { connect } from "react-redux";
import { addItem, getCart } from "../../actions/cartAction";

const ProductCard = ({
  history,
  cart: { cart, redirect },
  getCart,
  product,
  addItem
}) => {
  const addToCart = () => {
    addItem(product, history);
  };

  const [data, setData] = useState([]);

  const showData = item => {
    return item._id === product._id;
  };

  return (
    <div className="col-md-4 col-sm-6 mt-4">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowPhoto item={product} url="product" />
          <p>{product.description.substring(0, 15)}</p>
          <p>${product.price}</p>
          <Link to={"/product/" + product._id}>
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Product
            </button>
          </Link>
          {cart && cart.some(showData) ? (
            <Link to={"/cart"}>
              <button className="btn btn-outline-primary mt-2 mb-2">
                View Cart
              </button>
            </Link>
          ) : (
            <button
              onClick={addToCart}
              className="btn btn-outline-primary mt-2 mb-2"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { getCart, addItem })(
  withRouter(ProductCard)
);
