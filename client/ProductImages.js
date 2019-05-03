import React, { Fragment } from 'react';
import { Button, ButtonGroup, Container, Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const ProductImages = ({ productImages, prodIdx, handleClick }) => {
  const foundImages = productImages.filter(img => img.productId === prodIdx);

  return (
    <Fragment>
      {foundImages.length ? (
        <Container>
          <Row className="d-flex justify-content-center">
            {foundImages.map(img => (
              <ButtonGroup key={img.id}>
                <Button
                  className="mr-2 mb-2"
                  variant="outline-info"
                  type="button"
                  onClick={handleClick}
                  href={img.imageUrl}
                >
                  <Image
                    style={{ height: '80px' }}
                    src={img.imageUrl}
                    rounded
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

const mapStateToProps = ({ productImages }) => {
  return {
    productImages
  };
};

export default connect(mapStateToProps)(ProductImages);
