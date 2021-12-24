import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

//getState is a store method

//Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  //i am getting my current State after dispatch as i am saving it into localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  //after i remove the item from dispatch
  //I must set my Local Storage to the new Value
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
