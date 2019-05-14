import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  createPendingOrder,
  addToCart,
  createSessionCart,
  setSessionCart
} from './store';

class AddToCartButton extends Component {
  constructor(props) {
    super(props);
  }

  addToCartOrder = order => {
    this.props
      .addToCart({
        orderId: order.id,
        productId: this.props.product.id,
        quantity: 1,
        orderPrice: this.props.product.price,
        netTotalCost: this.props.product.price
      })
      .then(() => this.props.history.push('/cart'));
  };

  handleAddToCartLoggedIn = () => {
    const { order, user } = this.props;
    if (order) {
      this.addToCartOrder(order);
    } else {
      this.props
        .createPendingOrder({
          userId: user.id,
          status: 'pending'
        })
        .then(newOrder => {
          this.addToCartOrder(newOrder);
        });
    }
  };

  initSessionCart = (product, qty) => {
    return {
      sessionCartId: 1,
      status: 'pending',
      lineitems: [
        {
          quantity: qty,
          orderPrice: product.price,
          discount: 0,
          netTotalCost: product.price,
          productId: product.id,
          product: {
            id: product.id,
            title: product.title,
            imageUrl: product.imageUrl
          }
        }
      ]
    };
  };

  updateSessionCart = (product, qty) => {
    const tempSessionCart = this.props.sessionCart;
    const lineItemIdx = tempSessionCart.lineitems.findIndex(
      item => item.product.id === product.id
    );
    if (lineItemIdx > -1) {
      tempSessionCart.lineitems[lineItemIdx].quantity += qty;
    } else {
      tempSessionCart.lineitems.push({
        quantity: qty,
        orderPrice: product.price,
        discount: 0,
        netTotalCost: product.price,
        productId: product.id,
        product: {
          id: product.id,
          title: product.title,
          imageUrl: product.imageUrl
        }
      });
    }
    this.props.requestCreateSessionCart(tempSessionCart);
  };

  addToCart = (product, quantity) => {
    // Checks if user logged in
    if (this.props.user.email) {
      this.handleAddToCartLoggedIn();
    } else if (this.props.sessionCart.sessionCartId) {
      // Session cart exists -> updates quantity or adds line item
      console.log('Session cart exists: ' + this.props.sessionCart);
      this.updateSessionCart(product, quantity);
    } else {
      // Create a session cart
      const sessionCart = this.initSessionCart(product, quantity);
      this.props.requestCreateSessionCart(sessionCart);
    }
    // Sends user to cart
    this.props.history.push('/cart');
  };

  render() {
    const product = this.props.product;
    return (
      <Col className="col-12">
        <Button
          variant="outline-light"
          type="button"
          onClick={() => this.addToCart(product, 1)}
          size="sm"
        >
          <i className="fas fa-cart-arrow-down" />
        </Button>
      </Col>
    );
  }
}

const mapStateToProps = ({ categories, user, sessionCart, orders }) => {
  return {
    user,
    categories,
    sessionCart,
    order: orders.find(order => order.status === 'pending')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPendingOrder: order => dispatch(createPendingOrder(order)),
    addToCart: item => dispatch(addToCart(item)),
    requestCreateSessionCart: sessionCart =>
      dispatch(createSessionCart(sessionCart)),
    requestUpdateCart: sessionCart => dispatch(setSessionCart(sessionCart))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCartButton);
