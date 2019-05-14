import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form } from 'react-bootstrap';

import {
  loginAttempt,
  createPendingOrder,
  addToCart,
  updateQuantity,
  fetchUserOrders,
  deleteItemSessionCart
} from './store';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: {}
    };
  }
  handleChange = evt => {
    this.setState(
      {
        [evt.target.name]: evt.target.value
      },
      () => console.log(this.state)
    );
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props
      .login({
        email: this.state.email,
        password: this.state.password
      })
      .then(user => {
        if (user.id) {
          this.props.requestFetchUserOrders(user.id);
          this.props.history.push('/');
        }
      })
      .catch(error =>
        this.setState(
          {
            error,
            email: '',
            password: ''
          },
          () => console.log(this.state)
        ));
  };

  handleChange = evt => {
    this.setState(
      {
        [evt.target.name]: evt.target.value
      },
      () => console.log(this.state)
    );
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props
      .login({
        email: this.state.email,
        password: this.state.password
      })
      .then(user => {
        if (user.id) {
          this.props.requestFetchUserOrders(user.id).then(orders => {
            if (this.props.sessionCart) {
              const pendingOrder = orders.find(
                order => order.status === 'pending'
              );
              this.dealWithSessionCart(pendingOrder, user);
            }
          });
          this.props.history.push('/');
        }
      })
      .catch(error =>
        this.setState(
          {
            error,
            email: '',
            password: ''
          },
          () => console.log(this.state)
        ));
  };
  dealWithSessionCart = async (pendingOrder, user) => {
    if (!pendingOrder) {
      pendingOrder = await this.props.createPendingOrder({
        userId: user.id,
        status: 'pending'
      });
    }
    this.props.sessionCart.lineitems.forEach(item =>
      this.dealWithCartItems(item, pendingOrder));
  };
  dealWithCartItems = (item, pendingOrder) => {
    const existingli = pendingOrder.lineitems.find(
      li => li.productId === item.productId
    );
    if (existingli) {
      const newQuant = existingli.quantity + item.quantity;
      this.props.updateQuantity(existingli.id, newQuant)
        .then( () => this.props.deleteItemSessionCart(item.productId));
    } else {
      item.orderId = pendingOrder.id;
      this.props.addToCart(item)
      .then( () => this.props.deleteItemSessionCart(item.productId));
    }
  };
  render() {
    const { email, password, error } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <Fragment>
        <Card>
          <Card.Header
            style={{ backgroundColor: '#01A4A4' }}
            className="text-white"
          >
            Please log into your Grace Shopper account:
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <Button
                type="submit"
                style={{ backgroundColor: '#01A4A4' }}
                active
              >
                Log-In
              </Button>
              {error.message ? (
                <div>
                  <em>
                    There was an error logging in. Your email and/or password
                    were not recognized.
                  </em>
                </div>
              ) : (
                ''
              )}
            </Form>
          </Card.Body>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ sessionCart, orders }) => {
  return {
    sessionCart,
    pendingOrder: orders.find(order => order.status === 'pending')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(loginAttempt(user)),
    requestFetchUserOrders: userId => dispatch(fetchUserOrders(userId)),
    createPendingOrder: order => dispatch(createPendingOrder(order)),
    addToCart: item => dispatch(addToCart(item)),
    updateQuantity: (id, quant) => dispatch(updateQuantity(id, quant)),
    deleteItemSessionCart: (id) => dispatch(deleteItemSessionCart(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
