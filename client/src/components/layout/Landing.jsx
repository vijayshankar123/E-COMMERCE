import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">E-Tech</h1>
          <p className="lead">
            A Techie ? Expand your skills now . Take a look at our collection of
            books
          </p>
          <div className="buttons">
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
            <p>(Use email : guest@gmail.com password : guest123)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
