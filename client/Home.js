import React from 'react';
import { Card, Container, Col, Figure, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Gallery from './Carousel';

const Home = ({ categories }) => {
  const dvdUrls = [
    'http://i65.tinypic.com/2sblgz5.jpg',
    'http://i65.tinypic.com/j6515e.jpg',
    'http://i65.tinypic.com/anbp8h.jpg'
  ];

  return (
    <Container className="d-flex flex-column">
      {/* <Row>
        <Col />
        <Col>
          <Gallery />
        </Col>
        <Col />
      </Row> */}
      <Row>
        {categories.map(category => {
          return (
            <Col lg={true} xl={true} key={category.id}>
              <Card
                style={{
                  width: '15rem',
                  height: '15rem',
                  backgroundColor: `${category.color}`
                }}
                className="my-3 justify-content-center "
              >
                <Card.Link href={`/#/products/filter/category/${category.id}`}>
                  <Card.Text
                    className="white-text-with-blue-shadow text-center"
                    style={{
                      fontSize: '22px',
                      color: 'white'
                    }}
                  >
                    {category.name}
                  </Card.Text>
                </Card.Link>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row className="align-items-center">
        {dvdUrls.map(image => {
          return (
            <Col key={image} lg={4}>
              <Figure>
                <Figure.Image
                  width={300}
                  height={300}
                  alt="171x180"
                  src={image}
                />
                <Figure.Caption className="text-center">
                  Instructional Workout DVD
                </Figure.Caption>
              </Figure>
            </Col>
          );
        })}
      </Row>
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Home);
