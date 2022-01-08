import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
  //getting the search property
  const keyWord = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  //getting the list of products from the redux store
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    //dispatching fetch products action
    dispatch(listProducts(keyWord, pageNumber))
  }, [dispatch, keyWord, pageNumber])

  return (
    <>
      {!keyWord && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              )
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyWord={keyWord ? keyWord : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
