import React, { Component, Fragment } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProductImages from './ProductImages';
import Ratings from './Ratings';
import Reviews from './Reviews';
import {
  createPendingOrder,
  addToCart,
  createSessionCart,
  setSessionCart,
  updateQuantity
} from './store';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: ''
    };
  }

  componentDidMount() {
    if (
      this.props.match.params.id !== localStorage.getItem('matchParams') &&
      this.props.products.length
    ) {
      this.setState({
        displayImage: this.displayProduct().imageUrl
      });
    } else {
      this.hydrateStateWithLocalStorage();
    }
  }

  hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty('displayImage')) {
      let value = localStorage.getItem('displayImage');
      try {
        value = JSON.parse(value);
        this.setState({ displayImage: value });
      } catch (e) {
        this.setState({ displayImage: value });
      }
    }
  };

  handleClick = event => {
    event.preventDefault();
    this.setState({ displayImage: event.target.src });
    localStorage.setItem('displayImage', JSON.stringify(event.target.src));
    localStorage.setItem('matchParams', this.props.match.params.id);
  };

  displayProduct = () => {
    if (this.props.products.length) {
      const displayProd = this.props.products.find(
        prod => prod.id === this.props.match.params.id * 1
      );
      return displayProd;
    }
  };

  findCategory = (prod, cats) => {
    return cats.find(cat => cat.id === prod.categoryId);
  };

  addToCartOrder = order => {
    const existingli = this.props.order.lineitems.find(li => li.productId === this.props.match.params.id * 1);
    if (existingli) {
      const newQuant = existingli.quantity + 1;
      this.props.updateQuantity(existingli.id, newQuant)
        .then( () => this.props.history.push('/cart'));
    } else {
    this.props
      .addToCart({
        orderId: order.id,
        productId: this.props.match.params.id * 1,
        quantity: 1,
        orderPrice: this.displayProduct().price,
        netTotalCost: this.displayProduct().price
      })
      .then(() => this.props.history.push('/cart'));
    }
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

  findReviewsByProduct = product => {
    return this.props.reviews.filter(rev => rev.productId === product.id);
  };

  render() {
    if (!this.props.products.length || !this.props.categories.length) {
      return <div> loading </div>;
    } else {
      const { categories, reviews } = this.props;

      const product = this.props.products.find(
        prd => prd.id === this.props.match.params.id * 1
      );

      const averageRating = () => {
        let ratingsSum = 0;
        const prodReviews = reviews.filter(rev => rev.productId === product.id);
        prodReviews.forEach(review => {
          ratingsSum += review.rating;
        });
        return Math.ceil(ratingsSum / prodReviews.length);
      };
      const productReviews = this.findReviewsByProduct(product);

      return (
        <Fragment>
          <Container className="d-flex-row mt-5">
            {/* Make sure to be defensive when loading a single product */}
            {product ? (
              <div>
                <Row>
                  <Col className="mr-3">
                    <Card>
                      <Card.Header
                        className="text-center"
                        style={{
                          backgroundColor: `${
                            this.findCategory(product, categories).color
                          }`
                        }}
                      >
                        {this.findCategory(product, categories).name}
                      </Card.Header>
                      <Card.Body className="text-center">
                        <Card.Img src={this.state.displayImage} />
                      </Card.Body>
                      <Card.Footer
                        className="text-center"
                        style={{
                          backgroundColor: `${
                            this.findCategory(product, categories).color
                          }`
                        }}
                      >
                        <Card.Subtitle>
                          ${product.price}
                          <span> / {product.quantity} inStock</span>
                        </Card.Subtitle>
                      </Card.Footer>
                    </Card>
                    <Row className="justify-content-center mt-3">
                      <div className="m-3">
                        <Ratings rating={averageRating()} starSize="fa-3x" />
                      </div>
                      <Button
                        className=" m-3"
                        variant="outline-success"
                        type="button"
                        onClick={() => this.addToCart(product, 1)}
                        size="lg"
                      >
                        <i className="fas fa-cart-arrow-down" />
                      </Button>
                    </Row>
                  </Col>
                  <Col className="d-flex flex-column justify-content-center">
                    <Row className="justify-content-center">
                      <h4 className="mb-4">{product.title}</h4>
                    </Row>
                    <Row className="justify-content-center mb-4">
                      <p className="text-justify">{product.description}</p>
                    </Row>
                    <Row className="mt-6">
                      <ProductImages
                        categoryColor={
                          this.findCategory(product, categories).color
                        }
                        prodId={product.id}
                        handleClick={this.handleClick}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row className="my-5">
                  <Col>
                    <Card>
                      <Card.Header
                        className="text-center"
                        style={{ padding: 0 }}
                      >
                        Verified Puchase Reviews
                      </Card.Header>
                      <Reviews reviews={productReviews} />
                    </Card>
                  </Col>
                </Row>
              </div>
            ) : (
              'No Product Found'
            )}
          </Container>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = ({
  categories,
  products,
  user,
  sessionCart,
  orders,
  reviews
}) => {
  return {
    user,
    products,
    reviews,
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
    requestUpdateCart: sessionCart => dispatch(setSessionCart(sessionCart)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity(id, quantity))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
