import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getPhoto } from "../../actions/userAction";

const ShowPhoto = ({ item, url }) => {
  const showPhoto = () => {
    getPhoto(item._id, url);
  };
  return (
    <Fragment>
      <img
        src={`/api/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "24rem", maxWidth: "15rem" }}
      />
    </Fragment>
  );
};
export default connect(null, { getPhoto })(ShowPhoto);
