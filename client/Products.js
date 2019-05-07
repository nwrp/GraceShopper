import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const Products = ({ products, categories, match }) => {
  let displayProducts = [];

  //just a category search
  if (match.params.categoryId && !match.params.searchTerm) {
    displayProducts = products.filter(prod =>
      (match.params.categoryId === "all"
        ? true
        : prod.categoryId === match.params.categoryId * 1));
  }
  //category & title search
  else if (match.params.searchTerm) {
    displayProducts = products.filter(prod =>
      (match.params.categoryId === "all"
        ? prod.title
            .toLowerCase()
            .includes(match.params.searchTerm.toLowerCase())
        : prod.title
            .toLowerCase()
            .includes(match.params.searchTerm.toLowerCase()) &&
          prod.categoryId === match.params.categoryId * 1));
  } else {
    displayProducts = products;
  }
  const findCategory = (product, cats) => {
    return cats.find(cat => cat.id === product.categoryId);
  };

  return (
    <Container className="d-flex mt-3">
      {/* Make sure to be defensive when loading products based on the category */}
      {displayProducts.length ? (
        <Row>
          {displayProducts.map(product => {
            return (
              <Col key={product.id}>
                <Card
                  key={product.id}
                  style={{
                    width: '15rem',
                    height: '27rem',
                    borderColor: `${findCategory(product, categories).color}`
                  }}
                  className="mb-3 mt-3 shadow rounded"
                >
                  <Card.Header
                    className="text-center"
                    style={{
                      backgroundColor: `${
                        findCategory(product, categories).color
                      }`
                    }}
                  >
                    {findCategory(product, categories).name}
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Card.Link
                      style={{ textDecoration: 'none' }}
                      href={`/#/products/${product.id}`}
                    >
                      <Card.Img src={product.imageUrl} />
                      <Card.Title>{product.title}</Card.Title>
                    </Card.Link>
                  </Card.Body>
                  <Card.Footer
                    className="text-center"
                    style={{
                      backgroundColor: `${
                        findCategory(product, categories).color
                      }`
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
        'No Products Found'
      )}
    </Container>
  );
};

const mapStateToProps = ({ categories, products }) => {
  return {
    categories,
    products
  };
};

export default connect(mapStateToProps)(Products);
