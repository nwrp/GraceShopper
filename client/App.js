import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
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
import CheckoutSuccess from './CheckoutSuccess';
import UserAccount from './AccountViews/UserAccount';
import SignUp from './SignUp';
import io from 'socket.io-client';
const socket = io(window.location.origin);

class App extends Component {
  constructor() {
    super();
    this.state = {
      alert: {},
    };
  }
  componentDidMount() {
    socket.on('flashSaleProd', alert => {
      this.setState({ alert: alert });
    });
    this.props.fetchInitialCategories();
    this.props.fetchInitialProducts();
    this.props.fetchInitialProductImages();
    this.props.fetchInitialUsers();
    this.props.sessionLogin().then(user => {
      console.log(user);
      if (user.id) {
        console.log(user.id);
        this.props.fetchUserOrders(user.id);
      }
    });
    this.props.getSessionCart();
    this.props.fetchInitialProductReviews();
  }
  render() {
    const { alert } = this.state;
    return (
      <Fragment>
        <HashRouter>
          <Route component={Navigation} />
          {alert.prod ? (
            <Alert
              variant="info"
              onClose={() => this.setState({ alert: {} })}
              dismissible
            >
              <Alert.Heading>Wow!!! Don't Miss This Flash Sale</Alert.Heading>
              <p>Check out this great sale on</p>
              <Link
                to={`/products/detail/${alert.prod.id}`}
                onClick={() => this.setState({ alert: {} })}
              >
                {alert.prod.title}
              </Link>
            </Alert>
          ) : (
            ''
          )}
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
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={CheckoutGeneric} />
            <Route exact path="/checkout/success" component={CheckoutSuccess} />
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
