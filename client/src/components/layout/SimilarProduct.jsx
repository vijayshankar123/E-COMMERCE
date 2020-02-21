import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ShowPhoto from "./ShowPhoto";

const SimilarProduct = ({ product }) => {
  return (
    <Fragment>
      <Link to={"/product/" + product._id}>
        <div className="card-body">
          <ShowPhoto item={product} url="product" />
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </Link>
    </Fragment>
  );
};
export default SimilarProduct;
