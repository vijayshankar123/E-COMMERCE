import React, { Fragment } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import store from "../../store";
import { Redirect } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const Dashboard = ({ auth: { user, loading } }) => {
  if (!loading && user && user.code) {
    return <Redirect to="/admin/dashboard" />;
  }
  const userLinks = () => {
    return (
      <div className="card mt-5 mb-5">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <Link to="/user/cart">
            <li className="list-group-item">My Cart</li>
          </Link>
        </ul>
      </div>
    );
  };
  const userInfo = () => {
    return (
      <div className="card mt-5 mb-5 ">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            name : {user.name !== null && user.name}
          </li>
          <li className="list-group-item">
            email : {user.email !== null && user.email}
          </li>
        </ul>
      </div>
    );
  };
  const userHistory = () => {
    return (
      <div className="card mt-5 mb-5">
        <h3 className="card-header">Order history</h3>
        <ul className="list-group">
          <li className="list-group-item">name</li>
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
          <div className="col-md-3">{userLinks()}</div>
          <div className="col-md-9">
            {userInfo()}
            {userHistory()}
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Dashboard);
