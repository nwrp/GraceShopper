import React, { Component, Fragment } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, updateNavSearchValsBasedOnURL } from './store';

class Navigation extends Component {
  constructor(props) {
    super(props);
    if (!props.navSearchTerms.categoryId || !props.navSearchTerms.searchTerm) {
      this.state = {
        searchTerm: '',
        categoryId: '0',
      };
    } else {
      this.state = {
        searchTerm: props.navSearchTerms.searchTerm
          ? props.navSearchTerms.searchTerm
          : '',
        categoryId: props.navSearchTerms.categoryId
          ? props.navSearchTerms.categoryId
          : '0',
      };
    }
  }
  componentDidUpdate(prevProps) {
    const { navSearchTerms } = this.props;
    if (
      prevProps.navSearchTerms.categoryId !== navSearchTerms.categoryId ||
      prevProps.navSearchTerms.searchTerm !== navSearchTerms.searchTerm
    ) {
      this.setState({
        searchTerm: navSearchTerms.searchTerm ? navSearchTerms.searchTerm : '',
        categoryId: navSearchTerms.categoryId ? navSearchTerms.categoryId : '0',
      });
    }
  }
  logout = () => {
    this.props.logout();
    this.props.history.push('/');
  };
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  searchByTerm = () => {
    const { searchTerm, categoryId } = this.state;
    const { history } = this.props;
    history.push(`/products/search/category/${categoryId}/term/${searchTerm}`);
  };
  render() {
    const { searchTerm, categoryId } = this.state;
    const { categories, isLoggedIn, user, clearNavSearchTerms } = this.props;
    const { onChange, searchByTerm } = this;

    return (
      <Fragment>
        <Navbar bg="light">
          <Navbar.Brand>Grace Shopper</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" onClick={() => clearNavSearchTerms()}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              onClick={() => clearNavSearchTerms()}
            >
              Products
            </Nav.Link>

            {user.isAdmin ? (
              <Nav.Link as={Link} to="/admin" className="mr-auto">
                admin
              </Nav.Link>
            ) : (
              ''
            )}

            <Nav.Item>
              {this.props.isLoggedIn ? (
                <div>
                  <button
                    className="mr-auto"
                    type="button"
                    onClick={this.logout}
                  >
                    logout
                  </button>
                  <Nav.Link as={Link} to="/user" className="mr-auto">
                    user
                  </Nav.Link>
                </div>
              ) : (
                <Nav.Link as={Link} to="/login" className="mr-auto">
                  login
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Link as={Link} to="/cart">
              cart
            </Nav.Link>

            <div className="input-group">
              <Form.Control
                as="select"
                variant="outline-secondary"
                value={categoryId}
                onChange={onChange}
                name="categoryId"
              >
                <option value="0">All</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Control>
              <FormControl
                type="text"
                placeholder="Search By Title"
                className="mx-sm-2"
                name="searchTerm"
                value={searchTerm}
                onChange={onChange}
              />
              <div className="input-group-append">
                <Button
                  variant="outline-secondary"
                  onClick={() => searchByTerm()}
                >
                  Search
                </Button>
              </div>
            </div>
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, categories, navSearchTerms }) => {
  return {
    isLoggedIn: !!user.id,
    categories,
    user,
    navSearchTerms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    clearNavSearchTerms: () => dispatch(updateNavSearchValsBasedOnURL('0', '')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
