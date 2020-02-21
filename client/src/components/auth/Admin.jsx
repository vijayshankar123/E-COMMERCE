import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginAdmin, clearError, error } from "../../actions/authAction";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertAction";

const Admin = ({
  auth: { isAuthenticated, user },
  clearError,
  loginAdmin,
  error,
  setAlert
}) => {
  useEffect(
    () => {
      if (error) {
        setAlert(error, "danger");
        clearError();
      }
      //eslint-disable-next-line
    },
    [error]
  );
  const [formData, setFormData] = useState({
    code: "",
    password: ""
  });
  const { code, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(code, password);
    loginAdmin({ code, password });
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    setFormData({
      code: "",
      password: ""
    });
  };

  //redirect if logged in
  if (isAuthenticated && user && user.code) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <div className="containere">
      <h1 className="large text-primary">Sign In As Admin</h1>
      <p className="lead">
        <i className="fas fa-user" />Private
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="enter id"
            name="code"
            value={code}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Log In" />
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  error: state.auth.error,
  auth: state.auth
});
export default connect(mapStateToProps, { setAlert, loginAdmin, clearError })(
  Admin
);
