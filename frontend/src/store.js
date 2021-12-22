import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' //Helps me track my redux state from chrome extension
import { productListReducer } from './reducers/productReducers'

//Undestanding combine reducer is very important because this is where i combine all my global states
//Always note the Key
const reducer = combineReducers({
  productList: productListReducer,
})

const initialState = {}

//i may have more than one middleware
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
