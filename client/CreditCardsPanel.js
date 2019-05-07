import React from 'react';
import { Accordion, Button, Card, Col, Table, Row } from 'react-bootstrap';

const CreditCardsPanel = props => {
  //temp hard seed creditCards
  const creditCards = [
    {
      name: 'userName onCard',
      number: '0000 0000 0000 0000',
      expires: '01-2020'
    }
  ];

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
                    <th>Name On Card</th>
                    <th>Card Number</th>
                    <th>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {creditCards.map(card => (
                    <tr key={card.number}>
                      <td>{card.name}</td>
                      <td>{card.number}</td>
                      <td>{card.expires}</td>
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

export default CreditCardsPanel;
