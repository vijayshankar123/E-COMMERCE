import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ShowPhoto from "./ShowPhoto";
import { removeItem, updateItem } from "../../actions/cartAction";
import { connect } from "react-redux";

const CartItem = ({ product, removeItem, updateItem }) => {
  const [count, setCount] = useState(product.count);

  const addCount = () => {
    if (count < 1) {
      return null;
    } else {
      setCount(count + 1);
      updateItem(product._id, count + 1);
      console.log(count);
    }
  };

  const subCount = () => {
    if (count < 2) {
      return null;
    } else {
      setCount(count - 1);
      updateItem(product._id, count - 1);

      console.log(count);
    }
  };

  const removeCart = () => {
    removeItem(product._id);
  };

  return (
    <div className="container-fluid">
      <div className="card-body">
        <p>
          <strong>{product.name.toUpperCase()}</strong>
        </p>
        <Link to={"/product/" + product._id}>
          <ShowPhoto item={product} url="product" />
        </Link>
        <i
          id="delete-cart"
          onClick={removeCart}
          style={{ color: "black", display: "inlineBlock", marginLeft: "20px" }}
          className="far fa-trash-alt fa-2x"
        />
        <span className="text-muted" id="hide-cart">
          delete item
        </span>
        <p>
          ${product.price}
          <div
            style={{
              display: "inline",
              padding: "5px",
              borderRadius: "50%",
              marginLeft: "145px",
              backgroundColor: "blue",
              color: "white"
            }}
            className="card"
          >
            In Stock
          </div>
        </p>

        <div>
          <i onClick={subCount} className="fas fa-minus-circle mr-2" />
          <input
            style={{ width: "50px", paddingLeft: "18px" }}
            value={count}
            name="count"
            type="number"
            min="1"
          />
          <i onClick={addCount} className="fas fa-plus-circle ml-2" />
        </div>
      </div>
    </div>
  );
};
export default connect(null, { removeItem, updateItem })(CartItem);
