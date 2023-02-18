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

  const navigate = useNavigate()

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const continueShopping = () => {
    navigate('/')
  }

  return (
    <>
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

          <div className=''>
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div
                  className='product flex flex-row items-center'
                  key={item._id}
                >
                  <img src={item.image} className='cart-product-image' />
                  <div className='item-desc flex flex-col'>
                    <div className='flex flex-row justify-between'>
                      <h5>{item.name}</h5>
                      <h4>{item.price}€</h4>
                    </div>
                    <div className='flex flex-row bottom justify-between items-center'>
                      <div className=''>
                        <p className='quantity-desc flex flex-row items-center'>
                          <span
                            className='minus'
                            onClick={() =>
                              toggleCartItemQuanitity(item._id, 'dec')
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className='num'>{item.quantity}</span>
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
            <div className='mt-1'>
              <div className='flex flex-row justify-between items-center text-[25px]'>
                <h3>Subtotal:</h3>
                <h3>{totalPrice} €</h3>
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
