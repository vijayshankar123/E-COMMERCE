import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { createCatagory } from "../../actions/adminAction";
import { setAlert } from "../../actions/alertAction";
import { connect } from "react-redux";

const AddCatagory = ({ createCatagory, history }) => {
  const [name, setName] = useState("");

  const onChange = e => {
    setName(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log(name);
    createCatagory({ name, history });
    setName("");
  };

  return (
    <div className="containere">
      <p className="lead">
        <i className="fas fa-user" /> Create Catagory
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Catagory Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { createCatagory })(AddCatagory);
