import React from 'react'
import { Link } from 'react-router-dom'

const ProductJSMcart = ({ product }) => {
  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <div className='product-card'>
          <img
            src={`${product.image}`}
            width={250}
            height={250}
            alt='eshop-product'
            className='product-image'
          />
          <p className='product-name'>{product.name}</p>
          <p className='product-price'>${product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductJSMcart
