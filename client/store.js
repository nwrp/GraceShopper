/* eslint-disable default-case */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//CONSTANTS

const SET_USER = 'SET_USER';
const GET_USERS = 'GET_USERS';
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT_IMAGES = 'GET_PRODUCTS_IMAGES';
const CREATE_CART = 'CREATE_CART';
const GET_ORDERS = 'GET_ORDERS';
const ADD_LINEITEM = 'ADD_LINEITEM';
const SET_SESSION_CART = 'SET_SESSION_CART';

//ACTION CREATORS

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
});

const setUserActionCreator = user => ({
  type: SET_USER,
  user
});

const getUsers = users => ({
  type: GET_USERS,
  users
});

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
});

const getProductImages = productImages => ({
  type: GET_PRODUCT_IMAGES,
  productImages
});

const createCartActionCreator = order => ({
  type: CREATE_CART,
  order
});

const addLineItemAC = item => ({
  type: ADD_LINEITEM,
  item
});
const setSessionCart = sessionCart => ({
  type: SET_SESSION_CART,
  sessionCart
});

//THUNKS

const fetchCategories = () => {
  return dispatch => {
    return axios
      .get('/api/categories')
      .then(response => response.data)
      .then(categories => dispatch(getCategories(categories)));
  };
};

const fetchProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(getProducts(products)));
  };
};

const fetchProductImages = () => {
  return dispatch => {
    return axios
      .get('/api/products/productImages')
      .then(response => response.data)
      .then(images => dispatch(getProductImages(images)));
  };
};

const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => dispatch(getUsers(users)));
  };
};

const loginAttempt = user => {
  return dispatch => {
    return axios
      .post('/api/auth', user)
      .then(res => res.data)
      .then(userData => {
        dispatch(setUserActionCreator(userData));
        return userData;
      });
  };
};

const sessionLogin = () => {
  return dispatch => {
    return axios
      .get('/api/auth')
      .then(res => res.data)
      .then(userData => dispatch(setUserActionCreator(userData)));
  };
};

const logout = () => {
  return dispatch => {
    return axios
      .delete('/api/auth')
      .then(() => dispatch(setUserActionCreator({})));
  };
};

const fetchOrders = () => {
  return dispatch => {
    return axios
      .get('/api/orders')
      .then(response => response.data)
      .then(data => {
        dispatch(getOrders(data));
      });
  };
};

const fetchUserOrders = userId => {
  return dispatch => {
    return axios
      .get(`/api/orders/user/${userId}`)
      .then(response => response.data)
      .then(data => {
        dispatch(getOrders(data));
        // Call the functionality to merge sessionCart and pending cart
      });
  };
};

const createSessionCart = sessionCart => {
  return dispatch => {
    return axios
      .post('/api/cart', sessionCart)
      .then(() => dispatch(setSessionCart(sessionCart)));
  };
};

const getSessionCart = () => {
  return dispatch => {
    return axios
      .get('/api/cart')
      .then(res => res.data)
      .then(data => dispatch(setSessionCart(data)));
  };
};

//create a cart for logged-in user by calling the post route
const createPendingOrder = order => {
  return dispatch => {
    return axios
      .post(`/api/orders/user/${order.userId}`, order)
      .then(response => response.data)
      .then(data => {
        console.log('Pending Order Created!');
        dispatch(createCartActionCreator(data));
        return data;
      });
  };
};

//create a line-item when a  product is added to the cart
const addToCart = item => {
  return dispatch => {
    return axios
      .post(`/api/orders/${item.orderId}`, item)
      .then(response => response.data)
      .then(data => {
        dispatch(addLineItemAC(data));
      });
  };
};

// const mergeCarts = (sessionCart, pendingOrder) => {

// }

//REDUCERS

const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

const products = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

const productImages = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCT_IMAGES:
      return action.productImages;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

const users = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

const orders = (state = [], action) => {
  switch (action.type) {
      case GET_ORDERS:
          return action.orders;
      case CREATE_CART:
          const cart = action.order;
          cart.lineitems = [];
          return [...state, cart];
      case ADD_LINEITEM:
          return state.map(order => {
            if (order.status === 'pending') {
              if (!order.lineitems){
                order.lineitems = [action.item]
              } else {
              order.lineitems.push(action.item)
              }
            }
            return order;
          })
      default:
          return state;
  }
};
const sessionCart = (state = {}, action) => {
  switch (action.type) {
    case SET_SESSION_CART:
      return action.sessionCart;
    default:
      return state;
  }
};

const reducer = combineReducers({
  categories,
  products,
  productImages,
  user,
  users,
  orders,
  sessionCart
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export {
  store,
  fetchCategories,
  fetchProducts,
  fetchProductImages,
  loginAttempt,
  fetchUsers,
  sessionLogin,
  logout,
  fetchOrders,
  fetchUserOrders,
  createPendingOrder,
  addToCart,
  createSessionCart,
  setSessionCart,
  getSessionCart
};
