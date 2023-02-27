import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
import ProductJSM from '../components/ProductJSM'
import Categories from '../components/Categories'

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

      {/* <h1 className='new-publications'>Produkty</h1>
      <hr></hr> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='flex flex-row items-center gap-12 mx-12'>
            <Categories />

            <Row className=''>
              {products.map((product) => (
                <Col
                  className='
            no-mobile
            '
                  key={product._id}
                  // sm={12}
                  // md={6}
                  // lg={4}
                  // xl={3}
                >
                  <ProductJSM product={product} />
                </Col>
              ))}
              {/* {products.map((product) => (
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
              ))} */}
            </Row>
          </div>
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
