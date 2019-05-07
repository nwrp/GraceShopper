import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Products from './Products';
import Navigation from './Nav';
import ProductDetail from './ProductDetail';
import ProductImages from './ProductImages';
import { connect } from 'react-redux';
import {
  fetchCategories,
  fetchProducts,
  fetchProductImages,
  fetchUsers,
  sessionLogin,
  getSessionCart
} from './store';
import Home from './Home';
import Admin from './Admin/AdminAccount';
import Login from './Login';
import Cart from './Cart';
import Checkout from './CheckOut';
import UserAccount from './UserAccount';

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialCategories();
    this.props.fetchInitialProducts();
    this.props.fetchInitialProductImages();
    this.props.fetchInitialUsers();
    this.props.sessionLogin();
    this.props.getSessionCart();
  }
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Route component={Navigation} />
          <Switch>
            <Route exact path="/products" component={Products} />
            <Route
              exact
              path="/products/category/:categoryId?"
              component={Products}
            />
            <Route
              path="/products/category/:categoryId/search/:searchTerm?"
              component={Products}
            />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route
              exact
              path="/products/productImages"
              component={ProductImages}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/user" component={UserAccount} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/orders/:orderId" component={Checkout} />
            <Route
              render={() => <div>Sorry That Page Couldn't Be Found</div>}
            />
          </Switch>
        </HashRouter>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialCategories: () => dispatch(fetchCategories()),
    fetchInitialProducts: () => dispatch(fetchProducts()),
    fetchInitialProductImages: () => dispatch(fetchProductImages()),
    fetchInitialUsers: () => dispatch(fetchUsers()),
    sessionLogin: () => dispatch(sessionLogin()),
    getSessionCart: () => dispatch(getSessionCart())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
