import {
  GET_PRODUCTS_ARRIVAL,
  GET_PRODUCTS_SOLD,
  GET_PRODUCTS_ERROR,
  CLEAR_ERROR,
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
} from "../actions/types";

const initialState = {
  loading: true,
  productsBySold: null,
  productsByArrival: null,
  error: null,
  filtered: null,
  searchResults: null,
  singleProduct: {},
  relatedProducts: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_ARRIVAL:
      return {
        ...state,
        productsByArrival: action.payload,
        loading: false
      };
    case RELATED_PRODUCT:
      return {
        ...state,
        relatedProducts: action.payload,
        loading: false
      };
    case SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
        loading: false
      };
    case SEARCH:
      return {
        ...state,
        searchResults: action.payload,
        loading: false
      };
    case GET_FILTERED:
      return {
        ...state,
        filtered: action.payload,
        loading: false
      };
    case GET_PHOTO:
      return {
        ...state,
        loading: false
      };
    case GET_PRODUCTS_SOLD:
      return {
        ...state,
        productsBySold: action.payload,
        loading: false
      };
    case GET_PRODUCTS_ERROR:
    case GET_FILTERED_ERROR:
    case GET_PHOTO_ERROR:
    case SEARCH_ERROR:
    case SINGLE_PRODUCT_ERROR:
    case RELATED_PRODUCT_ERROR:
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
