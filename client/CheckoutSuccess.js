import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class CheckoutSuccess extends Component {
  render() {
    return (
      <Card className="mt-5">
        <CardHeader
          as="h4"
          className="text-center text-white"
          style={{ backgroundColor: '#9161e8', fontSize: '24px' }}
        >
          Purchase Complete
        </CardHeader>
        <CardBody>
          <div className="row justify-content-center mt-1">
            <h5>Thanks for being a GraceShopper!</h5>
          </div>
          <div className="row justify-content-center mt-3">
            <Button
              color="info"
              onClick={() => this.props.history.push('/user')}
            >
              <i className="fas fa-arrow-left" /> Orders
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default CheckoutSuccess;
