import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'

// import Rating from './Rating'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

// const imgOracle = 'https://pictusweb.online/uploads'

const Product = ({ product, showCart, setShowCart }) => {
  const [qty, setQty] = useState(1)
  // const [showCart, setShowCart] = useState(false)
  const params = useParams()
  const id = params.id
  const navigate = useNavigate()

  console.log('prod:', showCart)

  const addToCartHandler = (id, qty) => {
    //navigate(`../cart/${id}?qty=${qty}`)
    setShowCart(true)
  }

  const tax = 20
  const withoutTax = (price) => {
    const taxDue = tax * (price / 100)
    return price - taxDue
  }

  const qtyHandlerUp = () => {
    const quantity = qty + 1
    setQty(quantity)
  }

  const qtyHandlerDown = () => {
    const quantity = qty - 1
    if (qty <= 0) {
      setQty(0)
    } else {
      setQty(quantity)
    }
  }

  return (
    <div className='my-3 p-3 border rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={`${product.image}`}
          variant='top'
          className='product-img-card-width'
        />
      </Link>
      <Card.Body className='product-home-info'>
        <Link to={`/product/${product._id}`} className='no-underline'>
          <Card.Title as='div' className='product-home-name mb-2'>
            <strong className='font-bold text-[20px]'>{product.name}</strong>
          </Card.Title>
        </Link>

        <div>
          {product.discount ? (
            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-row bg-red text-white font-extrabold px-[3px] gap-3'>
                <span> - {product.discount}%</span>
                {addDecimals(product.discountedPrice)}€
              </div>
              {product.countInStock > 0 ? (
                <div className='bg-[#e5f8ec] text-[#00bc47] font-[500] px-2 rounded-[15px]'>
                  Skladom
                </div>
              ) : (
                <div className='bg-[#fa7878] text-white font-[500] px-2 rounded-[15px]'>
                  {' '}
                  Vypredané
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-row items-center justify-between'>
              <h4 className='font-bold text-[25px]'>
                €{addDecimals(product.price)}
              </h4>
              {product.countInStock > 0 ? (
                <div className='bg-[#e5f8ec] text-[#00bc47] font-[500] px-2 rounded-[15px]'>
                  Skladom
                </div>
              ) : (
                <div className='bg-[#fa7878] text-white font-[500] px-2 rounded-[15px]'>
                  {' '}
                  Vypredané
                </div>
              )}
            </div>
          )}
        </div>
        {product.discount ? (
          <div className='text-[#9b9b9b] font-[350] mb-2'>
            €{addDecimals(withoutTax(product.discountedPrice))} bez DPH
          </div>
        ) : (
          <div className='text-[#9b9b9b] font-[350] mb-2'>
            €{addDecimals(withoutTax(product.price))} bez DPH
          </div>
        )}

        <div className='flex flex-row gap-2'>
          <div className='flex flex-row items-center border gap-2 rounded-[10px] overflow-hidden'>
            <button
              className='h-[100%] w-10 border-l border-grey bg-[#faf5f5] text-[#fa7878] font-bold'
              onClick={() => qtyHandlerDown()}
            >
              -
            </button>
            <p>{qty}</p>
            <button
              className='h-[100%] w-10 border-r border-grey  bg-[#faf5f5] text-[#fa7878] font-bold'
              onClick={() => qtyHandlerUp()}
            >
              +
            </button>
          </div>

          <Button
            onClick={() => addToCartHandler(product._id, qty)}
            className='w-100 bg-[#fa7878] rounded-[17.5px] hover:bg-green'
            type='button'
            disabled={product.countInStock === 0}
          >
            Kúpiť
          </Button>
        </div>
      </Card.Body>
    </div>
  )
}

export default Product
