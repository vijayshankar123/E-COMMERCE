import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { clearError } from "../../actions/authAction";

import { createProduct, getCatagories } from "../../actions/adminAction";
import { setAlert } from "../../actions/alertAction";
import { connect } from "react-redux";

const AddProduct = ({
  setAlert,
  clearError,
  admin: { catagories, error },
  createProduct,
  history,
  getCatagories
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    catagory: "",
    shipping: "",
    quantity: "",
    photo: "",
    createdProduct: "",
    formData: ""
  });

  const {
    name,
    description,
    price,
    catagory,
    shipping,
    quantity,
    photo,
    createdProduct,
    formData
  } = values;

  useEffect(
    () => {
      setValues({ ...values, formData: new FormData() });
      getCatagories();
      if (error) {
        setAlert(error, "danger");
        clearError();
      }
    },
    [error]
  );

  const onChange = e => {
    var value = "";
    if (e.target.name == "photo") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: value });
  };
  const onSubmit = e => {
    e.preventDefault();

    console.log(formData);
    createProduct(formData, history);
    if (error) {
      setAlert(error, "danger");
      clearError();
    } else {
      setValues({
        name: "",
        description: "",
        price: "",
        catagory: "",
        shipping: "",
        quantity: "",
        photo: "",
        createdProduct: "",
        formData: ""
      });
    }
  };

  return (
    <div className="containere">
      <p className="lead">
        <i className="fas fa-user" /> Create Product
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ display: "block" }} className="text-muted">
            Product Photo{" "}
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={onChange}
            required
          />
          <small className="text-muted">(less than 1 mb)</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Product description"
            name="description"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="catagory"
            onChange={onChange}
            required
          >
            <option selected disabled hidden>
              Select Catagory
            </option>
            {catagories &&
              catagories.map(catagory => (
                <option
                  className="list-item"
                  key={catagory._id}
                  value={catagory._id}
                >
                  {catagory.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="shipping"
            onChange={onChange}
            required
          >
            <option selected disabled hidden>
              Select Shipping
            </option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, {
  setAlert,
  clearError,
  createProduct,
  getCatagories
})(AddProduct);
