import React from 'react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Table,
  Row
} from 'react-bootstrap';

const OrdersPanel = props => {
  const orders = props.orders;

  const getBadge = status => {
    const colorKey = {
      cancelled: 'danger',
      pending: 'warning',
      purchased: 'success',
      shipped: 'info'
    };
    return colorKey[status];
  };

  const calculateOrderTotal = order => {
    return order.lineitems.reduce((acc, item) => {
      acc += item.quantity * item.netTotalCost;
      return acc;
    }, 0);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <h6>Orders</h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>OrderId</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length
                    ? orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.createdAt.slice(0, 10)}</td>
                          <td>
                            {order.lineitems.map(item => (
                              <Row key={item.id}>
                                <Col>
                                  <Card.Link
                                    style={{ textDecoration: 'none' }}
                                    href={`/#/products/detail/${
                                      item.productId
                                    }`}
                                  >
                                    {item.product.title}
                                  </Card.Link>
                                </Col>
                              </Row>
                            ))}
                          </td>
                          <td>{calculateOrderTotal(order)}</td>
                          <td>
                            <Badge variant={getBadge(order.status)} size="lg">
                              {order.status.toUpperCase()}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Col>
    </Row>
  );
};

export default OrdersPanel;
