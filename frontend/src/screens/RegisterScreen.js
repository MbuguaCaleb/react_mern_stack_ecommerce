import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  //Getting the Response after dispatch
  //beauty of this is that my login state is shared across my components
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    //redirect if user is logged In
    //very important piece of code
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      //Dispatch Register
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='pb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='pb-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='pb-3'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirm_password' className='pb-3'>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Log In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
