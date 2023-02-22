import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { useStateContext } from '../context/StateContext'
import { addDecimals } from '../functions/functions'

const PlaceOrderScreen = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod } = cart

  // DEFINE SHIPPING PRICE and TAX HERE
  // New
  const shippingPrice = addDecimals(totalPrice > 100 ? 0 : addDecimals(3.5))

  // New
  const totalPriceWithShipping = addDecimals(
    Number(totalPrice) + Number(shippingPrice)
  )

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  // ***************************************************

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [navigate, success])

  // send by email
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const orderEmailToEmail = userInfo.email

  const [message, setMessage] = useState(null)

  /* prod quantities TO update countInStock */
  // New
  let prodsQtys = {}
  cartItems.map((item, index) => {
    const productId = cartItems[index]._id
    const productQty = Number(cartItems[index].quantity)
    return (prodsQtys[index] = { product: productId, qty: productQty })
  })

  let prodsDiscounts = {}
  cartItems.map((item, index) => {
    const productId = cartItems[index]._id
    const productDiscount = Number(cartItems[index].discount)
    return (prodsDiscounts[index] = {
      product: productId,
      discount: productDiscount,
    })
  })

  const placeOrderhandler = () => {
    if (gdrpOrderChecked && tradeRulesOrderChecked) {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,

          shippingPrice: shippingPrice,
          //taxPrice: cart.taxPrice,
          totalPrice: totalPrice,
          user: userInfo.name,
          name: cart.shippingAddress.name,
          email: orderEmailToEmail,
          qtys: prodsQtys,
          discounts: prodsDiscounts,
        })
      )
    } else {
      setMessage('Potvrďte súhlas nižšie')
    }
  }

  const [gdrpOrderChecked, setGdprOrderChecked] = useState(false)
  const handleGdprOrder = () => {
    setGdprOrderChecked(!gdrpOrderChecked)
  }

  const [tradeRulesOrderChecked, setTradeRulesOrderChecked] = useState(false)
  const handleTradeRulesOrder = () => {
    setTradeRulesOrderChecked(!tradeRulesOrderChecked)
  }

  // console.log(orderItems)

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Link className='btn btn-back my-3' to='/payment'>
        Naspäť na Spôsob platby
      </Link>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Doručenie</h2>
              <p>
                <strong>Príjemca: </strong>
                {cart.shippingAddress.name}, {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
              {cart.shippingAddress.billingName && (
                <div>
                  <h4>Fakturačné údaje</h4>
                  <p>
                    {cart.shippingAddress.billingName},{' '}
                    {cart.shippingAddress.billingAddress},{' '}
                    {cart.shippingAddress.billingPostalCode},{' '}
                    {cart.shippingAddress.billingCity},{' '}
                    {cart.shippingAddress.billingCountry}
                    {cart.shippingAddress.billingICO && (
                      <div>
                        IČO:
                        {cart.shippingAddress.billingICO}, DIČ:
                        {cart.shippingAddress.billingDIC}
                      </div>
                    )}
                  </p>
                </div>
              )}
              {cart.shippingAddress.note && (
                <h5>Poznámka: {cart.shippingAddress.note}</h5>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Platba</h2>
              <strong>Spôsob platby: </strong>
              {cart.paymentMethod === 'Hotovosť'
                ? 'Hotovosť pri prevzatí'
                : 'PayPal alebo karta'}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Objednané produkty: </h2>
              {cartItems.length === 0 ? (
                <Message>Váš košík je prázdny</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className='items-center'>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          {item.discount > 0 ? (
                            <h5 className='place-order-discount'>
                              Zľava {item.discount}%
                            </h5>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col md={4}>
                          {item.discount ? (
                            <div>
                              {item.quantity} x{' '}
                              {item.discountedPrice
                                .toFixed(2)
                                .replace('.', ',')}{' '}
                              € ={' '}
                              {(item.quantity * item.discountedPrice)
                                .toFixed(2)
                                .replace('.', ',')}{' '}
                              €
                            </div>
                          ) : (
                            <div>
                              {item.quantity} x{' '}
                              {item.price.toFixed(2).replace('.', ',')} € ={' '}
                              {(item.quantity * item.price)
                                .toFixed(2)
                                .replace('.', ',')}{' '}
                              €
                            </div>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Súhrn objednávky</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='flex'>
                  Produkty:
                  <div className='ml-auto'>
                    {addDecimals(totalPrice).replace('.', ',')} €
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='flex'>
                  Poštovné:
                  <div className='ml-auto'>
                    {addDecimals(shippingPrice).replace('.', ',')} €
                  </div>
                </div>
              </ListGroup.Item>
              {/* Zľava...
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <div className='flex'>
                  Celkom:
                  <div className='ml-auto'>
                    {addDecimals(totalPriceWithShipping).replace('.', ',')} €
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                <Form.Group className='flex flex-row items-center gap-2'>
                  <Form.Check
                    type='checkbox'
                    name='gdprCheck'
                    required
                    onChange={handleGdprOrder}
                  />
                  <p className='agree-gdpr-order'>
                    <a href='/safety-privacy' target='_blank'>
                      Súhlasím so spracovaním osobných údajov
                    </a>
                  </p>
                </Form.Group>
                <Form.Group className='flex flex-row items-center gap-2'>
                  <Form.Check
                    type='checkbox'
                    name='tradeRulesCheck'
                    required
                    onChange={handleTradeRulesOrder}
                  />
                  <p className='agree-traderules-order'>
                    <a href='/trade-rules' target='_blank'>
                      Súhlasím s obchodnými podmienkami
                    </a>
                  </p>
                </Form.Group>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block w-100 bg-green'
                  disabled={cart.items === 0}
                  onClick={placeOrderhandler}
                >
                  Záväzne objednať
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
