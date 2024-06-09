import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='flex items-center justify-center sm:justify-start gap-4'>
        <div className='flex items-center justify-center text-sm'>
            { step1 ? (
                <Link to='/register'>
                    <p>Sign In</p>
                </Link>
            ) : (
                <Link disabled>
                    <p>Sign In</p>
                </Link>
            )}
        </div>
        <div className='flex items-center w-max text-xs'>
            { step2 ? (
                <i className='fa-solid fa-chevron-right'></i>
            ) : (
                <i className='fa-solid fa-chevron-right text-slate-300'></i>
            )}
        </div>
        <div className='flex items-center justify-center text-sm'>
            { step2 ? (
                <Link to='/shipping'>
                    <p>Shipping</p>
                </Link>
            ) : (
                <Link disabled>
                    <p className='text-slate-300'>Shipping</p>
                </Link>
            )}
        </div>
        <div className='flex items-center w-max text-xs'>
            { step3 ? (
                <i className='fa-solid fa-chevron-right'></i>
            ) : (
                <i className='fa-solid fa-chevron-right text-slate-300'></i>
            )}
        </div>
        <div className='flex items-center justify-center text-sm'>
            { step3 ? (
                <Link to='/payment'>
                    <p>Payment</p>
                </Link>
            ) : (
                <Link disabled>
                    <p className='text-slate-300'>Payment</p>
                </Link>
            )}
        </div>
        <div className='flex items-center w-max text-xs'>
            { step4 ? (
                <i className='fa-solid fa-chevron-right'></i>
            ) : (
                <i className='fa-solid fa-chevron-right text-slate-300'></i>
            )}
        </div>
        <div className='flex items-center justify-center text-sm'>
            { step4 ? (
                <Link to='/placeorder'>
                    <p>Place Order</p>
                </Link>
            ) : (
                <Link disabled>
                    <p className='text-slate-300'>Place Order</p>
                </Link>
            )}
        </div>
    </div>
  )
}

export default CheckoutSteps