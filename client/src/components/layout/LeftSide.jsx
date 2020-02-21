import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsBySoldAndArrival } from "../../actions/userAction";
import ProductCard from "../layout/ProductCard";
import { connect } from "react-redux";

const LeftSide = ({ catagories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleChange = e => () => {
    console.log(e);
    const checkIfExist = checked.indexOf(e);
    const newChecked = [...checked];
    if (checkIfExist === -1) {
      newChecked.push(e);
    } else {
      newChecked.splice(checkIfExist, 1);
    }
    //  console.log(newChecked);
    setChecked(newChecked);
    handleFilters(newChecked, "catagory");
  };
  return (
    <div className="ml-4">
      {catagories.map(catagory => (
        <li className="list-unstyles " key={catagory._id}>
          <input
            onChange={handleChange(catagory._id)}
            type="checkbox"
            value={checked.indexOf(catagory._id === -1)}
            className="form-check-input"
          />
          <label className="form-check-label">{catagory.name}</label>
        </li>
      ))}
    </div>
  );
};

export default connect()(LeftSide);
