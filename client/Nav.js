import React, { Component, Fragment } from 'react';
import {
  Button,
  Col,
  Container,
  Navbar,
  Nav,
  Form,
  NavDropdown,
  InputGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, updateNavSearchValsBasedOnURL } from './store';

class Navigation extends Component {
  constructor(props) {
    super(props);
    if (!props.navSearchTerms.categoryId || !props.navSearchTerms.searchTerm) {
      this.state = {
        searchTerm: '',
        categoryId: '0'
      };
    } else {
      this.state = {
        searchTerm: props.navSearchTerms.searchTerm
          ? props.navSearchTerms.searchTerm
          : '',
        categoryId: props.navSearchTerms.categoryId
          ? props.navSearchTerms.categoryId
          : '0'
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
        categoryId: navSearchTerms.categoryId ? navSearchTerms.categoryId : '0'
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
        <Navbar style={{ padding: 0 }}>
          <Container>
            <Nav>
              <Col>
                <Navbar.Brand
                  style={{
                    fontSize: '40px',
                    padding: 0,
                    margin: 0
                  }}
                >
                  <span style={{ color: '#9161e8' }}>Grace</span>
                  <span style={{ color: '#01A4A4' }}>Shopper</span>
                </Navbar.Brand>
              </Col>
              <Col>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => clearNavSearchTerms()}
                    style={{
                      marginTop: '12px',
                      marginLeft: '8px',
                      color: '#00A1CB',
                      fontSize: '20px'
                    }}
                  >
                    Home
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col>
                <Nav.Item>
                  <Nav.Link
                    style={{
                      marginTop: '12px',
                      color: '#00A1CB',
                      fontSize: '20px'
                    }}
                    as={Link}
                    to="/products"
                    onClick={() => clearNavSearchTerms()}
                  >
                    Products
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col>
                {isLoggedIn ? (
                  <Fragment>
                    <NavDropdown
                      title={`${user.username}`}
                      id="basic-nav-dropdown"
                      style={{
                        marginTop: '15px',
                        fontSize: '14px',
                        textColor: '#ee2a82'
                      }}
                    >
                      {user.isAdmin ? (
                        <Nav.Item>
                          <Nav.Link as={Link} to="/admin">
                            admin
                          </Nav.Link>
                        </Nav.Item>
                      ) : (
                        <Nav.Item>
                          <Nav.Link as={Link} to="/user">
                            my account
                          </Nav.Link>
                        </Nav.Item>
                      )}

                      <Nav.Item>
                        <Nav.Link onClick={this.logout}>logout</Nav.Link>
                      </Nav.Item>
                    </NavDropdown>
                  </Fragment>
                ) : (
                  <Fragment>
                    <NavDropdown
                      title="login"
                      id="basic-nav-dropdown"
                      style={{ marginTop: '14px', fontColor: '' }}
                    >
                      <Nav.Item>
                        <Nav.Link as={Link} to="/login" className="mr-auto">
                          sign in
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item href="#create">
                        <Nav.Link as={Link} to="/signup">
                          create account
                        </Nav.Link>
                      </Nav.Item>
                    </NavDropdown>
                  </Fragment>
                )}
              </Col>
              <Col>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    style={{ marginTop: '14px', marginRight: '10px' }}
                  >
                    <i
                      className="fas fa-shopping-cart"
                      size="9x"
                      style={{ color: '#7cc245' }}
                    />
                  </Nav.Link>
                </Nav.Item>
              </Col>

              <Col lg="5" className="justify-content-right">
                <Nav style={{ marginTop: '19px', marginLeft: '10px' }}>
                  <Form>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Form.Control
                          size="sm"
                          as="select"
                          value={categoryId}
                          onChange={onChange}
                          name="categoryId"
                        >
                          <option value="0">All Categories</option>
                          {categories.map(cat => (
                            <option
                              key={cat.id}
                              value={cat.id}
                              style={{ co: `${cat.color}` }}
                            >
                              {cat.name}
                            </option>
                          ))}
                        </Form.Control>
                      </InputGroup.Prepend>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Search Products"
                        name="searchTerm"
                        value={searchTerm}
                        onChange={onChange}
                      />
                      <InputGroup.Append>
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={() => searchByTerm()}
                        >
                          Search
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form>
                </Nav>
              </Col>
            </Nav>
          </Container>
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
    navSearchTerms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    clearNavSearchTerms: () => dispatch(updateNavSearchValsBasedOnURL('0', ''))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
