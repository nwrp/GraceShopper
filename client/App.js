import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Products from './Products';
import Navigation from './Nav';
import ProductDetail from './ProductDetail';
import ProductImages from './ProductImages';
import { connect } from 'react-redux';
import {
  fetchReviews,
  fetchCategories,
  fetchProducts,
  fetchProductImages,
  fetchUsers,
  sessionLogin,
  getSessionCart,
  fetchUserOrders,
} from './store';
import Home from './Home';
import Admin from './AccountViews/AdminAccount';
import Login from './Login';
import Cart from './Cart';
import Checkout from './CheckOut';
import CheckoutGeneric from './CheckoutGeneric'; 
import UserAccount from './AccountViews/UserAccount';

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialCategories();
    this.props.fetchInitialProducts();
    this.props.fetchInitialProductImages();
    this.props.fetchInitialUsers();
    this.props.sessionLogin();
    this.props.getSessionCart();
    this.props.fetchInitialProductReviews();
  }
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Route component={Navigation} />
          <Switch>
            <Route exact path="/products/:index?" component={Products} />
            <Route
              exact
              path="/products/filter/category/:categoryId?/:index?"
              component={Products}
            />
            <Route
              exact
              path="/products/search/category/:categoryId/term/:searchTerm?/:index?"
              component={Products}
            />
            <Route
              exact
              path="/products/detail/:id"
              component={ProductDetail}
            />
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
            <Route exact path="/checkout" component={CheckoutGeneric} />
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
    fetchReviews: () => dispatch(fetchReviews()),
    fetchInitialCategories: () => dispatch(fetchCategories()),
    fetchInitialProducts: () => dispatch(fetchProducts()),
    fetchInitialProductImages: () => dispatch(fetchProductImages()),
    fetchInitialProductReviews: () => dispatch(fetchReviews()),
    fetchInitialUsers: () => dispatch(fetchUsers()),
    sessionLogin: () => dispatch(sessionLogin()),
    getSessionCart: () => dispatch(getSessionCart()),
    fetchUserOrders: userId => dispatch(fetchUserOrders(userId)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
