import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Admin from "./components/auth/Admin";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Cart from "./components/layout/Cart";
import Dashboard from "./components/user/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import PrivateRoute from "./routing/PrivateRoute";
import AdminRoute from "./routing/AdminRoute";
import AddCatagory from "./components/admin/AddCatagory";
import AddProduct from "./components/admin/AddProduct";
import Home from "./components/user/Home";
import Product from "./components/user/Product";
import Shop from "./components/layout/Shop";
import { loadUser } from "./actions/authAction";
import { getCart } from "./actions/cartAction";

//redux
import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCart());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Alert />
        </div>

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/home" component={Home} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path="/admin/create/catagory"
            component={AddCatagory}
          />
          <AdminRoute
            exact
            path="/admin/create/product"
            component={AddProduct}
          />

          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
