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
// import Rating from '../components/Rating'
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
            {products.map(
              (product) =>
                product._id === id && (
                  <div key={product._id}>
                    <Meta title={product.name} />
                    <Row>
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
                              onClick={() => handleLink(product.related2.id)}
                            >
                              <h6 className='related-link'>
                                {product.related2.name}
                              </h6>
                            </Form>
                          )}
                          {product.related3 && (
                            <Form
                              onClick={() => handleLink(product.related3.id)}
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
                              <h3 className='product-name'>{product.name}</h3>
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
                                  {/* <i
                                className={
                                  isFavorite === true
                                    ? 'fa-solid fa-heart red'
                                    : 'fa-solid fa-heart no-color'
                                }
                              ></i> */}
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
                                      €{addDecimals(product.discountedPrice)}
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
                                      onChange={(e) => setQty(e.target.value)}
                                    >
                                      {[
                                        ...Array(product.countInStock).keys(),
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
                    </Row>
                  </div>
                )
            )}
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

            <Row className='mx-2 my-4'>
              {products.map(
                (product) =>
                  product._id === id && (
                    <Col md={6} key={product._id}>
                      <h2 className='my-2'>Recenzie</h2>
                      {product.reviews.length === 0 && (
                        <Message>Žiadne recenzie</Message>
                      )}
                      <ListGroup variant='flush'>
                        {product.reviews.map(
                          (review) =>
                            review.isAcknowledged === true && (
                              <ListGroup.Item
                                key={review._id}
                                className='review-items'
                              >
                                <strong>{review.name}</strong>
                                <p>{review.comment}</p>
                              </ListGroup.Item>
                            )
                        )}
                        <ListGroup.Item className='review-write'>
                          <h2 className='review-write'>Napíšte recenziu</h2>
                          {errorProductReview && (
                            <Message variant='danger'>
                              {errorProductReview}
                            </Message>
                          )}
                          {userInfo ? (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId='comment'>
                                <Form.Label className='review-comment'>
                                  Komentár
                                </Form.Label>
                                <Form.Control
                                  as='textarea'
                                  row='3'
                                  value={comment}
                                  onChange={(e) =>
                                    commentHandler(e.target.value)
                                  }
                                  className='review-stop'
                                ></Form.Control>
                              </Form.Group>
                              <Button
                                type='submit'
                                className='my-3 bg-violet rounded'
                              >
                                Odoslať
                              </Button>
                            </Form>
                          ) : (
                            <Message>
                              Prosím <Link to='/login'>Prihláste sa</Link> pre
                              napísanie recenzie
                            </Message>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  )
              )}
            </Row>
          </>
        )}
      </div>
    </>
  )
}

export default ProductScreen
