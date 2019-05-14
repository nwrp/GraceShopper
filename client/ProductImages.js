import React, { Fragment } from 'react';
import { Button, ButtonGroup, Container, Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const ProductImages = ({
  products,
  productImages,
  prodId,
  handleClick,
  categoryColor
}) => {
  const product = products[prodId];

  const foundImages = productImages.filter(img => img.productId === prodId);

  return (
    <Fragment>
      {product ? (
        <Container>
          <Row className="d-flex justify-content-center">
            {foundImages.map(img => (
              <ButtonGroup key={img.id}>
                <Button
                  className="mr-2 mb-2"
                  type="button"
                  style={{
                    backgroundColor: `${categoryColor}`
                    // borderRadius: '6px'
                  }}
                  size="sm"
                  variant="outline"
                  onClick={handleClick}
                  href={img.imageUrl}
                  active
                >
                  <Image
                    style={{ height: '80px' }}
                    src={img.imageUrl}
                    className="align-items-center"
                  />
                </Button>
              </ButtonGroup>
            ))}
          </Row>
        </Container>
      ) : (
        'No additional product images available'
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ productImages, products }) => {
  return {
    productImages,
    products
  };
};

export default connect(mapStateToProps)(ProductImages);
