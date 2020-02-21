import {
  ADD_ITEM,
  GET_CART,
  DELETE_CART,
  GET_TOKEN,
  GET_TOKEN_ERROR
} from "./types";
import axios from "axios";

//adding item to cart
export const addItem = (item, history) => {
  return async dispatch => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...item,
        count: 1
      });
      cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
        return cart.find(p => p._id === id);
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    console.log(history);
    dispatch({
      type: ADD_ITEM
    });
    history.push("/cart");
  };
};

//getting items from localstorage
export const getCart = () => {
  return async dispatch => {
    dispatch({ type: GET_CART });
  };
};

//delete item from cart
export const removeItem = itemId => {
  return async dispatch => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === itemId) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
    }

    dispatch({
      type: GET_CART
    });
  };
};

//updating item from cart
export const updateItem = (itemId, count) => {
  return async dispatch => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === itemId) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
    }

    dispatch({
      type: GET_CART
    });
  };
};

//getToken BRAINTREE

export const getToken = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/braintree/gettoken`);

      dispatch({
        type: GET_TOKEN,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_TOKEN_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};
