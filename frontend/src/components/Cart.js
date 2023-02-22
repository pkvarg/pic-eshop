import React, { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContext'
import { addDecimals } from '../functions/functions'

const Cart = () => {
  const navigate = useNavigate()
  const handleCheckout = () => {
    setShowCart(false)
    navigate('/login?redirect=/shipping')
  }

  const cartRef = useRef()
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    // setCartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext()

  return (
    <>
      <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container'>
          <button
            type='button'
            className='cart-heading bg-violet rounded-xl '
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />

            <span className='heading'>Váš košík</span>
            <span className='cart-num-items'>
              ({totalQuantities}{' '}
              {totalQuantities === 1 ? 'položka' : 'položiek'})
            </span>
          </button>

          {cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Váš košík je prázdny</h3>
              <Link href='/'>
                <button
                  type='button'
                  onClick={() => setShowCart(false)}
                  className='btn'
                >
                  Pokračovať v nákupe
                </button>
              </Link>
            </div>
          )}

          <div>
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div
                  className='product flex flex-row items-center gap-6'
                  key={item._id}
                >
                  <img
                    src={item.image}
                    className='cart-product-image'
                    alt={item.name}
                  />
                  <div className='item-desc flex flex-col'>
                    <div className='flex flex-row justify-between'>
                      <h5>{item.name}</h5>
                      {item.discount ? (
                        <h4 className='bg-red text-white p-2'>
                          {-item.discount}%{' '}
                          {addDecimals(item.discountedPrice).replace('.', ',')}{' '}
                          €
                        </h4>
                      ) : (
                        <h4>{addDecimals(item.price).replace('.', ',')} €</h4>
                      )}
                    </div>
                    <div className='flex flex-row bottom justify-between items-center'>
                      <div className=''>
                        <p className='quantity-desc flex flex-row items-center'>
                          <span
                            className='minus'
                            onClick={() => toggleCartItemQuanitity(item, 'dec')}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className='num'>{item.quantity}</span>
                          <span
                            className='plus'
                            onClick={() => toggleCartItemQuanitity(item, 'inc')}
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
            {cartItems.length >= 1 && (
              <div className='mt-1'>
                <div className='flex flex-row justify-between items-center text-[25px]'>
                  <h3>Spolu:</h3>
                  <h3>{addDecimals(totalPrice).replace('.', ',')} €</h3>
                </div>
                <div className='flex justify-center mt-4'>
                  <button
                    type='button'
                    className='btn-cart'
                    onClick={handleCheckout}
                  >
                    Do pokladne
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
