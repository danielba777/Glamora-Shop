import React from 'react'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'

const HomeScreen = () => {

  const { data: products, isLoading, error } = useGetProductsQuery()

  return (

    <>
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error }</Message>
      ) : (
          <div className='w-full px-4'>
            <h1 className='text-2xl mb-4'>Latest Products</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
              {products?.map((product) => (
                <Product key={product.imageId} product={product} />
              ))}
            </div>
            <div className='h-32 sm:h-64' />
          </div>
      ) }

    </>
  )
}

export default HomeScreen