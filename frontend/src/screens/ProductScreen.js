import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Categories from '../components/Categories'
import { withoutTax, addDecimals } from '../functions/functions'
import { useStateContext } from '../context/StateContext'
import { toast } from 'react-hot-toast'

const ProductScreen = () => {
  const params = useParams()
  const id = params.id
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const { decQty, incQty, qty, onAdd, setShowCart, cartItems } =
    useStateContext()

  const handleBuyNow = (product) => {
    if (cartItems.find((item) => item._id === id)) {
      toast.success('Produkt už máte v košíku')
    } else {
      onAdd(product, qty)
      setShowCart(true)
    }
  }

  const navigate = useNavigate()

  // const addToFavoritesHandler = (productId) => {
  //   dispatch(updateProductAnybody({ _id: productId, favoriteOf: userInfo._id }))

  //   document.location.href = `/product/${id}`
  // }

  // let isFavorite = false
  // if (userInfo) {
  //   products.map((prod) =>
  //     prod.favoriteOf.map((fav) => {
  //       if (prod._id === id && fav._id === userInfo._id)
  //         return (isFavorite = true)
  //     })
  //   )
  // }

  return (
    <>
      <div className='mx-2 my-1'>
        <Link className='btn btn-back my-3' onClick={() => navigate(-1)}>
          Naspäť
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <div className='flex flex-row items-center justify-center gap-12'>
              <Categories />
              <div>
                {products.map(
                  (product) =>
                    product._id === id && (
                      <div key={product._id}>
                        <Meta title={product.name} />
                        <h1 className='my-3'>{product.name}</h1>
                        <div className='flex flex-row items-center gap-8 '>
                          <div className='border'>
                            <img src={product.image} alt={product.name} />
                          </div>
                          {/* short desc */}
                          <div className='w-[30rem]'>
                            <h2 className='my-3'>{product.description}</h2>
                            {/* link to full desc */}
                            <div className='flex flex-col mb-[15rem] border'>
                              <div className='bg-grey flex flex-row justify-center p-6 '>
                                <p className='mr-auto'>Dostupnosť</p>
                                <div>
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
                              </div>
                              <div className='flex flex-row items-center justify-between mx-4 mt-3.5 pb-3.5'>
                                {product.discount ? (
                                  <div className='mr-6'>
                                    <div className='flex flex-row bg-red text-white font-extrabold px-[3px] gap-3'>
                                      <span> - {product.discount}%</span>
                                      {addDecimals(
                                        product.discountedPrice
                                      ).replace('.', ',')}
                                      {''} €
                                    </div>
                                    <div>
                                      {addDecimals(
                                        withoutTax(product.discountedPrice)
                                      ).replace('.', ',')}{' '}
                                      € bez DPH
                                    </div>
                                  </div>
                                ) : (
                                  <div className='mr-6'>
                                    <h4 className='font-[700] text-[20px]'>
                                      {addDecimals(product.price).replace(
                                        '.',
                                        ','
                                      )}
                                      {''}€
                                    </h4>
                                    <div>
                                      {addDecimals(
                                        withoutTax(product.price)
                                      ).replace('.', ',')}
                                      {''} € bez DPH
                                    </div>
                                  </div>
                                )}
                                <div className='flex flex-row gap-8'>
                                  <div className='flex flex-row items-center border gap-2 rounded-[10px] overflow-hidden'>
                                    <button
                                      className='h-[100%] w-10 border-l border-grey bg-[#faf5f5] text-[#fa7878] font-bold'
                                      onClick={decQty}
                                    >
                                      -
                                    </button>
                                    <p>{qty}</p>
                                    <button
                                      className='h-[100%] w-10 border-r border-grey  bg-[#faf5f5] text-[#fa7878] font-bold'
                                      onClick={incQty}
                                    >
                                      +
                                    </button>
                                  </div>

                                  <Button
                                    onClick={() => handleBuyNow(product)}
                                    className='w-100 bg-[#fa7878] rounded-[17.5px] hover:bg-green'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                  >
                                    Kúpiť
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ProductScreen
