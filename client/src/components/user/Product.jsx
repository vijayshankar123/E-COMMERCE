import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleProduct, getRelatedProducts } from "../../actions/userAction";
import ProductCard from "../layout/ProductCard";
import { connect } from "react-redux";
import Search from "./Search";
import ShowPhoto from "../layout/ShowPhoto";
import SimilarProduct from "../layout/SimilarProduct";

const Product = ({
  match,
  user: { singleProduct, relatedProducts },
  getRelatedProducts,
  getSingleProduct
}) => {
  useEffect(
    () => {
      getSingleProduct(match.params.id);
      {
        singleProduct && getRelatedProducts(match.params.id);
      }
    },
    [match.params.id]
  );
  return (
    <Fragment>
      <div className="row containere container-fluid">
        <div className="col-4 ">
          <ShowPhoto item={singleProduct} url="product" />
          <div className="btn btn-primary">Add to cart</div>
        </div>
        <div className="col-8">
          {singleProduct && (
            <Fragment>
              <p>
                <strong>
                  {singleProduct.name && singleProduct.name.toUpperCase()}
                </strong>
              </p>
              <p>
                {singleProduct.description}
                <span className="text-muted" style={{ display: "block" }}>
                  Sold : {singleProduct.sold}
                </span>
              </p>
              <h3 style={{ color: "blue" }}>
                Offer Price{" "}
                <span style={{ color: "green" }}>{singleProduct.price}$</span>
              </h3>
              <p>
                Shipping{" "}
                {singleProduct.shipping && singleProduct.shipping === true ? (
                  <i className="fas fa-check-circle" />
                ) : (
                  <i className="fas fa-times-circle" />
                )}
              </p>
            </Fragment>
          )}
        </div>
      </div>
      <div className="containere">
        <h3 className="ml-2 mr-2">Similar Products</h3>
        <div className="row  container-fluid  mt-5">
          {relatedProducts &&
            relatedProducts.map(product => (
              <SimilarProduct key={product._id} product={product} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, {
  getRelatedProducts,
  getSingleProduct
})(Product);
