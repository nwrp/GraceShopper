import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import OrdersPanel from './OrdersPanel';
import ReviewsPanel from './ReviewsPanel';
import CreditCardsPanel from './CreditCardsPanel';

class UserAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, orders, reviews } = this.props;

    if (user.id) {
      return (
        <Accordion>
          <Card className="my-3">
            <Card.Header
              style={{ backgroundColor: '#f46854' }}
              className="text-white"
            >
              User Account
            </Card.Header>
            <Card.Body>
              <div className="ml-3">
                <Row>
                  <Col>
                    {user.firstname} {user.lastname}
                  </Col>
                </Row>
                <Row>
                  <Col>{user.email}</Col>
                </Row>
                <Row>
                  <Col>
                    <small className="text-center">
                      registered user since {user.createdAt.slice(0, 10)}
                    </small>
                  </Col>
                </Row>
              </div>
              <hr />

              <OrdersPanel orders={orders} />
              <CreditCardsPanel user={user} />
              <ReviewsPanel reviews={reviews} user={user} />
            </Card.Body>
            <Card.Footer style={{ backgroundColor: '#f46854' }} />
          </Card>
          <br />
          <br />
          <br />
          <br />
        </Accordion>
      );
    } else {
      return '';
    }
  }
}

const mapStateToProps = ({ products, user, orders, reviews }) => {
  return {
    products,
    user,
    orders,
    reviews
  };
};

export default connect(mapStateToProps)(UserAccount);
