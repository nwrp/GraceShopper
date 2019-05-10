import React, { Fragment } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Ratings from './Ratings';

const Reviews = ({ reviews }) => {
  console.log('reviews in Reviews', reviews);
  if (reviews) {
    return (
      <Fragment>
        <Row>
          <Col>
            {reviews.map(review => (
              <Container key={review.id}>
                <Card.Body>
                  <Row className="justify-content-center mb-3">
                    <Ratings rating={review.rating} />
                  </Row>
                  <Row className="mx-2">
                    <Card.Text>{review.review}</Card.Text>
                  </Row>
                  <div className="text-right">
                    <footer className="blockquote-footer">
                      <b className="mr-2">{review.user.username}</b>
                      <i className="mr-2"> reviewed on </i>{' '}
                      {review.createdAt.slice(0, 10)}
                    </footer>
                  </div>
                </Card.Body>
              </Container>
            ))}
          </Col>
        </Row>
      </Fragment>
    );
  } else {
    return <div> No reviews for this product yet </div>;
  }
};

export default Reviews;
