import React, { Component, Fragment } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      zip: '',
      state: ''
    };
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    axios
      .post('/api/users', this.state)
      .then(() => this.props.history.push('/login'));
  };
  render() {
    return (
      <Fragment>
        <Card>
          <Card.Header
            style={{ backgroundColor: '#9161e8' }}
            className="text-white"
          >
            Create a Grace Shopper account
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="username">User Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="firstname">First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="lastname">Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="street">Street Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={this.state.street}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="zip">Zip Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={this.state.zip}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="city">City:</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="state">State:</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button type="submit" style={{ backgroundColor: '#9161e8' }}>
                Create Account
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Fragment>
    );
  }
}

export default SignUp;
