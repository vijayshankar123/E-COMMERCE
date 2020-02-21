import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getToken } from "../../actions/cartAction";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({
  cart: { cart, setToken },
  auth: { isAuthenticated },
  getToken
}) => {
  const getTotal = (currentValue, nextValue) => {
    return currentValue + nextValue.price * nextValue.count;
  };
  useEffect(() => {
    getToken();
  }, []);

  const [info, setInfo] = useState({
    instance: {},
    address: ""
  });

  const buy = async () => {
    let nonce;
    let getNonce = await info.instance.requestPaymentMethod();
    console.log(getNonce);
    nonce = getNonce.nonce;
    console.log(nonce);
    {
      cart &&
        console.log(
          "send nonce and total to process",
          nonce,
          cart.reduce(getTotal, 0)
        );
    }
  };

  const showDrop = () => {
    return (
      <div>
        {setToken !== null && cart.length > 0 ? (
          <div>
            <DropIn
              options={{
                authorization: setToken.clientToken
              }}
              onInstance={instance => (info.instance = instance)}
            />
            <button onClick={buy} className="btn btn-success">
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <Fragment>
      <div>
        <div
          style={{ backgroundColor: "ghostWhite" }}
          className="card container mt-4"
        >
          <h5 className="text-muted mt-4">PRICE DETAILS</h5>
          <hr />
          <p className=" ">
            Price ({cart.length} Items)
            <span style={{ float: "right" }}>
              ${cart && cart.reduce(getTotal, 0)}
            </span>
          </p>
          <p className="text-muted ">
            Delivery Fee
            <span style={{ float: "right", color: "green" }}>FREE</span>
          </p>
          <hr />
          <p>
            <strong> Total Payable</strong>
            <span style={{ float: "right" }}>
              <strong> ${cart && cart.reduce(getTotal, 0)}</strong>
            </span>
          </p>
          {isAuthenticated ? (
            <div>{showDrop()}</div>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Sign in to Checkout</button>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth
});
export default connect(mapStateToProps, { getToken })(Checkout);
