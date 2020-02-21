import React, { Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const handleChange = e => {
    handleFilters(e.target.value, "price");
  };
  return (
    <div className="ml-4">
      {prices.map(price => (
        <div className="list-unstyles " key={price._id}>
          <input
            onChange={handleChange}
            type="radio"
            value={`${price._id}`}
            name="price"
            className="form-check-input"
          />
          <label className="form-check-label">{price.name}</label>
        </div>
      ))}
    </div>
  );
};
export default RadioBox;
