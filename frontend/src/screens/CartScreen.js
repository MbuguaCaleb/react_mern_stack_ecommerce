import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

//When i Load this Page i want to have added my Item into the Cart
function CartScreen({ match, location, history }) {
  //extracting the ID and the Quantity
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  //getting my cart items from store so that i loop through them
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems)
  
  useEffect(() => {
    //i only want to dispatch when there is a product Id
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return <div>Cart</div>
}

export default CartScreen
