import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='jusitfy-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Prihlásenie</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Prihlásenie</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Doručenie</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Doručenie</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Platba</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Platba</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Objednať</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Objednať</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
