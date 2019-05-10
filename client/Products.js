import React, { Component, Fragment } from 'react';
import { Card, Container, Col, Row, Pagination } from 'react-bootstrap';
import { updateNavSearchValsBasedOnURL } from './store';
import axios from 'axios';
import { connect } from 'react-redux';
import Ratings from './Ratings';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      products: [],
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
            count: productsAndCount.count,
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
            count: productsAndCount.count,
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
            count: productsAndCount.count,
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
        <div>
          {`${count} Results. Page ${current + 1}  of ${pages + 1}`}
          <br />
          <br />
          <Pagination>
            <Pagination.Item
              disabled={first ? 'disabled' : ''}
              onClick={() => pageChange(current - current)}
            >
              First
            </Pagination.Item>
            <Pagination.Prev
              disabled={first ? 'disabled' : ''}
              onClick={() => pageChange(current - 1)}
            />
            {pageFlip.map(page => (
              <Pagination.Item
                key={page}
                onClick={() => pageChange(page)}
                disabled={current === page ? 'disabled' : ''}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={last ? 'disabled' : ''}
              onClick={() => pageChange(current + 1)}
            />
            <Pagination.Item
              disabled={last ? 'disabled' : ''}
              onClick={() => pageChange(pages)}
            >
              Last
            </Pagination.Item>
          </Pagination>
        </div>
        <Container className="d-flex mt-3">
          {/* Make sure to be defensive when loading products based on the category */}
          {products.length ? (
            <Row>
              {products.map(product => {
                return (
                  <Col key={product.id}>
                    <Card
                      key={product.id}
                      style={{
                        width: '15rem',
                        height: '27rem',
                        borderColor: `${
                          // adding defensive loading for category info
                          product && categories.length
                            ? findCategory(product, categories).color
                            : 'white'
                        }`,
                      }}
                      className="mb-3 mt-3 shadow rounded"
                    >
                      <Card.Header
                        className="text-center"
                        style={{
                          backgroundColor: `${
                            product && categories.length
                              ? findCategory(product, categories).color
                              : 'white'
                          }`,
                        }}
                      >
                        {product && categories.length
                          ? findCategory(product, categories).name
                          : 'white'}
                      </Card.Header>
                      <Card.Body className="text-center">
                        <Card.Link
                          style={{ textDecoration: 'none' }}
                          href={`/#/products/detail/${product.id}`}
                        >
                          <Card.Img src={product.imageUrl} />
                          <Card.Title>{product.title}</Card.Title>
                          <Ratings rating={averageRating(product)} />
                        </Card.Link>
                      </Card.Body>
                      <Card.Footer
                        className="text-center"
                        style={{
                          backgroundColor: `${
                            product && categories.length
                              ? findCategory(product, categories).color
                              : 'white'
                          }`,
                        }}
                      >
                        ${product.price}
                        <span> / {product.quantity} inStock</span>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            'No Products Match That Search'
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ categories, reviews }) => {
  return {
    categories,
    reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNavSearchValues: (categoryId, searchTerm) =>
      dispatch(updateNavSearchValsBasedOnURL(categoryId, searchTerm)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
