import {
  ADD_ITEM,
  GET_CART,
  DELETE_CART,
  GET_TOKEN,
  GET_TOKEN_ERROR
} from "../actions/types";

const initialState = {
  cart: null,
  loading: true,
  redirect: false,
  setToken: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        loading: false,
        cart: JSON.parse(localStorage.getItem("cart")),
        redirect: true
      };
    case GET_CART:
      return {
        ...state,
        loading: false,
        cart: JSON.parse(localStorage.getItem("cart"))
      };
    case GET_TOKEN:
      return {
        ...state,
        loading: false,
        setToken: action.payload
      };
    case GET_TOKEN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
