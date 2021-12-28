import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' //Helps me track my redux state from chrome extension
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { userLogInReducer, userRegisterReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'

//Undestanding combine reducer is very important because this is where i combine all my global states
//Always note the Key
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogIn: userLogInReducer,
  userRegister: userRegisterReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

//cheking to see if we have User Info from LocalStorage
//Otherwise return Null
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

//this sets my Initial State
const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
  userLogIn: { userInfo: userInfoFromLocalStorage },
}

//i may have more than one middleware
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
