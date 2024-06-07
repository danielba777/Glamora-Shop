import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div className='w-full px-4'>
        <h1 className='text-2xl mb-4'>Latest Products</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
            {products?.map((product) => (
                <Product key={product.imageId} product={product} />
            ))}
        </div>
        <div className='h-32 sm:h-64' />
    </div>
  )
}

export default HomeScreen