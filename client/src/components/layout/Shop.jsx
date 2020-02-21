import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getProductsBySoldAndArrival,
  filterByCatagoryAndPrice
} from "../../actions/userAction";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";
import LeftSide from "./LeftSide";
import RadioBox from "./RadioBox";
import { getCatagories } from "../../actions/adminAction";
import Spinner from "./Spinner";
import { FixedPrices } from "./FixedPrices";

const Shop = ({
  user: { filtered, productsBySold },
  filterByCatagoryAndPrice,
  getCatagories,
  getProductsBySoldAndArrival,
  admin: { loading, catagories }
}) => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      catagory: [],
      price: []
    }
  });
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    getCatagories();
    getProductsBySoldAndArrival("sold");
  }, []);

  const handleFilters = (filters, filterBy) => {
    //  console.log(filters, filterBy);
    const newFilters = { ...myFilters };
    if (filterBy == "price") {
      const newArray = handlePrice(filters);
      newFilters.filters[filterBy] = newArray;
      setMyFilters(newFilters);
    } else {
      newFilters.filters[filterBy] = filters;
      setMyFilters(newFilters);
    }

    filterByCatagoryAndPrice(skip, limit, myFilters.filters);
  };

  const handlePrice = value => {
    const data = FixedPrices;
    var array = [];
    for (let key in data) {
      if (data[key]._id == parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <div>
      <div className="row container">
        <div className="col-4 container">
          <h3 className="mt-4">Filter by Catagories</h3>
          {loading && !catagories ? (
            <Spinner />
          ) : (
            <ul>
              <LeftSide catagories={catagories} handleFilters={handleFilters} />
            </ul>
          )}
          <h3 className="mt-4">Filter by Price</h3>
          {loading && !catagories ? (
            <Spinner />
          ) : (
            <div>
              <RadioBox prices={FixedPrices} handleFilters={handleFilters} />
            </div>
          )}
        </div>

        <div className="col-8 ">
          <h2>Products</h2>

          <div className="text-muted ">
            {filtered && <small>Found {filtered.size} products </small>}
            {productsBySold &&
              !filtered && (
                <small>Found {productsBySold.length} products </small>
              )}
          </div>

          <div className="row">
            {loading && <Spinner />}
            {!loading &&
              filtered &&
              filtered.products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            {!loading &&
              productsBySold &&
              !filtered &&
              productsBySold.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  admin: state.admin,
  user: state.user
});
export default connect(mapStateToProps, {
  filterByCatagoryAndPrice,
  getProductsBySoldAndArrival,
  getCatagories
})(Shop);
