import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
} from "reactstrap";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseShipping: false,
      collapsePayment: false,
      collapseItems: false,
      customShipping: [false, false],
      customPayment: [false, false],
      customItems: [true, false]
    };
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
    return this.props.order.lineitems
      .reduce((acc, item) => {
        acc += item.quantity * item.netTotalCost;
        return acc;
      }, 0)
      .toFixed(2);
  };

  priceFormat = numberString => {
    return numberString.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  render() {
    const { user, order } = this.props;
    // console.log('props in Checkout render', this.props);

    return (
      <div>
        <hr className="my-4" />
        {order ? (
          <Card>
            <CardHeader
              className="text-white"
              style={{ backgroundColor: "#7cc245" }}
            >
              Order # {order.id}
              <span className="float-right">
                {order.createdAt.slice(0, 10)}
              </span>
            </CardHeader>

            <CardBody>
              <Row>
                <Col>{user.name}</Col>
              </Row>
              <Row>
                <Col>{user.email}</Col>
              </Row>
              <Row>
                <Col>
                  <small className="text-center">
                    registered user since {user.createdAt.slice(0, 10)}
                  </small>
                </Col>
              </Row>

              <hr />
              <div id="itemsAccordion" data-children=".item">
                <div className="item">
                  <Button
                    className="mb-3 p-0"
                    color="link"
                    onClick={() => this.toggleCustomItems(0)}
                    aria-expanded={this.state.customItems[0]}
                    aria-controls="itemsAccordion1"
                  >
                    Products
                  </Button>
                  <Collapse
                    isOpen={this.state.customItems[0]}
                    data-parent="#itemsAccordion"
                    id="itemsAccordion1"
                    className="ml-3"
                  >
                    <Table striped bordered hover size="small" className="mt-2">
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
                        {order.lineitems.map(item => {
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
                                    {/* {item.product.title} */}
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={`/products/detail/${item.productId}`}
                                    >
                                      {item.product.title}
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                {this.priceFormat(item.orderPrice)}
                              </td>
                              <td className="text-right">{item.discount}</td>
                              <td className="text-right">{item.quantity}</td>
                              <td className="text-right">
                                {item.netTotalCost * item.quantity}
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
                          <th scope="col">{this.calculateOrderTotal()}</th>
                        </tr>
                      </tfoot>
                    </Table>
                  </Collapse>
                </div>
              </div>

              <div id="shippingAccordion" data-children=".item">
                <div className="item">
                  <Button
                    className="mb-3 p-0"
                    color="link"
                    onClick={() => this.toggleCustomShipping(0)}
                    aria-expanded={this.state.customShipping[0]}
                    aria-controls="shippingAccordion1"
                  >
                    Shipping
                  </Button>
                  <Collapse
                    isOpen={this.state.customShipping[0]}
                    data-parent="#shippingAccordion"
                    id="shippingAccordion1"
                    className="ml-3"
                  >
                    <FormGroup>
                      <Label htmlFor="company">Name</Label>
                      <Input
                        type="text"
                        id="company"
                        placeholder="Enter your name"
                        defaultValue={`${user.firstname} ${user.lastname}`}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="street">Street</Label>
                      <Input
                        type="text"
                        id="street"
                        placeholder="Enter street name"
                        defaultValue={`${user.street}`}
                      />
                    </FormGroup>
                    <FormGroup row className="my-0">
                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="city">City</Label>
                          <Input
                            type="text"
                            id="city"
                            placeholder="Enter city"
                            defaultValue={`${user.city}`}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="2">
                        <FormGroup>
                          <Label htmlFor="city">State</Label>
                          <Input
                            type="text"
                            id="state"
                            placeholder="Enter State"
                            defaultValue={`${user.state}`}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="4">
                        <FormGroup>
                          <Label htmlFor="postal-code">Postal Code</Label>
                          <Input
                            type="text"
                            id="postal-code"
                            placeholder="Postal Code"
                            defaultValue={`${user.zip}`}
                          />
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        type="text"
                        id="country"
                        placeholder="Country name"
                        defaultValue="Uinited States of America"
                      />
                    </FormGroup>
                  </Collapse>
                </div>
              </div>
              <div id="paymentAccordion" data-children=".item">
                <div className="item">
                  <Button
                    className="mb-3 p-0"
                    color="link"
                    onClick={() => this.toggleCustomPayment(0)}
                    aria-expanded={this.state.customPayment[0]}
                    aria-controls="paymentAccordion1"
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
                            placeholder="Enter your name"
                            required
                            defaultValue={`${user.firstname} ${user.lastname}`}
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
                            defaultValue={`${user.creditcard}`}
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
            </CardBody>
            <CardFooter>
              <Row className="justify-content-center mb-3">
                <Button color="outline-success" size="lg">
                  Confirm Purchase
                </Button>
              </Row>
            </CardFooter>
          </Card>
        ) : (
          <div> no order found </div>
        )}
        <hr className="my-4" />
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders }) => {
  return {
    user: user,
    order: orders.find(order => order.status === "pending")
  };
};

export default connect(mapStateToProps)(Checkout);
