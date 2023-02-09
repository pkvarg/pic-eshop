import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// import Rating from './Rating'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const Product = ({ product }) => {
  return (
    <div className='my-3 p-3'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          className='product-img-card-width'
        />
      </Link>
      <Card.Body className='product-home-info'>
        <Link to={`/product/${product._id}`} className='no-underline'>
          <Card.Title as='div' className='product-home-name'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as='div'>
          <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}

        <div className='product-home-price'>
          {product.discount ? (
            <h5 className='discounted-price'>
              <span className='discounted-price-span'>
                Zľava {product.discount}%
              </span>
              €{addDecimals(product.discountedPrice)}
            </h5>
          ) : (
            <h4>€{addDecimals(product.price)}</h4>
          )}
          {/* € {product.price.toFixed(2)} */}
        </div>
      </Card.Body>
    </div>
  )
}

export default Product
