import React from "react";
import { Accordion, Button, Card, Col, Table, Row } from "react-bootstrap";

const ReviewsPanel = props => {
  // const { reviews } = props.products;

  //temp hard seed reviews
  const reviews = [
    {
      id: 1,
      product: {
        title: "Shock Doctor Mouthguard",
        categoryId: 2,
        price: 9.99,
        quantity: 31,
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/41FyBzAF74L.jpg",
        detailImages: [
          "https://images-na.ssl-images-amazon.com/images/I/41FyBzAF74L.jpg",
          "https://images-na.ssl-images-amazon.com/images/I/41ianPQq3PL.jpg",
          "https://images-na.ssl-images-amazon.com/images/I/81b%2Bo6fCPdL._SX679_.jpg",
          "https://images-na.ssl-images-amazon.com/images/I/61%2BrNG5jeYL._SX679_.jpg"
        ],
        description:
          "CUSTOM COMFORT & FIT - Gel-fit Liner Technology is easy to fit, silicone mold forms specifically to your teeth and gums, providing a comfortable fit for extended use, available in a variety of customized colors. BREATHABLE - Integrated breathing channels make it easy to breathe while wearing the guard and maximize your performance. PROFESSIONAL DENTAL PROTECTION - Heavy duty Exoskeletal Shock Frame provides full mouth protection during the hardest impacts, protects cheek and tongue, teeth grinding, and secures teeth in place. DURABLE - Crafted using heavy duty silicone, combined in our Triple Layer Design for added protection and durability. RECOMMENDED SPORTS - Suitable for all contact sports where a mouth guard is required or recommended including football, wrestling, boxing, and more! Includes a detachable helmet strap for football."
      },
      rating: 2,
      review: "Yuk! taste like plastic!"
    }
  ];

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
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Rating</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review.id}>
                      <td>{review.product.title}</td>
                      <td>{review.rating}</td>
                      <td>{review.comments}</td>
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
