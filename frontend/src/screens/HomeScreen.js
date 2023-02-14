import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, NavDropdown } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { LinkContainer } from 'react-router-bootstrap'
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
            <div className='flex flex-col border '>
              <div className='flex flex-row items-center justify-between border-b border-grey'>
                <a
                  className='text-[25px] font-[500] text-black  py-2 px-6 cat-link'
                  href='/'
                >
                  Kategória a podkategórie
                </a>
                <NavDropdown className='text-[35px] '>
                  <LinkContainer to='/'>
                    <NavDropdown.Item>Podkategória</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <NavDropdown.Item>Podkategória</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <NavDropdown.Item>Podkategória</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </div>
              <a
                className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
                href='/'
              >
                Kategória druhá
              </a>
              <a
                className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
                href='/'
              >
                Kategória tretia
              </a>
              <a
                className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
                href='/'
              >
                Kategória štvrtá
              </a>
              <a
                className='text-[25px] font-[500] text-black border-b border-grey py-2 px-6 cat-link'
                href='/'
              >
                Kategória prvá
              </a>
            </div>

            <Row className='w-[80%]'>
              {products.map((product) => (
                <Col
                  className='d-inline
            no-mobile
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
