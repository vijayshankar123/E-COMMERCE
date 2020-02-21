import React, { Fragment } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import store from "../../store";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const AdminDashboard = ({ auth: { user, loading } }) => {
  const adminLinks = () => {
    return (
      <div className="card mt-5 mb-5">
        <h3 className="card-header">Admin Links</h3>
        <ul className="list-group">
          <Link to="/admin/create/catagory">
            <li className="list-group-item">Create Catagory</li>
          </Link>
          <Link to="/admin/create/product">
            <li className="list-group-item">Create Product</li>
          </Link>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mt-5 mb-5 ">
        <h3 className="card-header">Order Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Orders :</li>
        </ul>
      </div>
    );
  };
  return (
    <Fragment>
      {loading && user === null ? (
        <Spinner />
      ) : (
        <div className="container row">
          <div className="col-md-3">{adminLinks()}</div>
          <div className="col-md-9">{adminInfo()}</div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AdminDashboard);
