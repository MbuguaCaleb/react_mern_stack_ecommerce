import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyWord, setKeyWord] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    //trim removes the White Spaces
    if (keyWord.trim()) {
      console.log('keyword')
      history.push(`/search/${keyWord}`)
    } else {
      history.push('/')
    }
  }
  return (
    <>
      <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder='Search Products ....'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    </>
  )
}

export default SearchBox
