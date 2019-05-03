import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProductImages from './ProductImages';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: ''
    };
    console.log('props in ProductDetail', props);
  }

  componentDidMount() {
    this.setState({ displayImage: this.displayProduct().imageUrl });
  }

  displayProduct = () => {
    return this.props.products.find(
      prod => prod.id === this.props.match.params.id * 1
    );
  };

  findCategory = (prod, cats) => {
    return cats.find(cat => cat.id === prod.categoryId);
  };

  handleClick = event => {
    event.preventDefault();
    console.log(event.target.src);
    this.setState({ displayImage: event.target.src });
  };

  render() {
    const { categories } = this.props;

    const displayProduct = this.displayProduct();

    return (
      <Container className="d-flex mt-5">
        {/* Make sure to be defensive when loading a single product */}
        {this.displayProduct() ? (
          <Row>
            <Col className="mr-3">
              <Card>
                <Card.Header
                  className="text-center"
                  style={{
                    backgroundColor: `${
                      this.findCategory(displayProduct, categories).color
                    }`
                  }}
                >
                  {this.findCategory(displayProduct, categories).name}
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Img src={this.state.displayImage} />
                </Card.Body>
                <Card.Footer
                  className="text-center"
                  style={{
                    backgroundColor: `${
                      this.findCategory(displayProduct, categories).color
                    }`
                  }}
                >
                  <Card.Subtitle>
                    ${displayProduct.price}
                    <span> / {displayProduct.quantity} inStock</span>
                  </Card.Subtitle>
                </Card.Footer>
              </Card>
            </Col>
            <Col className="d-flex flex-column align-items-start">
              <Row className="d-flex mt-auto mb-auto">
                <h4>{displayProduct.title}</h4>

                <p className="text-justify">{displayProduct.description}</p>
              </Row>
              <ProductImages
                prodIdx={displayProduct.id}
                handleClick={this.handleClick}
              />
            </Col>
          </Row>
        ) : (
          'No Product Found'
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ categories, products }) => {
  return {
    products,
    categories
  };
};

export default connect(mapStateToProps)(ProductDetail);
