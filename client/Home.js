import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

const Home = ({ categories }) => {
  return (
    <Container className="d-flex">
      <Row>
        {categories.map(category => {
          return (
            <Col lg={true} xl={true} key={category.id}>
              <Card
                style={{
                  width: "15rem",
                  height: "15rem",
                  backgroundColor: `${category.color}`
                }}
                className="my-3 justify-content-center "
              >
                <Card.Link href={`/#/products/category/${category.id}`}>
                  <Card.Text
                    className="white-text-with-blue-shadow text-center"
                    style={{
                      fontSize: "22px",
                      color: "white"
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
    </Container>
  );
};

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Home);
