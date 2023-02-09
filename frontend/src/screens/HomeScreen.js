import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
const HomeScreen = () => {
  const params = useParams()
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1
  const pageSize = 8

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, pageSize))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />

      <h1 className='new-publications'>Produkty</h1>
      <hr></hr>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col
                className='
            align-items-stretch d-flex no-mobile
            '
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
            {products.map((product) => (
              <Col
                className='
            align-items-stretch mobile-only
            '
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* {pageNumber > 1 && (
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            ></Paginate>
          )} */}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default HomeScreen
