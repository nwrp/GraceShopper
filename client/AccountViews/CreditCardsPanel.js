import React from 'react';
import { Accordion, Button, Card, Col, Table, Row } from 'react-bootstrap';

const CreditCardsPanel = props => {
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <h6> My Credit Cards </h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>NameOnCard</th>
                    <th>Card Number</th>
                    <th>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {props.user.firstname} {props.user.lastname}
                    </td>
                    <td>{props.user.creditcard}</td>
                    <td>01-2020</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Col>
    </Row>
  );
};

export default CreditCardsPanel;
