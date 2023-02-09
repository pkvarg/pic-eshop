import React, { useState, useLayoutEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { sendContactFormAction } from '../actions/contactActions'

const ContactScreen = () => {
  const x = process.env.REACT_APP_PASSWORD_GROUP_ONE
  const y = process.env.REACT_APP_PASSWORD_GROUP_TWO

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordGroupOne, setPasswordGroupOne] = useState(x)
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y)

  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)

  const dispatch = useDispatch()

  // useLayoutEffect(() => {
  //   window.scrollTo(0, 200)
  // })

  const contactForm = {
    name,
    email,
    subject,
    emailMessage,
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      setMessage(
        'Neodoslané! Kontaktujte nás telefonicky alebo emailom, prosím'
      )
      setName('')
      setEmail('')
      setSubject('')
      setEmailMessage('')
    } else {
      dispatch(sendContactFormAction(contactForm))
      setMessageSuccess('Správa úspešne odoslaná')
      setName('')
      setEmail('')
      setSubject('')
      setEmailMessage('')
    }
  }

  return (
    <>
      <FormContainer>
        <h1 className='mt-5'>Napíšte nám správu</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {messageSuccess && (
          <Message variant='success'>{messageSuccess}</Message>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>
              Meno a priezvisko<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type='name'
              placeholder='Meno a priezvisko'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>
              Email<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='subject'>
            <Form.Label>
              Predmet<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type='subject'
              placeholder='Predmet'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='message'>
            <Form.Label>
              Správa<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={10}
              type='textarea'
              placeholder='Vaša správa'
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            />
          </Form.Group>
          {/* passwords  */}
          <Form.Group controlId='password-one'>
            <Form.Control
              className='password-group'
              placeholder=''
              type='text'
              defaultValue={passwordGroupOne}
              onChange={(e) => setPasswordGroupOne(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password-two'>
            <Form.Control
              className='password-group'
              placeholder=''
              type='text'
              defaultValue={passwordGroupTwo}
              onChange={(e) => setPasswordGroupTwo(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-3 billing-flex'>
            <Form.Check type='checkbox' name='gdprCheck' required />
            <p className='agree-gdpr'>
              Súhlasím so spracovaním osobných údajov
            </p>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='my-3 bg-violet rounded'
          >
            Odoslať{' '}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ContactScreen
