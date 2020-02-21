import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCatagories } from "../../actions/adminAction";
import { getSearch } from "../../actions/userAction";

const Search = ({
  getSearch,
  getCatagories,
  admin: { catagories },
  user: { searchResults }
}) => {
  const [data, setData] = useState({
    catagory: "",
    search: "",
    results: [],
    searched: false
  });

  const { catagory, results, searched, search } = data;
  useEffect(() => {
    getCatagories();
  }, []);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.value);
    getSearch(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (search) {
      getSearch(search);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <form onSubmit={onSubmit}>
          <span className="input-group-text">
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <select
                  className="btn mr-2"
                  name="catagory"
                  onChange={handleChange}
                >
                  <option value="All">Select Catagory</option>
                  {catagories &&
                    catagories.map(catagory => (
                      <option key={catagory._id} value={catagory._id}>
                        {catagory.name}
                      </option>
                    ))}
                </select>
              </div>
              <input
                type="search"
                name="search"
                className="form-control"
                placeholder="Search Products"
                value={search}
                onChange={handleChange}
              />
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  admin: state.admin,
  user: state.user
});
export default connect(mapStateToProps, { getSearch, getCatagories })(Search);
