import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' //Helps me track my redux state from chrome extension
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'
//Undestanding combine reducer is very important because this is where i combine all my global states
//Always note the Key
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

//this sets my Initial State
const initialState = { cart: { cartItems: cartItemsFromLocalStorage } }

//i may have more than one middleware
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
