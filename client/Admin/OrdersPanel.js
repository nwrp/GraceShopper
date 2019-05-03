import React from 'react';
import {
  Accordion,
  Button,
  Card,
  Col,
  Pagination,
  Table,
  Row
} from 'react-bootstrap';

const OrdersPanel = props => {
  const orders = props.orders;

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
                    <th>UserId</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length
                    ? orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.userId}</td>
                          <td>{order.status}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>

              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Col>
    </Row>
  );
};

export default OrdersPanel;
