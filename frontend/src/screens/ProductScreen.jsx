import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice.js'
import { addToCart } from '../slices/cartSlice.js'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { toast } from 'react-toastify'

const ProductScreen = () => {
    
    const qty = 1

    const [isLiked, setIsLiked] = useState(false)
    const [size, setSize] = useState('')

    const { id: productId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)

    const addToCartHandler = () => {

      if(size === ''){
        toast.error('Select a size first.')
      } else {
        dispatch(addToCart({ ...product, qty, size }))
        navigate('/cart')
      }
    }

  return (
    <>
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error }</Message>
      ) : (
        <div className='flex flex-col'>
          <Meta title={product.productDisplayName} />
          <Link className='p-2' to='/'><i className='fa-solid fa-chevron-left'></i></Link>
          <div className='flex flex-col sm:flex-row'>
            <div className='p-4 sm:w-2/3 flex justify-center'>
              <img src={`${process.env.PUBLIC_URL}/images/${product?.imageId}.jpg`} alt={product?.productDisplayName} className='w-auto h-auto max-h-[631px] mb-4'/>
            </div>
            <div className='flex flex-col gap-2 sm:w-1/3 sm:max-w-[400px] justify-center'>
              <h3 className='font-medium'>{product?.productDisplayName}</h3>
              <h2 className='text-xl font-semibold'>{product?.price}€</h2>
              <h3><span className='font-medium'>Color:</span> {product?.baseColour}</h3>
              <div>
                <div className='flex justify-between'>
                  <h3>Size</h3>
                  <h3>Size Guide</h3>
                </div>

                <fieldset aria-label='Choose a size'>
                  <div className='grid grid-cols-4 gap-4'>
                    {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
                      <label key={size} value={size} className='relative flex items-center justify-center rounded-md border px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer text-center'>
                        <input className='sr-only peer' type='radio' name='size-choice' value={size} onChange={(e) => setSize(size)} />
                        <span className="absolute inset-0 rounded-md border-2 border-transparent peer-checked:border-blue-500">{size}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className='flex w-full gap-2 py-4'>
                  <button className='flex-1 bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md' onClick={addToCartHandler}>Add To Cart</button>
                  <button className='border rounded-md p-2 w-[42px] h-[42px]' onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? <i className='fa-solid fa-heart hover:animate-ping'></i> : <i className='fa-regular fa-heart hover:animate-ping'></i>}
                  </button>
                </div>

                <div className='flex flex-col items-center text-sm'>
                  <div className='flex items-center justify-start gap-2 w-full border rounded-t-md px-2 py-1'>
                    <div className='w-1/12 flex justify-center'>
                      <i className='fa-solid fa-truck-fast'></i>
                    </div>
                    <p>Free Shipping</p>
                    <div className='flex-1' />
                    <div className='bg-green-700 text-white rounded-md px-3 py-1'>
                      <p className='text-xs'>FREE</p>  
                    </div>
                  </div>
                  <div className='flex items-center justify-start gap-2 w-full border px-2 py-2'>
                    <div className='w-1/12 flex justify-center'>
                      <i className='fa-solid fa-award'></i>
                    </div>
                    <p>100 Days Money Back</p>
                  </div>
                  <div className='flex items-center justify-start gap-2 w-full border rounded-b-md px-2 py-2'>
                    <div className='w-1/12 flex justify-center'>
                      <i className='fa-solid fa-file-invoice'></i>
                    </div>
                    <p>Pay On Bill</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductScreen