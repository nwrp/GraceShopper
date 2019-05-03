import React, { Component, Fragment } from 'react';
import { Accordion, Card, Container, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import UsersPanel from './UsersPanel';
import InventoryPanel from './InventoryPanel';
import OrdersPanel from './OrdersPanel';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [],
      orders: []
    };
  }

  componentDidMount() {
    this.setState(this.seedState());
  }

  //temporarily hard seeding
  seedState = () => {
    return {
      accordion: [true, true, true],

      orders: [
        {
          id: 1,
          userId: 1,
          status: 'pending'
        },
        {
          id: 2,
          userId: 1,
          status: 'purchased'
        },
        {
          id: 3,
          userId: 2,
          status: 'cancelled'
        },
        {
          id: 4,
          userId: 2,
          status: 'shipped'
        }
      ]
    };
  };

  toggleAccordion = tab => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  };

  render() {
    const { orders } = this.state;
    const { products, users } = this.props;

    return (
      <Fragment>
        <Container className="d-flex">
          <Col>
            <Accordion>
              <Card>
                <OrdersPanel orders={orders} />
                <UsersPanel users={users} />
                <InventoryPanel products={products} />
              </Card>
            </Accordion>
          </Col>
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ products, users }) => {
  return {
    products,
    users
  };
};

export default connect(mapStateToProps)(Admin);
