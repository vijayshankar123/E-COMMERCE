import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsBySoldAndArrival } from "../../actions/userAction";
import ProductCard from "../layout/ProductCard";
import { connect } from "react-redux";
import Search from "./Search";

const Home = ({
  getProductsBySoldAndArrival,
  user: { productsBySold, productsByArrival, searchResults }
}) => {
  useEffect(() => {
    getProductsBySoldAndArrival("createdAt");
    getProductsBySoldAndArrival("sold");
  }, []);
  return (
    <div>
      <Search />
      {searchResults && <h2 className="text-center mt-2">Search Results</h2>}
      {searchResults &&
        searchResults.length < 1 && (
          <p className="text-center mt-2">No products found</p>
        )}
      {searchResults &&
        searchResults.length > 0 && (
          <p className="text-center">
            <small className="text-muted ">
              {searchResults.length} Products found
            </small>
          </p>
        )}
      <div className="row container-fluid">
        {searchResults &&
          searchResults.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <h2 className="text-center mt-2">Best Sellers</h2>
      <div className="row container-fluid">
        {productsBySold &&
          productsBySold.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <h2 className="text-center mt-2">New Arrivals</h2>
      <div className="row container-fluid">
        {productsByArrival &&
          productsByArrival.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { getProductsBySoldAndArrival })(Home);
