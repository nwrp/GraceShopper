import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import OrdersPanel from './Admin/OrdersPanel';
import ReviewsPanel from './reviewsPanel';
import CreditCardsPanel from './CreditCardsPanel';

class UserAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, orders } = this.props;

    // console.log('props in UserAccount', this.props);

    if (user) {
      return (
        <Accordion>
          <Card>
            <Card.Header
              style={{ backgroundColor: '#f46854' }}
              className="text-white"
            >
              User Account
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>{user.name}</Col>
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
              <hr />

              <OrdersPanel orders={orders} />
              <ReviewsPanel />
              <CreditCardsPanel />
            </Card.Body>
          </Card>
        </Accordion>
      );
    } else {
      return '';
    }
  }
}

const mapStateToProps = ({ products, user, orders }) => {
  return {
    products,
    user,
    orders
  };
};

export default connect(mapStateToProps)(UserAccount);
