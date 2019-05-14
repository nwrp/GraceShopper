/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserOrders, loginAttempt, createSessionCart } from './store';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Collapse,
  FormGroup,
  Input,
  Label,
  Table,
  Row
} from 'reactstrap';
import axios from 'axios';

class CheckoutGeneric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseShipping: false,
      collapsePayment: false,
      collapseItems: false,
      customShipping: [false, false],
      customPayment: [false, false],
      customItems: [true, false],
      billingInfo: {
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        zip: '',
        state: ''
      },
      savedBilling: false,
      shippingInformation: {
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        zip: '',
        state: ''
      },
      savedShipping: false,
      cart: {},
      warningMessage: ''
    };
  }

  componentDidMount() {
    if (this.props.user.id && this.props.currentOrder) {
      if (this.props.currentOrder.id) {
        this.setState({ cart: this.props.currentOrder });
        this.setState({ billingInfo: this.props.user, savedBilling: true });
      }
    } else if (!this.props.user.id && this.props.sessionCart.sessionCartId) {
      this.setState({ cart: this.props.sessionCart });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.user.id && this.props.currentOrder) {
        this.setState({ cart: this.props.currentOrder });
        this.setState({ billingInfo: this.props.user, savedBilling: true });
      } else if (this.props.sessionCart.sessionCartId) {
        this.setState({ cart: this.props.sessionCart });
      } else {
        // Sets state to an empty cart if the store no longger has a cart to reference since the user fully deleted the items
        this.setState({ cart: {} });
      }
      console.log('sessionCart in CDU', this.props.sessionCart);
    }
  }

  toggleItems = () => {
    this.setState({ collapseItems: !this.state.collapseItems });
  };

  toggleShipping = () => {
    this.setState({ collapseShipping: !this.state.collapseShipping });
  };

  togglePayment = () => {
    this.setState({ collapsePayment: !this.state.collapsePayment });
  };

  toggleCustomItems = tab => {
    const prevState = this.state.customItems;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      customItems: state
    });
  };

  toggleCustomShipping = tab => {
    const prevState = this.state.customShipping;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      customShipping: state
    });
  };

  toggleCustomPayment = tab => {
    const prevState = this.state.customPayment;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      customPayment: state
    });
  };

  calculateOrderTotal = () => {
    return this.state.cart.lineitems.reduce((acc, item) => {
      acc += item.quantity * item.netTotalCost;
      return acc;
    }, 0);
  };

  priceFormat = numberString => {
    return numberString.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  changeBillingInformation = evt => {
    this.setState({
      billingInfo: {
        ...this.state.billingInfo,
        [evt.target.name]: evt.target.value
      }
    });
  };

  submitInformation = infoType => {
    if (infoType === 'billing') {
      this.setState({ savedBilling: true });
    } else if (infoType === 'shipping') {
      this.setState({ savedShipping: true });
    }
  };

  changeShippingInformation = evt => {
    this.setState({
      shippingInformation: {
        ...this.state.shippingInformation,
        [evt.target.id]: evt.target.value
      }
    });
  };

  setShippingSame = () => {
    this.setState({
      shippingInformation: this.state.billingInfo,
      savedShipping: true
    });
  };


  quantityValidation = () => {
    const quantityArray = [];
    axios.get('/api/products')
      .then(response => {
        this.state.cart.lineitems.forEach(item => {
          const product = response.data.find(p => parseInt(p.id, 10) === parseInt(item.productId, 10))
          if ((product.quantity - item.quantity) < 0) {
            return false;
          } else {
            quantityArray.push({ ...product, quantity: parseInt(product.quantity, 10) - parseInt(item.quantity, 10) });
          }
        })
        quantityArray.forEach(product => axios.put(`/api/products/${product.id}`, product))
      })
  }

  completePurchase = () => {
    const qtyCheck = this.quantityValidation();
    if (qtyCheck !== false) {
      if (this.state.savedBilling === true && this.state.savedShipping === true) {
        this.setState({warningMessage: ''})
        if (this.state.cart.id) {
          console.log('Logged in order');
          axios
            .put(`/api/orders/${this.state.cart.id}`)
            .then(() => this.props.fetchUserOrders(this.state.billingInfo.id))
            .then(() => this.props.history.push('/checkout/success'));
            console.log('Session cart');
        } else {
            axios
              .post('/api/users', {
                ...this.state.billingInfo,
                username: this.state.billingInfo.email,
                isAdmin: false
              })
              .then(response => {
                const user = response.data;
                axios
                  .post(`/api/orders/user/${user.id}`, {
                    ...this.state.cart,
                    userId: user.id,
                    status: 'purchased'
                  })
                  .then(orderData => {
                    const order = orderData.data;
                    this.state.cart.lineitems.forEach(item => {
                      axios.post(`/api/orders/${order.id}`, {
                        ...item,
                        orderId: order.id
                      });
                    });
                    
                    this.props.login(user);
                    this.props.requestCreateSessionCart({});
                    this.props.fetchUserOrders(user.id);
                    this.props.history.push('/checkout/success');
                  });
              });
            }
      } else {
        this.setState({warningMessage: 'Please save billing and shipping information before proceeding.'})
      }
    } else {
      this.setState({warningMessage: 'Cannot complete purchase with quantity of items in the cart. Please edit the product quantities before proceeding'});
    }
  };

  render() {
    return (
      <div>
        <hr />
        <Card>
          <CardHeader
            className="text-white"
            style={{ backgroundColor: '#7cc245' }}
          >
            Checkout
          </CardHeader>
          {this.state.cart.status ? (
            <div>
              <CardBody>
                {this.state.savedBilling === true ? (
                  <div>
                    <Row>
                      <Col>
                        <b>
                          {this.state.billingInfo.firstname}{' '}
                          {this.state.billingInfo.lastname}
                        </b>
                      </Col>
                    </Row>
                    <Row>
                      <Col>{this.state.billingInfo.email}</Col>
                    </Row>
                    <Row>
                      <Col>{this.state.billingInfo.street}</Col>
                    </Row>
                    <Row>
                      <Col>
                        {this.state.billingInfo.city},{' '}
                        {this.state.billingInfo.state}{' '}
                        {this.state.billingInfo.zip}
                      </Col>
                    </Row>
                    {this.state.billingInfo.createdAt ? (
                      <Row>
                        <Col>
                          <small className="text-center">
                            registered user since{' '}
                            {this.state.billingInfo.createdAt.slice(0, 10)}
                          </small>
                        </Col>
                      </Row>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Email</label>
                        <input
                          name="email"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Email"
                          onChange={this.changeBillingInformation}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Password</label>
                        <input
                          name="password"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="Password"
                          onChange={this.changeBillingInformation}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input
                          name="firstname"
                          className="form-control"
                          placeholder="First Name"
                          onChange={this.changeBillingInformation}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input
                          name="lastname"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={this.changeBillingInformation}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Street Address</label>
                      <input
                        name="street"
                        className="form-control"
                        placeholder="1234 Broadway"
                        onChange={this.changeBillingInformation}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>City</label>
                        <input
                          name="city"
                          className="form-control"
                          onChange={this.changeBillingInformation}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label>State</label>
                        <input
                          name="state"
                          className="form-control"
                          onChange={this.changeBillingInformation}
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label>Zip</label>
                        <input
                          name="zip"
                          className="form-control"
                          onChange={this.changeBillingInformation}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.submitInformation('billing')}
                    >
                      Save Profile
                    </button>
                  </form>
                )}
                <hr />
                <div id="itemsAccordion" data-children=".item">
                  <div className="item">
                    <Button
                      className="mb-3 p-0"
                      color="link"
                      onClick={() => this.toggleCustomItems(0)}
                      aria-expanded={this.state.customItems[0]}
                      // aria-Inputs="itemsAccordion1"
                    >
                      Products
                    </Button>
                    <Collapse
                      isOpen={this.state.customItems[0]}
                      data-parent="#itemsAccordion"
                      id="itemsAccordion1"
                      className="ml-3"
                    >
                      <Table
                        striped
                        bordered
                        hover
                        size="small"
                        className="mt-2"
                      >
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
                                    <div className="col-6 col-sm-3">
                                      <img
                                        src={item.product.imageUrl}
                                        className="img-thumbnail"
                                      />
                                    </div>
                                    <div className="col-5 col-lg-7">
                                      <Link
                                        style={{ textDecoration: 'none' }}
                                        to={`/products/${item.productId}`}
                                      >
                                        {item.product.title}
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right">
                                  {item.orderPrice}
                                </td>
                                <td className="text-right">{item.discount}</td>
                                <td className="text-right">{item.quantity}</td>
                                <td className="text-right">
                                  {this.priceFormat(
                                    item.netTotalCost * item.quantity
                                  )}
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
                      </Table>
                    </Collapse>
                  </div>
                </div>
                <hr />
                <div id="shippingAccordion" data-children=".item">
                  <div className="item">
                    <Button
                      className="mb-3 p-0"
                      color="link"
                      onClick={() => this.toggleCustomShipping(0)}
                      aria-expanded={this.state.customShipping[0]}
                      // aria-controls="shippingAccordion1"
                    >
                      Shipping
                    </Button>
                    <Collapse
                      isOpen={this.state.customShipping[0]}
                      data-parent="#shippingAccordion"
                      id="shippingAccordion1"
                      className="ml-3"
                    >
                      {this.state.savedShipping === true ? (
                        <div>
                          <Row>
                            <Col>
                              {this.state.shippingInformation.firstname}{' '}
                              {this.state.shippingInformation.lastname}
                            </Col>
                          </Row>
                          <Row>
                            <Col>{this.state.shippingInformation.street}</Col>
                          </Row>
                          <Row>
                            <Col>
                              {this.state.shippingInformation.city},{' '}
                              {this.state.shippingInformation.state}{' '}
                              {this.state.shippingInformation.zip}
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <div>
                          <FormGroup row className="my-0">
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="first-name">First Name</Label>
                                <Input
                                  type="text"
                                  id="firstname"
                                  placeholder="First Name"
                                  onChange={this.changeShippingInformation}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input
                                  type="text"
                                  id="lastname"
                                  placeholder="Last Name"
                                  onChange={this.changeShippingInformation}
                                />
                              </FormGroup>
                            </Col>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="street">Street</Label>
                            <Input
                              type="text"
                              id="street"
                              placeholder="Enter Street Address"
                              onChange={this.changeShippingInformation}
                            />
                          </FormGroup>
                          <FormGroup row className="my-0">
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="city">City</Label>
                                <Input
                                  type="text"
                                  id="city"
                                  placeholder="Enter City"
                                  onChange={this.changeShippingInformation}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="2">
                              <FormGroup>
                                <Label htmlFor="state">State</Label>
                                <Input
                                  type="text"
                                  id="state"
                                  placeholder="Enter State"
                                  onChange={this.changeShippingInformation}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="4">
                              <FormGroup>
                                <Label htmlFor="zip-code">Zip Code</Label>
                                <Input
                                  type="text"
                                  id="zip"
                                  placeholder="Zip Code"
                                  onChange={this.changeShippingInformation}
                                />
                              </FormGroup>
                            </Col>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              type="text"
                              id="country"
                              placeholder="Country Name"
                              defaultValue="United States of America"
                              onChange={this.changeShippingInformation}
                            />
                          </FormGroup>
                          <Button
                            color="primary"
                            onClick={() => this.submitInformation('shipping')}
                          >
                            Save Shipping
                          </Button>
                          <Button
                            color="outline-secondary"
                            className="ml-2"
                            onClick={this.setShippingSame}
                          >
                            Set Shipping as Billing
                          </Button>
                        </div>
                      )}
                    </Collapse>
                  </div>
                </div>
                <hr />
                <div id="paymentAccordion" data-children=".item">
                  <div className="item">
                    <Button
                      className="mb-3 p-0"
                      color="link"
                      onClick={() => this.toggleCustomPayment(0)}
                      aria-expanded={this.state.customPayment[0]}
                      // aria-controls="paymentAccordion1"
                    >
                      Payment
                    </Button>
                    <Collapse
                      isOpen={this.state.customPayment[0]}
                      data-parent="#paymentAccordion"
                      id="paymentAccordion1"
                      className="ml-3"
                    >
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <Label htmlFor="nameOnCard">Name on Card</Label>
                            <Input
                              type="text"
                              id="nameOnCard"
                              placeholder="Enter Name"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <Label htmlFor="ccnumber">Credit Card Number</Label>
                            <Input
                              type="text"
                              id="ccnumber"
                              placeholder="0000 0000 0000 0000"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">
                          <FormGroup>
                            <Label htmlFor="ccmonth">Month</Label>
                            <Input type="select" name="ccmonth" id="ccmonth">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs="4">
                          <FormGroup>
                            <Label htmlFor="ccyear">Year</Label>
                            <Input type="select" name="ccyear" id="ccyear">
                              <option>2019</option>
                              <option>2020</option>
                              <option>2021</option>
                              <option>2022</option>
                              <option>2023</option>
                              <option>2024</option>
                              <option>2025</option>
                              <option>2026</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs="4">
                          <FormGroup>
                            <Label htmlFor="cvv">CVV/CVC</Label>
                            <Input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Collapse>
                  </div>
                </div>
                {this.state.warningMessage !== "" ? (
                  <div className="alert alert-warning" role="alert">
                    {this.state.warningMessage}
                  </div>
                ) : (
                  ""
                )}
              </CardBody>
              <CardFooter>
                <Button
                  color="outline-success"
                  size="lg"
                  block
                  onClick={() => this.completePurchase()}
                >
                  Confirm Purchase
                </Button>
              </CardFooter>
            </div>
          ) : (
            <div>Please add items to your cart before checking out.</div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ user, sessionCart, orders }) => {
  return {
    user,
    sessionCart,
    currentOrder: orders.find(order => order.status === 'pending')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserOrders: id => dispatch(fetchUserOrders(id)),
    login: user => dispatch(loginAttempt(user)),
    requestCreateSessionCart: sessionCart =>
      dispatch(createSessionCart(sessionCart))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutGeneric);
