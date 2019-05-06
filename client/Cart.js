import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: {}
    };
  }

    componentDidMount() {
        if (this.props.user.id && this.props.currentOrder) {
            this.setState({cart: this.props.currentOrder})
        } else if (this.props.sessionCart.sessionCartId) {
            this.setState({cart: this.props.sessionCart})
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.user.id) {
                this.setState({cart: this.props.currentOrder})
            } else if (this.props.sessionCart.sessionCartId) {
                this.setState({cart: this.props.sessionCart})
            }
            console.log(this.props.sessionCart)
        }
      }
     

  calculateOrderTotal = () => {
    return this.state.cart.lineitems
      .reduce((acc, item) => {
        acc += item.quantity * item.netTotalCost;
        return acc;
      }, 0)
  };

  priceFormat = (numberString) => {
    return numberString.toLocaleString(undefined, {minimumFractionDigits: 2});
  };

  handleChange = (evt) => {
    const tempCart = this.state.cart;
    tempCart.lineitems = tempCart.lineitems.map(item => {
      if (parseInt(evt.target.id, 10) === parseInt(item.productId, 10)) {
        item.quantity = evt.target.value;
      }
      return item;
    })
    this.setState({cart: tempCart})
  }

  render() {
    return (
      <div className="container">
        <h2 className="mt-2">Shopping Cart</h2>
        {this.state.cart.status ? (
          <table className="table mt-2">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Discount</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cart.lineitems.map(item => {
                return (
                  <tr key={item.productId}>
                    <td>
                      <div className="row">
                        <div className="col-6 col-lg-3">
                          <img
                            src={item.product.imageUrl}
                            className="img-thumbnail"
                          />
                        </div>
                        <div className="col-5 col-lg-7">
                          <Card.Link
                            style={{ textDecoration: 'none' }}
                            href={`/#/products/${item.productId}`}
                          >
                            {item.product.title}
                          </Card.Link>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">{this.priceFormat(item.orderPrice)}</td>
                    <td className="text-right">{this.priceFormat(item.discount)}</td>
                    <td className="text-right">
                      <div className="form-group">
                        <input name="quantity" className="form-control text-right" value={item.quantity} id={item.productId} onChange={this.handleChange} />
                      </div>
                    </td>
                    <td className="text-right">
                      {this.priceFormat(item.netTotalCost * item.quantity)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th scope="col">Total</th>
                <th />
                <th />
                <th />
                <th scope="col">${this.priceFormat(this.calculateOrderTotal())}</th>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="mt-2 mb-2">Oh no, there are no items in your cart!</div>
        )}
        <div className="row">
          <div className="col align-self-start">
            <button type="button" className="btn btn-info" onClick={() => this.props.history.push('/products')}>
              {'<- '}Continue Shopping
            </button>
          </div>
          {(this.props.user.id && this.props.currentOrder) ?
            <div className="col text-right">
              <button type="button" className="btn btn-success" onClick={() => this.props.history.push('/products')}>
                Checkout{' ->'}
              </button>
            </div> : ''
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, sessionCart, orders }) => {
    return {
        user,
        sessionCart,
        currentOrder: orders.find(order => order.status === 'pending')
    }
}

export default connect(mapStateToProps)(Cart);
