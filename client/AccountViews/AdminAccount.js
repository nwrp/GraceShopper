import React, { Component } from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import UsersPanel from './UsersPanel';
import InventoryPanel from './InventoryPanel';
import OrdersPanel from './OrdersPanel';
import { throws } from 'assert';
import io from 'socket.io-client';
const socket = io(window.location.origin);

socket.on('connect', function() {
  console.log('I have made a persistent two-way connection to the server!');
  console.log(socket);
});

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [],
    };
  }

  componentDidMount() {
    this.setState({ accordion: [true, true, true] });
  }

  toggleAccordion = tab => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  };

  sendFlashSale = prod => {
    socket.emit('flashSaleProd', prod);
  };
  render() {
    const { products, users, user, orders } = this.props;
    const { sendFlashSale } = this;
    if (user.id) {
      return (
        <Accordion>
          <Card className="my-3">
            <Card.Header
              style={{ backgroundColor: '#ee2a82' }}
              className="text-white"
            >
              Administrator Account
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
                      administrator since {user.createdAt.slice(0, 10)}
                    </small>
                  </Col>
                </Row>
              </div>
              <hr />
              <OrdersPanel orders={orders} />
              <UsersPanel users={users} />
              <InventoryPanel
                products={products}
                sendFlashSale={sendFlashSale}
              />
            </Card.Body>
            <Card.Footer style={{ backgroundColor: '#ee2a82' }} />
          </Card>
          <br />
          <br />
          <br />
          <br />
        </Accordion>
      );
    } else {
      return <div>Oop! You may not have permission to view this page.</div>;
    }
  }
}
const mapStateToProps = ({ products, users, user, orders }) => {
  return {
    products,
    users,
    orders,
    user,
  };
};

export default connect(mapStateToProps)(Admin);
