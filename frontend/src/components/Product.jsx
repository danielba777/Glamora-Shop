import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div className='bg-white p-4 rounded shadow-md mb-2 hover:border' key={product.productDisplayName}>
        <Link to={`/product/${product._id}`}>
            <img src={`${process.env.PUBLIC_URL}/images/${product.imageId}.jpg`} alt={product.productDisplayName} className='w-full h-auto mb-4'/>
        </Link>
        <Link to={`/product/${product._id}`}>
            <h3 className='text-xs font-semibold sm:text-md sm:font-bold md:text-lg mb-2 max-h-12 overflow-hidden text-ellipsis whitespace-nowrap'>
                {product.productDisplayName}
            </h3>
        </Link>
        <h2>
            {product.price}€
        </h2>
    </div>
  )
}

export default Product