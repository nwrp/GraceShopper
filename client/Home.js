import React from 'react';
import { Card, Container, Col, Figure, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const Home = ({ categories }) => {
  const dvdUrls = [
    'http://i65.tinypic.com/2sblgz5.jpg',
    'http://i65.tinypic.com/j6515e.jpg',
    'http://i65.tinypic.com/anbp8h.jpg'
  ];

  return (
    <Container className="d-flex-row">
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
                <Card.Link href={`/#/products/category/${category.id}`}>
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
      <Row>
        {dvdUrls.map(image => {
          return (
            <Col key={image}>
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
    </Container>
  );
};

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Home);
