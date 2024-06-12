import React from 'react'
import { Link } from 'react-router-dom'

const WishlistScreen = () => {
  return (
    <div>
        <div className='flex flex-col gap-4'>
            <Link className='p-2' to='/'><i className='fa-solid fa-chevron-left'></i></Link>
            <div />
        </div>
    </div>
  )
}

export default WishlistScreen