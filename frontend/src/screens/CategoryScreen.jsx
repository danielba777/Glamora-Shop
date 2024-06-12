import React from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useGetProductByGenderQuery } from '../slices/productsApiSlice.js'

const CategoryScreen = () => {

  const { gender, pageNumber, keyword } = useParams()

  console.log('gender: ', gender)
  console.log('pageNumber: ', pageNumber)
  console.log('keyword: ', keyword)

  const { data, isLoading, error } = useGetProductByGenderQuery({ gender, pageNumber, keyword })

  console.log(`Category Page Data for gender: ${gender} -> `, data)

  return (

    <>
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error }</Message>
      ) : (
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col w-full px-4'>
              <h1 className='text-2xl mb-4'>{ gender === 'women' ? 'Women' : 'Men' }</h1>
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

export default CategoryScreen