/* eslint-disable complexity */
import React, { Component, Fragment } from 'react';
import {
  Card,
  Container,
  Col,
  Row,
  Pagination,
  PageItem
} from 'react-bootstrap';
import { updateNavSearchValsBasedOnURL } from './store';
import axios from 'axios';
import { connect } from 'react-redux';
import Ratings from './Ratings';
import AddToCartButton from './AddToCart';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      products: []
    };
  }
  componentDidMount() {
    this.load();
  }
  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params !== match.params) {
      this.load();
    }
  }
  load = () => {
    const { match, setNavSearchValues } = this.props;
    //just a category search
    if (
      Object.keys(match.params).includes('categoryId') &&
      !Object.keys(match.params).includes('searchTerm')
    ) {
      axios
        .get(
          `/api/products/productsWithCount/filter/category/${
            match.params.categoryId
              ? `${match.params.categoryId}/${
                  match.params.index ? match.params.index : ''
                }`
              : ''
          }`
        )
        .then(response => response.data)
        .then(productsAndCount => {
          this.setState({
            products: productsAndCount.products,
            count: productsAndCount.count
          });
        });
      setNavSearchValues(match.params.categoryId, '');
    }
    //category & title search
    else if (Object.keys(match.params).includes('searchTerm')) {
      axios
        .get(
          `/api/products/productsWithCount/search/category/${
            match.params.categoryId
          }/term/${
            match.params.searchTerm
              ? `${match.params.searchTerm}/${
                  match.params.index ? match.params.index : ''
                }`
              : ''
          }`
        )
        .then(response => response.data)
        .then(productsAndCount => {
          this.setState({
            products: productsAndCount.products,
            count: productsAndCount.count
          });
        });
      setNavSearchValues(match.params.categoryId, match.params.searchTerm);
    } else {
      axios
        .get(
          `/api/products/productsWithCount/${
            match.params.index ? match.params.index : ''
          }`
        )
        .then(response => response.data)
        .then(productsAndCount => {
          this.setState({
            products: productsAndCount.products,
            count: productsAndCount.count
          });
        });
    }
  };
  findCategory = (product, cats) => {
    return cats.find(cat => cat.id === product.categoryId);
  };
  averageRating = product => {
    let ratingsSum = 0;
    const prodReviews = this.props.reviews.filter(
      rev => rev.productId === product.id
    );
    prodReviews.forEach(review => {
      ratingsSum += review.rating;
    });
    return Math.ceil(ratingsSum / prodReviews.length);
  };
  pageChange = index => {
    //Have to page the next results based on the current URL and count
    const { history, match } = this.props;
    if (match.path === '/products/:index?') {
      history.push(`/products/${index}`);
    } else if (
      match.path === '/products/filter/category/:categoryId?/:index?'
    ) {
      history.push(
        `/products/filter/category/${
          match.params.categoryId ? match.params.categoryId : 0
        }/${index}`
      );
    } else if (
      match.path ===
      '/products/search/category/:categoryId/term/:searchTerm?/:index?'
    ) {
      //Edge case if the user did a search with empty searchTerm but category is always selected
      if (match.params.searchTerm) {
        history.push(
          `/products/search/category/${
            match.params.categoryId ? match.params.categoryId : 0
          }/term/${match.params.searchTerm}/${index}`
        );
      } else {
        history.push(
          `/products/filter/category/${
            match.params.categoryId ? match.params.categoryId : 0
          }/${index}`
        );
      }
    }
  };
  render() {
    const { findCategory, pageChange, averageRating } = this;
    const { categories, match } = this.props;
    const { products, count } = this.state;
    const current = match.params.index ? match.params.index * 1 : 0;
    const pages = Math.floor(count / 10);
    const first = !(match.params.index * 1);
    const last = current === pages;
    const pageFlip = [];
    for (let i = 0; i <= pages; ++i) {
      pageFlip.push(i);
    }

    return (
      <Fragment>
        <Container className="d-flex flex-column">
          {/* Make sure to be defensive when loading products based on the category */}

          <Col>
            <Row className="justify-content-center h-10">
              <Pagination>
                <PageItem
                  disabled={first ? 'disabled' : ''}
                  onClick={() => pageChange(current - 1)}
                  style={{ text: 'red' }}
                >
                  <i className="fas fa-angle-left" />
                </PageItem>
                {pageFlip.map(page => (
                  <PageItem
                    key={page}
                    onClick={() => pageChange(page)}
                    disabled={current === page ? 'disabled' : ''}
                  >
                    {page + 1}
                  </PageItem>
                ))}
                <PageItem
                  disabled={last ? 'disabled' : ''}
                  onClick={() => pageChange(current + 1)}
                >
                  <i className="fas fa-angle-right" />
                </PageItem>
              </Pagination>
            </Row>
          </Col>

          {products.length ? (
            <Row>
              {products.map(product => {
                return (
                  <Col key={product.id}>
                    <Card
                      key={product.id}
                      style={{
                        width: '15rem',
                        height: '27.5rem',
                        borderWidth: '2px',
                        boxShadow: '4px 5px 14px 4px rgba(0, 0, 0, 0.2)',
                        borderColor: `${
                          product && categories.length
                            ? findCategory(product, categories).color
                            : 'white'
                        }`
                      }}
                      className="mb-5 rounded"
                    >
                      <Card.Header
                        as="h6"
                        className="text-center text-white"
                        style={{
                          backgroundColor: `${
                            product && categories.length
                              ? findCategory(product, categories).color
                              : 'white'
                          }`
                        }}
                      >
                        {product && categories.length
                          ? findCategory(product, categories).name
                          : 'white'}
                      </Card.Header>
                      <Card.Body
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: 0
                        }}
                      >
                        <Container
                          style={{
                            padding: 0
                          }}
                        >
                          <Card.Link
                            style={{ textDecoration: 'none' }}
                            href={`/#/products/detail/${product.id}`}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '220px',
                                padding: 0
                              }}
                            >
                              <Row className="align-items-center h-100">
                                <Col className="col-12 mx-auto">
                                  <Card.Img
                                    src={product.imageUrl}
                                    style={{
                                      width: '100%',
                                      height: 'auto',
                                      alignItems: 'center',
                                      padding: 5
                                    }}
                                  />
                                </Col>
                              </Row>
                            </div>
                            <div
                              style={{
                                height: '100px'
                              }}
                            >
                              <Row className="align-items-center h-50">
                                <Col className="col-12 mx-auto">
                                  <Card.Text className="text-center">
                                    {product.title}
                                  </Card.Text>
                                  <Card.Text className="text-center">
                                    <Ratings rating={averageRating(product)} />
                                  </Card.Text>
                                  <Card.Text className="text-center">
                                    ${product.price}
                                    <span> / {product.quantity} inStock</span>
                                  </Card.Text>
                                </Col>
                              </Row>
                            </div>
                          </Card.Link>
                        </Container>
                      </Card.Body>
                      <Card.Footer
                        style={{
                          padding: 2,
                          backgroundColor: `${
                            product && categories.length
                              ? findCategory(product, categories).color
                              : 'white'
                          }`
                        }}
                        className="text-center"
                      >
                        <AddToCartButton
                          product={product}
                          history={this.props.history}
                        />
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            'No Products Match That Search'
          )}
          <Row className="justify-content-center my-2">
            <i className="text-muted">
              {`${count} Results. Page ${current + 1}  of ${pages + 1}`}
            </i>
          </Row>

          <br />
          <br />
          <br />
          <br />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ categories, reviews }) => {
  return {
    categories,
    reviews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNavSearchValues: (categoryId, searchTerm) =>
      dispatch(updateNavSearchValsBasedOnURL(categoryId, searchTerm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
