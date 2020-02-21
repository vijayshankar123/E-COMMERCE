import axios from "axios";
import { setAlert } from "./alertAction";
import setAuthToken from "../utils/setAuthToken";
import {
  CATAGORY_ERROR,
  CREATE_CATAGORY,
  CREATE_PRODUCT,
  PRODUCT_ERROR,
  CATAGORIES_SUCCESS,
  CATAGORIES_ERROR
} from "./types";

//create catagory

export const createCatagory = ({ name, history }) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ name });
    try {
      const res = await axios.post("/api/catagory/create", body, config);
      dispatch({
        type: CREATE_CATAGORY,
        payload: res.data
      });
      dispatch(setAlert("Successfully created catagory", "success"));
      history.push("/admin/dashboard");
    } catch (err) {
      dispatch({
        type: CATAGORY_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//create product

export const createProduct = (product, history) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    try {
      const res = await axios.post("/api/product/create", product, config);
      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data
      });
      dispatch(setAlert("Successfully created Product", "success"));
      history.push("/admin/dashboard");
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//get all catagories

export const getCatagories = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/catagory/all");
      dispatch({
        type: CATAGORIES_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CATAGORIES_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};
