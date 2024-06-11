import React from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'

const HomeScreen = () => {

  const { pageNumber, keyword } = useParams()

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })

  return (

    <>
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error }</Message>
      ) : (
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col w-full px-4'>
              <h1 className='text-2xl mb-4'>{ keyword ? `Your Search Results for: "${keyword}"` : 'Latest Products'}</h1>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {data?.products?.map((product) => (
                  <Product key={product.imageId} product={product} />
                ))}
              </div>
              <div className='h-8 sm:h-64' />
            </div>
             <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
          </div>
      ) }
    </>
  )
}

export default HomeScreen