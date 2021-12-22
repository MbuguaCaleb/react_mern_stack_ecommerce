import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants'

//action creators
//remember action creators fire actions
//now wonder there is a function inside a function
//redux thunk helps in this
//instead of getting products from the component, we are going to get products from this action
export const listProducts = () => async (dispatch) => {}
