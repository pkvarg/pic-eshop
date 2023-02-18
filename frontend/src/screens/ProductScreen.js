import React, { useState, useLayoutEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listAllProducts,
  createProductReview,
  //updateProduct,
  updateProductAnybody,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Categories from '../components/Categories'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const params = useParams()
  const id = params.id
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // const userId = userInfo._id

  useLayoutEffect(() => {
    if (successProductReview) {
      setMessage('Recenzia odoslaná adminovi')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    window.scrollTo(0, 250)

    dispatch(listAllProducts())
  }, [dispatch, id, successProductReview])

  const navigate = useNavigate()
  const addToCartHandler = () => {
    navigate(`../cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    )
  }

  const continueShopping = () => {
    navigate('/')
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const handleLink = (id) => {
    navigate(`/product/${id}`)
  }

  const commentHandler = (comment) => {
    setComment(comment)
  }

  const addToFavoritesHandler = (productId) => {
    dispatch(updateProductAnybody({ _id: productId, favoriteOf: userInfo._id }))

    document.location.href = `/product/${id}`
  }

  let isFavorite = false
  if (userInfo) {
    products.map((prod) =>
      prod.favoriteOf.map((fav) => {
        if (prod._id === id && fav._id === userInfo._id)
          return (isFavorite = true)
      })
    )
  }

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
            <div className='flex flex-row items-center gap-12 mx-12'>
              <Categories />
              <div>
                {products.map(
                  (product) =>
                    product._id === id && (
                      <div key={product._id}>
                        <Meta title={product.name} />
                        {/* <Row>
                          <Col md={3} key={product._id}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              className='prod-img-width'
                            ></Image>
                            <ListGroup.Item
                              className='product-see-also no-mobile'
                              key={product._id}
                            >
                              {product.related && <h5>Súvisiace produkty</h5>}

                              {product.related && (
                                <Form
                                  onClick={() => handleLink(product.related.id)}
                                >
                                  <h6 className='related-link'>
                                    {product.related.name}
                                  </h6>
                                </Form>
                              )}
                              {product.related2 && (
                                <Form
                                  onClick={() =>
                                    handleLink(product.related2.id)
                                  }
                                >
                                  <h6 className='related-link'>
                                    {product.related2.name}
                                  </h6>
                                </Form>
                              )}
                              {product.related3 && (
                                <Form
                                  onClick={() =>
                                    handleLink(product.related3.id)
                                  }
                                >
                                  <h6 className='related-link'>
                                    {product.related3.name}
                                  </h6>
                                </Form>
                              )}
                              <div className='mx-4 my-4'>
                                <h5>Hmotnosť</h5>
                                <h6>{product.weight}kg</h6>
                              </div>
                            </ListGroup.Item>
                          </Col>
                          <Col md={6}>
                            <ListGroup variant='flush'>
                              <ListGroup.Item className='product-author'>
                                <div className='product-title-and-favorites'>
                                  <h3 className='product-name'>
                                    {product.name}
                                  </h3>
                                  {userInfo && (
                                    <button
                                      className='favorites-button-class'
                                      onClick={() =>
                                        addToFavoritesHandler(product._id)
                                      }
                                    >
                                      {isFavorite ? (
                                        <i className='fa-solid fa-heart red'></i>
                                      ) : (
                                        <p className='favorites-add'>
                                          Pridať k obľúbeným
                                        </p>
                                      )}
                                   
                                    </button>
                                  )}
                                </div>
                                <h4>{product.author}</h4>
                              </ListGroup.Item>

                              <ListGroup.Item className='product-price'>
                                Cena: €{addDecimals(product.price)}
                              </ListGroup.Item>
                              <ListGroup.Item className='product-description'>
                                Popis: {product.description}
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                          <Col md={3}>
                            <Card>
                              <ListGroup variant='flush'>
                                <ListGroup.Item>
                                  <Row>
                                    <Col>Cena :</Col>
                                    <Col>
                                      {product.discount ? (
                                        <h5 className='discounted-price'>
                                          <span className='discounted-price-span'>
                                            Zľava {product.discount}%
                                          </span>
                                          €
                                          {addDecimals(product.discountedPrice)}
                                        </h5>
                                      ) : (
                                        <h4>€{addDecimals(product.price)}</h4>
                                      )}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                      {product.countInStock > 0
                                        ? 'Na sklade'
                                        : 'Vypredané'}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                  <ListGroup.Item>
                                    <Row>
                                      <Col>Počet:</Col>
                                      <Col>
                                        <Form.Control
                                          as='select'
                                          value={qty}
                                          onChange={(e) =>
                                            setQty(e.target.value)
                                          }
                                        >
                                          {[
                                            ...Array(
                                              product.countInStock
                                            ).keys(),
                                          ].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                              {x + 1}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                  <Button
                                    onClick={addToCartHandler}
                                    className='w-100 bg-message-green'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                  >
                                    Pridať do košíka
                                  </Button>
                                </ListGroup.Item>
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
                              {message && (
                                <Message variant='success'>{message}</Message>
                              )}
                            </Card>
                          </Col>
                        </Row> */}
                        <h1 className='my-3'>{product.name}</h1>
                        <div className='flex flex-row items-center gap-4'>
                          <div className='border'>
                            <img src={product.image} alt={product.name} />
                          </div>
                          {/* short desc */}
                          <div>
                            <h2 className='my-3'>{product.description}</h2>
                            {/* link to full desc */}
                            <div className='flex flex-col'>
                              <div className='bg-grey flex flex-row p-6 justify-between'>
                                <p>Dostupnosť</p>
                                <p>
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
                                </p>
                              </div>
                              <div className='flex flex-row items-center'>
                                {product.discount ? (
                                  <div className='flex flex-row bg-red text-white font-extrabold px-[3px] gap-3'>
                                    <span> - {product.discount}%</span>
                                    {addDecimals(product.discountedPrice)}€
                                  </div>
                                ) : (
                                  <h4 className='font-bold text-[25px]'>
                                    €{addDecimals(product.price)}
                                  </h4>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <Container>
              {products.map(
                (product) =>
                  product._id === id && (
                    <ListGroup.Item
                      className='product-see-also mobile-only'
                      key={product._id}
                    >
                      <h5>Katalóg</h5>
                      <h6>{product.catalog}</h6>
                      {product.related && <h5>Pozrite si tiež</h5>}

                      {product.related && (
                        <Form onClick={() => handleLink(product.related.id)}>
                          <h6 className='related-link'>
                            {product.related.name}
                          </h6>
                        </Form>
                      )}
                      {product.related2 && (
                        <Form onClick={() => handleLink(product.related2.id)}>
                          <h6 className='related-link'>
                            {product.related2.name}
                          </h6>
                        </Form>
                      )}
                      {product.related3 && (
                        <Form onClick={() => handleLink(product.related3.id)}>
                          <h6 className='related-link'>
                            {product.related3.name}
                          </h6>
                        </Form>
                      )}

                      <h5>Hmotnosť</h5>
                      <h6>{product.weight}</h6>
                    </ListGroup.Item>
                  )
              )}
            </Container>
          </>
        )}
      </div>
    </>
  )
}

export default ProductScreen
