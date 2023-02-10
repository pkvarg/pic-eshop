import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const pageSize = 10
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = (product) => {
    dispatch(createProduct())
  }

  const linkToCreateDiscount = () => {
    navigate('/create-discount')
  }

  const linkToReviews = () => {
    navigate('/admin/reviews')
  }

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber, pageSize))
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  return (
    <>
      <Row className='align-items-center no-mobile mx-2 my-4'>
        <Col>
          <h1>Produkty</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 bg-violet' onClick={linkToReviews}>
            Recenzie
          </Button>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 bg-violet' onClick={linkToCreateDiscount}>
            <i className='fas fa-plus'></i> Vytvoriť Akciu
          </Button>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 bg-violet' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Vytvoriť produkt
          </Button>
        </Col>
      </Row>
      <Row className='align-items-center mobile-only'>
        <Col>
          <h1>Produkty</h1>
        </Col>
        <Col className='text-start'>
          <Button className='my-3 btn-blue' onClick={linkToReviews}>
            Recenzie
          </Button>
        </Col>

        <Col className='text-start'>
          <Button className='my-3 btn-red' onClick={linkToCreateDiscount}>
            <i className='fas fa-plus'></i> Vytvoriť Akciu
          </Button>
        </Col>
        <Col className='text-start'>
          <Button className='my-3 btn-blue' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Vytvoriť produkt
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm mx-2 my-4'
          >
            <thead>
              <tr>
                <th>NÁZOV</th>
                <th>CENA</th>
                <th>KATEGÓRIA</th>
                <th>ZĽAVA</th>
                <th>ZĽ.CENA</th>
                {/* <th>Úryvok</th> */}
                {/* <th>Detaily</th> */}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className='prod-list-name'>{product.name}</td>
                  <td>€{product.price.toFixed(2)}</td>
                  <td className='prod-list-name'>
                    {product.category
                      .replace('-', ' ')
                      .replace('-', ' ')
                      .replace('-', ' ')}
                  </td>
                  <td>{product.discount}%</td>
                  <td>€{product.discountedPrice.toFixed(2)}</td>
                  {/* <td>{product.excerpt ? 'yes' : 'no'}</td> */}
                  {/* <td>
                    {!product.pages ||
                    !product.isbn ||
                    !product.year ||
                    !product.category ||
                    !product.tags ||
                    !product.description ||
                    !product.weight ||
                    !product.language ||
                    !product.binding ||
                    !product.related
                      ? '???'
                      : 'OK'}
                  </td> */}

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
        </>
      )}
    </>
  )
}

export default ProductListScreen
