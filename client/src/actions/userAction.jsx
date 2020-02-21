import axios from "axios";
import { setAlert } from "./alertAction";
import queryString from "query-string";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_PRODUCTS_ARRIVAL,
  GET_PRODUCTS_SOLD,
  GET_PRODUCTS_ERROR,
  GET_PHOTO,
  GET_PHOTO_ERROR,
  GET_FILTERED,
  GET_FILTERED_ERROR,
  SEARCH,
  SEARCH_ERROR,
  SINGLE_PRODUCT,
  SINGLE_PRODUCT_ERROR,
  RELATED_PRODUCT,
  RELATED_PRODUCT_ERROR
} from "./types";

//get all products

export const getProductsBySoldAndArrival = code => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `/api/products?sortBy=${code}&limit=6&order=desc`
      );
      if (code == "createdAt") {
        dispatch({
          type: GET_PRODUCTS_ARRIVAL,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_SOLD,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//get photo

export const getPhoto = (item, url) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/${url}/photo/${item}`);

      dispatch({
        type: GET_PHOTO,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_PHOTO_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//filtering by catagory and price

export const filterByCatagoryAndPrice = (skip, limit, filters) => {
  return async dispatch => {
    const data = {
      skip,
      limit,
      filters
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(data);
    try {
      const res = await axios.post("/api/products/by/search", body, config);
      dispatch({
        type: GET_FILTERED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_FILTERED_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//search
export const getSearch = params => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/search?search=${params}`);

      dispatch({
        type: SEARCH,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: SEARCH_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//get single product
export const getSingleProduct = params => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/product/" + params);
      dispatch({
        type: SINGLE_PRODUCT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: SINGLE_PRODUCT_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//get related products
export const getRelatedProducts = params => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/products/related/" + params);
      dispatch({
        type: RELATED_PRODUCT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: RELATED_PRODUCT_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};
