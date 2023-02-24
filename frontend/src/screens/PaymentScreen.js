import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal alebo karta')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <>
      <Link className='btn btn-back my-3' to='/shipping'>
        Naspäť na informácie o doručení
      </Link>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1>Spôsob platby</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Vyberte spôsob platby</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal alebo karta'
                id='PayPal'
                name='paymentMethod'
                value='PayPal alebo karta'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Karta - Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type='radio'
                label='Hotovosť pri prevzatí'
                id='Cash'
                name='paymentMethod'
                value='Hotovosť'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type='submit' className='mt-6 mb-12 bg-violet'>
            Pokračovať
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
