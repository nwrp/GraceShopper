import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import {
  deleteItemSessionCart,
  createSessionCart,
  updateQuantity,
  deleteItemPendingOrder
} from "./store";
import axios from "axios";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      lineitems: {},
      warningMessage: ""
    };
  }

  componentDidMount() {
    if (this.props.user.id && this.props.currentOrder) {
      if (this.props.currentOrder.id) {
        this.setState({ cart: this.props.currentOrder });
      }
    }  else if (!this.props.user.id && this.props.sessionCart.sessionCartId) {
      this.setState({ cart: this.props.sessionCart });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.user.id && this.props.currentOrder) {
        this.setState({ cart: this.props.currentOrder });
      } else if (this.props.sessionCart.sessionCartId) {
        this.setState({ cart: this.props.sessionCart });
      } else {
        // Sets state to an empty cart if the store no longger has a cart to reference since the user fully deleted the items
        this.setState({ cart: {} });
      }
      console.log("sessionCart in CDU", this.props.sessionCart);
    }
  }

  calculateOrderTotal = () => {
    return this.state.cart.lineitems.reduce((acc, item) => {
      acc += item.quantity * item.netTotalCost;
      return acc;
    }, 0);
  };

  priceFormat = numberString => {
    return numberString.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  updateQuantity = productId => {
    axios
      .get(`/api/products/${productId}`)
      .then(response => response.data)
      .then(data => {
        // Get available quantity of product from server
        const availableQty = data.quantity;
        // Find matching item on current cart
        if (parseInt(this.state.lineitems[productId], 10) <= availableQty) {
          const templineitems = this.state.cart.lineitems.map(item => {
            if (parseInt(item.productId, 10) === parseInt(productId, 10)) {
              item.quantity = parseInt(this.state.lineitems[productId], 10);
            }
            return item;
          });
          // Upload changes to session cart
          this.setState({ warningMessage: "" });
          // Check for user's pending order
          if (this.props.user.id && this.props.currentOrder) {
            const lineItem = this.state.cart.lineitems.find(
              item => item.productId === parseInt(productId, 10)
            );
            this.props.updateQuantity(
              lineItem.id,
              parseInt(this.state.lineitems[productId], 10)
            );
          } else {
            // Upload changes to session cart
            this.props.requestCreateSessionCart({
              ...this.state.cart,
              lineitems: templineitems
            });
          }
        } else {
          const prevItem = this.state.cart.lineitems.find(
            item => parseInt(item.productId, 10) === parseInt(productId, 10)
          );
          this.setState(prevState => ({
            warningMessage:
              "Please enter a value less than the available quantity.",
            lineitems: {
              ...prevState.lineitems,
              [productId]: prevItem.quantity
            }
          }));
        }
      });
  };

  handleDelete = (productId) => {
    if (this.props.user.id && this.props.currentOrder) {
      const lineItem = this.state.cart.lineitems.find(
        item => item.productId === parseInt(productId, 10)
      );
      this.props.deleteItemPendingOrder(lineItem.id)
        .then( () => {
          const tempCart = this.state.cart;
          tempCart.lineitems = tempCart.lineitems.filter(item => item.id !== lineItem.id);
          this.setState({cart: tempCart});
        })
    } else {
      this.props.requestDeleteItemSessionCart(productId);
    }
  }

  handleChange = evt => {
    const templineitems = this.state.lineitems;
    templineitems[evt.target.id] = evt.target.value;
    this.setState({ lineitems: templineitems });
  };

  render() {
    return (
      <Fragment>
        <hr className="my-4" />
        <Card>
          <Card.Header style={{ backgroundColor: "#91c7f9" }}>
            <div className="text-white">Shopping Cart</div>
          </Card.Header>
          <Card.Body>
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
                            <div className="col-lg-7">
                              <Card.Link
                                style={{ textDecoration: "none" }}
                                href={`/#/products/detail/${item.productId}`}
                              >
                                {item.product.title}
                              </Card.Link>
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          {this.priceFormat(item.orderPrice)}
                        </td>
                        <td className="text-right">
                          {this.priceFormat(item.discount)}
                        </td>
                        <td className="text-right">
                          <div className="form-group">
                            {this.state.lineitems[item.productId] ===
                            undefined ? (
                              <input
                                name="quantity"
                                className="form-control text-right"
                                value={item.quantity}
                                id={item.productId}
                                onChange={this.handleChange}
                              />
                            ) : (
                              <input
                                name="quantity"
                                className="form-control text-right"
                                value={this.state.lineitems[item.productId]}
                                id={item.productId}
                                onChange={this.handleChange}
                              />
                            )}
                          </div>
                        </td>
                        <td className="text-right">
                          {this.priceFormat(item.netTotalCost * item.quantity)}
                          <div className="row d-flex flex-nowrap justify-content-end">
                            <button
                              type="button"
                              className="btn btn-info btn-sm mt-3 mr-1"
                              id={item.productId}
                              onClick={() =>
                                this.updateQuantity(item.productId)
                              }
                            >
                              <i className="fas fa-sync" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm mt-3 mr-2"
                              id={item.productId}
                              onClick={ () => this.handleDelete(item.productId)
                              }
                            >
                              <i
                                className="fas fa-trash-alt"
                              />
                            </button>
                          </div>
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
                    <th scope="col">
                      ${this.priceFormat(this.calculateOrderTotal())}
                    </th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <div className="mt-2 mb-2">
                Oh no, there are no items in your cart!
              </div>
            )}
            {/* Warning message for quantity update issues */}
            {this.state.warningMessage !== "" ? (
              <div className="alert alert-warning" role="alert">
                {this.state.warningMessage}
              </div>
            ) : (
              ""
            )}
          </Card.Body>
          <Card.Footer>
            <div className="row">
              <div className="col align-self-start">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => this.props.history.push("/products")}
                >
                  {"<- "}Continue Shopping
                </button>
              </div>
              <div className="col text-right">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    this.props.history.push('/checkout')
                  }
                >
                  Checkout{" ->"}
                </button>
              </div>
            </div>
          </Card.Footer>
        </Card>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, sessionCart, orders }) => {
  return {
    user,
    sessionCart,
    orders,
    currentOrder: orders.find(order => order.status === "pending")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestDeleteItemSessionCart: productId =>
      dispatch(deleteItemSessionCart(productId)),
    requestCreateSessionCart: sessionCart =>
      dispatch(createSessionCart(sessionCart)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity(id, quantity)),
    deleteItemPendingOrder: id => dispatch(deleteItemPendingOrder(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
