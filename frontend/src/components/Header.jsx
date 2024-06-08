import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <header className='flex flex-col'>
      
      <div className='flex justify-between items-center p-4 text-zinc-950'>
        <div>
          <Link to='/'>
            <h1 className='text-xl hover:text-zinc-600 cursor-pointer logo'>Glamora</h1>
          </Link>
        </div>
        <div className='flex gap-2 sm:gap-4'>
          <Link to='/wishlist'>
            <button className='text-xl hover:text-zinc-600 cursor-pointer'>
              <div className='relative h-[30px] w-[30px]'>
                <i className='fa-solid fa-heart'></i>
              </div>
            </button>
          </Link>
          { userInfo ? (
            <Link to='/profile'>
              <button className='text-xl hover:text-zinc-600 cursor-pointer'>
                <div className='relative h-[30px] w-[30px]'>
                  <i className='fa-solid fa-user'></i>
                </div>
              </button>
            </Link>
          ) : (
            <Link to='/login'>
              <button className='text-xl hover:text-zinc-600 cursor-pointer'>
                <div className='relative h-[30px] w-[30px]'>
                  <i className='fa-solid fa-user'></i>
                </div>
              </button>
            </Link>
          ) }
          <Link to='/cart'>
            <button className='text-xl hover:text-zinc-600 cursor-pointer'>
              <div className='flex items-center gap-1'>
                <div className='relative h-[30px] w-[30px]'>
                  <i className='fa-solid fa-cart-shopping'></i>
                  { 
                    cartItems.length > 0 && (
                      <div className='rounded-lg bg-red-500 h-[10px] w-[10px] absolute top-0 right-0' />
                    )
                  }
                </div>
                {
                  cartItems.length > 0 && (
                    <div>
                      { cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </div>
                  )
                }
              </div>
            </button>
          </Link>
        </div>
      </div>

      <div className='hidden sm:flex justify-between items-center py-2 px-4 bg-zinc-950 text-white'>
        <button></button>
        <button className='flex gap-2 items-center'>
          <i className='fa-solid fa-truck-fast'></i>
          <p>Free Shipping</p>
        </button>
        <button className='flex gap-2 items-center'>
          <i className='fa-solid fa-award'></i>
          <p>100 Days Money Back</p>
        </button>
        <button className='flex gap-2 items-center'>
          <i className='fa-solid fa-file-invoice'></i>
          <p>Pay On Bill</p>
        </button>
        <button></button>
      </div>
      
      <div className='block sm:hidden relative h-9 overflow-hidden bg-zinc-950 text-white'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 flex items-center justify-center animate-slide-1'>
            <i className='fa-solid fa-truck-fast'></i>
            <p className='ml-2'>Free Shipping</p>
          </div>
          <div className='absolute inset-0 flex items-center justify-center animate-slide-2'>
            <i className='fa-solid fa-award'></i>
            <p className='ml-2'>100 Days Money Back</p>
          </div>
          <div className='absolute inset-0 flex items-center justify-center animate-slide-3'>
            <i className='fa-solid fa-file-invoice'></i>
            <p className='ml-2'>Pay On Bill</p>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header