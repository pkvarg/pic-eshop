import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex header-search-radius'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Zadajte text...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' className='mx-1 header-search-btn'>
        <i className='fas fa-search'></i>
      </Button>
    </Form>
  )
}

export default SearchBox
