import React, { useEffect } from 'react'
import axios from 'axios'
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  cancellOrder,
} from '../actions/orderActions'

import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CANCELL_RESET,
  ORDER_LIST_MY_RESET,
} from '../constants/orderConstants'
import { useStateContext } from '../context/StateContext'
import { addDecimals, calcDiscountedPrice } from '../functions/functions'

const OrderScreen = () => {
  const {
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    cartItems,
    setCartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext()

  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const orderId = params.id
  // const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderCancell = useSelector((state) => state.orderCancell)
  const { success: successCancell } = orderCancell

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDelete = useSelector((state) => state.orderDelete)
  const { success: successDelete } = orderDelete

  // if (!loading) {
  //   // Calculate Prices

  //   order.itemsPrice = addDecimals(
  //     order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  //   )
  // }

  //useEffect becomes shorter
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    }
    if (
      !order ||
      successPay ||
      successDeliver ||
      successCancell ||
      order._id !== orderId
    ) {
      //     dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CANCELL_RESET })

      dispatch(getOrderDetails(orderId))
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDelete,
    successDeliver,
    successCancell,
    navigate,
    userInfo,
  ])

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    })
  }

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(payOrder(orderId, details))
    })
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const cancellHandler = () => {
    dispatch(cancellOrder(order))
  }

  const newOrderHandler = () => {
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    setTotalPrice(0)
    setTotalQuantities(0)
    setCartItems([])
    dispatch({ type: ORDER_LIST_MY_RESET })
    document.location.href = '/'
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <div className='mx-2 my-4'>
        <h1 className='my-4'>Objednávka {order.orderNumber}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Doručovacia Adresa</h2>
                <p>
                  <strong>Meno: </strong> {order.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Adresa: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
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

                <h2>Stav objednávky</h2>

                {order.isDelivered ? (
                  <Message variant='success'>
                    Odoslané {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Neodoslané</Message>
                )}
                {order.isCancelled && (
                  <Message variant='danger'>Zrušená!</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Platba</h2>
                <p>
                  <strong>Spôsob: </strong>
                  {order.paymentMethod === 'Hotovosť'
                    ? 'Hotovosť pri prevzatí'
                    : 'PayPal alebo karta'}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>Zaplatené {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Nezaplatené</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Objednané produkty: </h2>
                {order.orderItems.length === 0 ? (
                  <Message>Objednávka neobsahuje žiadne produkty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
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
                            {order.discounts[index].discount > 0 && (
                              <p className='bg-red text-white inline p-1 ml-1'>
                                Zľava
                                {order.discounts[index].discount}%
                              </p>
                            )}
                          </Col>
                          <Col md={4}>
                            {item.discount ? (
                              <div>
                                {item.quantity} x{' '}
                                {calcDiscountedPrice(item.price, item.discount)
                                  .toFixed(2)
                                  .replace('.', ',')}{' '}
                                € ={' '}
                                {(
                                  item.quantity *
                                  calcDiscountedPrice(item.price, item.discount)
                                )
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
                      {addDecimals(order.totalPrice).replace('.', ',')} €{' '}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='flex'>
                    Poštovné:
                    <div className='ml-auto'>
                      {addDecimals(order.shippingPrice.toFixed(2)).replace(
                        '.',
                        ','
                      )}{' '}
                      €{' '}
                    </div>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className='flex'>
                    Celkom:
                    <div className='ml-auto'>
                      € {order.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </ListGroup.Item>
                {!order.isPaid &&
                  order.paymentMethod === 'PayPal alebo karta' && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {/* {isPending && <Loader />}
                    {isRejected && (
                      <Message variant='danger'>SDK load error</Message>
                    )} */}
                      {/* {isResolved && (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={successPaymentHandler}
                      />
                    )} */}
                    </ListGroup.Item>
                  )}
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      typ='button'
                      className='btn w-100 bg-red'
                      onClick={deliverHandler}
                    >
                      Označiť ako odoslané
                    </Button>
                  </ListGroup.Item>
                )}
                {userInfo &&
                  userInfo.isAdmin &&
                  !order.isCancelled &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        typ='button'
                        className='btn w-100 bg-red'
                        onClick={cancellHandler}
                      >
                        Zrušiť objednávku
                      </Button>
                    </ListGroup.Item>
                  )}
                <ListGroup.Item>
                  <Button
                    className='w-100 bg-green'
                    onClick={() => newOrderHandler()}
                  >
                    Vytvoriť novú objednávku
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default OrderScreen
