import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const MyOrdersScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const [logoutApiCall] = useLogoutMutation()
  
    const logoutHandler = async () => {
      try{
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/login')
      } catch (err) {
        console.log(err)
      } 
    }

  return (
    <>
        <div className='flex flex-col gap-4'>
        <Link className='p-2' to='/'><i className='fa-solid fa-chevron-left'></i></Link>
        <div />
        </div>
        <div className='flex w-full'>
        <div className='flex flex-col gap-2 w-1/5'>
            <Link to='/profile'>
                <button className='p-2 rounded-md w-32 hover:border-slate-400 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
                    <div className='flex items-center'>
                        <div className='flex justify-center items-center w-[50px] text-xl sm:text-base'>
                        <i className='fa-solid fa-lock'></i>
                        </div>
                        <div className='flex items-center justify-start text-xl sm:text-base'>
                        <p>Profile & Security</p>
                        </div>
                    </div>
                </button>
            </Link>
            <button className='p-2 rounded-md w-32 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-300'>
                <div className='flex items-center'>
                    <div className='flex justify-center items-center w-[50px] text-xl sm:text-base'>
                    <i className='fa-solid fa-cart-flatbed'></i>
                    </div>
                    <div className='flex items-center justify-start text-xl sm:text-base'>
                    <p>Your orders</p>
                    </div>
                </div>
            </button>
            <button className='p-2 rounded-md w-32 hover:border-slate-400 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
                <div className='flex items-center'>
                    <div className='flex justify-center items-center w-[50px] text-xl sm:text-base'>
                    <i className='fa-solid fa-gear'></i>
                    </div>
                    <div className='flex items-center justify-start text-xl sm:text-base'>
                    <p>Settings</p>
                    </div>
                </div>
            </button>
            <button className='p-2 rounded-md w-32 hover:border-slate-400 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
                <div className='flex items-center'>
                    <div className='flex justify-center items-center w-[50px] text-xl sm:text-base'>
                    <i className='fa-solid fa-comments'></i>
                    </div>
                    <div className='flex items-center justify-start text-xl sm:text-base'>
                    <p>Help</p>
                    </div>
                </div>
            </button>
            <div className='flex items-center justify-center mt-4 sm:justify-start'>
                <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400 min-w-[220px]' onClick={logoutHandler}>Logout</button>
            </div>
        </div>
        <div className='w-4/5'>
            <h2>My Orders</h2>
        </div>
        </div>
    </>
  )
}

export default MyOrdersScreen