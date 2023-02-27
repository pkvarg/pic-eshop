import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { useStateContext } from '../context/StateContext'
import { toast } from 'react-hot-toast'
import { withoutTax, addDecimals } from '../functions/functions'

// const imgOracle = 'https://pictusweb.online/uploads'

const ProductJSM = ({ product }) => {
  const { onAdd, setShowCart, cartItems } = useStateContext()

  const [prodQty, setProdQty] = useState(1)

  const qtyHandlerUp = (productId) => {
    const quantity = prodQty + 1

    setProdQty(quantity)
  }

  const qtyHandlerDown = () => {
    const quantity = prodQty - 1
    if (prodQty <= 1) {
      setProdQty(1)
    } else {
      setProdQty(quantity)
    }
  }

  const checkThenhandleBuyNow = () => {
    if (cartItems.find((item) => item._id === product._id)) {
      toast.success('Produkt už máte v košíku')
    } else {
      handleBuyNow()
    }
  }

  const handleBuyNow = () => {
    onAdd(product, prodQty)

    setShowCart(true)
  }

  // console.log('prodJSM:', product)

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
              <div className='flex flex-row bg-red text-white font-extrabold px-[3px] mt-[1%] gap-3'>
                <span> - {product.discount}%</span>
                {addDecimals(product.discountedPrice).replace('.', ',')} €
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
                {addDecimals(product.price).replace('.', ',')} €
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
          <div className='text-[#9b9b9b] font-[350] mb-2 mt-[1.5%]'>
            {addDecimals(withoutTax(product.discountedPrice)).replace('.', ',')}{' '}
            € bez DPH
          </div>
        ) : (
          <div className='text-[#9b9b9b] font-[350] mb-2'>
            {addDecimals(withoutTax(product.price)).replace('.', ',')} € bez DPH
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
            <p>{prodQty}</p>
            <button
              className='h-[100%] w-10 border-r border-grey  bg-[#faf5f5] text-[#fa7878] font-bold'
              onClick={() => qtyHandlerUp()}
            >
              +
            </button>
          </div>

          <Button
            onClick={() => checkThenhandleBuyNow()}
            className='w-100 bg-[#fa7878] rounded-[17.5px] hover:bg-green'
            type='button'
            disabled={product.countInStock <= 0 && true}
          >
            Kúpiť
          </Button>
        </div>
      </Card.Body>
    </div>
  )
}

export default ProductJSM
