import React from 'react';
import {
  Accordion,
  Button,
  Card,
  Col,
  Image,
  Table,
  Row
} from 'react-bootstrap';
import Ratings from '../Ratings';

const ReviewsPanel = ({ reviews, user }) => {
  const userReviews = reviews.filter(rev => rev.userId === user.id);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <h6> My Reviews </h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Table hover bordered striped responsive size="sm">
                <tbody>
                  {userReviews.map(review => (
                    <tr key={review.id}>
                      <td>
                        <Image src={review.product.imageUrl} thumbnail />
                      </td>
                      <td>{review.product.title}</td>
                      <td>
                        <Ratings rating={review.rating} />
                      </td>
                      <td>{review.review}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Col>
    </Row>
  );
};

export default ReviewsPanel;
