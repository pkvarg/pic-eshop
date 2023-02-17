import React, { useEffect, useRef, useContext, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import toast from 'react-hot-toast'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContext'

const urlFor = '123'
const handleCheckout = () => {
  console.log('456')
}

const Cart = () => {
  const cartRef = useRef()
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext()

  // const params = useParams()
  // const location = useLocation()
  const navigate = useNavigate()

  // const productId = params.id
  // const qty = new URLSearchParams(location.search).get('qty')
  // const dispatch = useDispatch()
  // const cart = useSelector((state) => state.cart)
  // const { cartItems } = cart

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty))
  //   }
  // }, [dispatch, productId, qty])

  // const removeFromCartHandler = (id) => {
  //   dispatch(removeFromCart(id))
  //   navigate('/cart')
  // }

  // const checkoutHandler = () => {
  //   navigate('/login?redirect=/shipping')
  // }

  const continueShopping = () => {
    navigate('/')
  }

  return (
    <>
      {/* <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container'>
          <button
            type='button'
            className='bg-violet p-2'
            onClick={() => setShowCart(false)}
          >
            Naspäť
          </button>
          <Row className='mx-2 my-4'>
            <Col md={8}>
              <h1 className='my-4'>Nákupný košík</h1>
              {cartItems.length === 0 ? (
                <Message>
                  Váš košík je prázdny{' '}
                  <Link to='/' className='cart-empty-back-link '>
                    Naspäť
                  </Link>
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link
                            to={`/product/${item.product}`}
                            className='no-underline'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>€ {addDecimals(item.price)}</Col>
                        <Col md={2}>
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>
                      Položiek (
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}
                      )
                    </h2>
                    Produkty: €
                    {cartItems
                      .reduce(
                        (acc, item) => acc + Number(item.qty * item.price),
                        0
                      )
                      .toFixed(2)}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Poštovné: €
                        {cartItems
                          .reduce(
                            (acc, item) => acc + Number(item.qty * item.price),
                            0
                          )
                          .toFixed(2) > 100
                          ? 0
                          : addDecimals(3.5)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Celkom: €
                        {addDecimals(
                          Number(
                            cartItems.reduce(
                              (acc, item) =>
                                acc + Number(item.qty * item.price),
                              0
                            )
                          ) +
                            Number(
                              cartItems.reduce(
                                (acc, item) =>
                                  acc + Number(item.qty * item.price),
                                0
                              ) > 100
                                ? 0
                                : 3.5
                            )
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {cartItems.length > 0 && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='w-100 bg-green'
                        disabled={cartItems.lenght === 0}
                        onClick={checkoutHandler}
                      >
                        Do pokladne
                      </Button>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={continueShopping}
                      className='w-100 bg-violet'
                      type='button'
                    >
                      Pokračovať v nákupe
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      </div> */}
      <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container'>
          <button
            type='button'
            className='cart-heading bg-violet'
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />

            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantities} items)</span>
          </button>

          {cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href='/'>
                <button
                  type='button'
                  onClick={() => setShowCart(false)}
                  className='btn'
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}

          <div className='product-container'>
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className='product' key={item._id}>
                  <img
                    src={urlFor(item?.image[0])}
                    className='cart-product-image'
                  />
                  <div className='item-desc'>
                    <div className='flex top'>
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className='flex bottom'>
                      <div>
                        <p className='quantity-desc'>
                          <span
                            className='minus'
                            onClick={() =>
                              toggleCartItemQuanitity(item._id, 'dec')
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className='num' onClick=''>
                            {item.quantity}
                          </span>
                          <span
                            className='plus'
                            onClick={() =>
                              toggleCartItemQuanitity(item._id, 'inc')
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type='button'
                        className='remove-item'
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {cartItems.length >= 1 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button type='button' className='btn' onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
