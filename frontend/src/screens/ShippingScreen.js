import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  //setting values from my LocalStoage/State as initial Values
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    //redurect to payments Page
    history.push('/payment')
  }
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='pb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter Address'
            required
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='pb-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter City'
            value={city}
            required
            onChange={(e) => {
              setCity(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='pb-3'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Enter Postal Code'
            value={postalCode}
            required
            onChange={(e) => {
              setPostalCode(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='Country' className='pb-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='country'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => {
              setCountry(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
