import React, { Component, Fragment } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store";

class Navigation extends Component {
  render() {
    console.log("are we logged in", this.props.isLoggedIn);
    return (
      <Fragment>
        <Navbar bg="light">
          <Navbar.Brand>Grace Shopper</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to="/admin" className="mr-auto">
              admin
            </Nav.Link>
            {this.props.isLoggedIn ? (
              <button
                className="mr-auto"
                type="button"
                onClick={this.props.logout}
              >
                logout
              </button>
            ) : (
              <Nav.Link as={Link} to="/login" className="mr-auto">
                login
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/cart">
              cart
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              size="sm"
              placeholder="search"
              className="mx-sm-2"
            />
            <Button variant="outline-secondary" size="sm">
              search
            </Button>
          </Form>
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    isLoggedIn: !!user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
