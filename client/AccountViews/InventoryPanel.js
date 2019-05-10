import React from 'react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Pagination,
  Table,
  Row
} from 'react-bootstrap';

const InventoryPanel = props => {
  const products = props.products;

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <h6> Product Inventory</h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length
                    ? products.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{product.categoryId}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <Badge variant="success">InStock</Badge>
                          </td>
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

export default InventoryPanel;
