import {
  CREATE_CATAGORY,
  CATAGORY_ERROR,
  CLEAR_ERROR,
  CREATE_PRODUCT,
  PRODUCT_ERROR,
  CATAGORIES_ERROR,
  CATAGORIES_SUCCESS
} from "../actions/types";

const initialState = {
  loading: true,
  catagory: null,
  error: null,
  product: null,
  catagories: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_CATAGORY:
      return {
        ...state,
        catagory: action.payload,
        loading: false
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case CATAGORIES_SUCCESS:
      return {
        ...state,
        catagories: action.payload,
        loading: false
      };
    case CATAGORY_ERROR:
    case PRODUCT_ERROR:
    case CATAGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}
