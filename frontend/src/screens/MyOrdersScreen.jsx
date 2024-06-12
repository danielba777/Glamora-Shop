import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const MyOrdersScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const [logoutApiCall] = useLogoutMutation()

    const { data: orders, isLoading, error } = useGetMyOrdersQuery()
    
    console.log('Orders: ', orders)
  
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
        <div className='flex flex-col sm:flex-row w-full'>
            <div className='flex overflow-x-auto sm:flex-col gap-2 sm:w-1/5'>
                <Link to='/profile'>
                    <button className='p-2 rounded-md w-32 hover:border-slate-400 w-max sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
                        <div className='flex items-center gap-2'>
                            <div className='flex justify-center items-center w-max sm:w-[50px] text-xl sm:text-base'>
                            <i className='fa-solid fa-lock'></i>
                            </div>
                            <div className='flex items-center justify-start text-xl sm:text-base'>
                            <p>Profile & Security</p>
                            </div>
                        </div>
                    </button>
                </Link>
                <button className='p-2 sm:rounded-md w-32 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-300 border-b-2 border-slate-400'>
                    <div className='flex items-center gap-2'>
                        <div className='flex justify-center items-center w-max sm:w-[50px] text-xl sm:text-base'>
                            <i className='fa-solid fa-cart-flatbed'></i>
                        </div>
                        <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                            <p>My orders</p>
                        </div>
                    </div>
                </button>
                <div className='hidden sm:flex items-center justify-center mt-4 sm:justify-start'>
                    <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400 min-w-[220px]' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div className='sm:w-4/5'>
                <h2 className='text-xl font-semibold my-4'>My Orders</h2>
                { isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message>{error?.data.message || error?.error }</Message>
                ) : (
                    <div className='flex flex-col gap-4'>
                        {orders.map((order, index) => (
                            <div className='flex-col' key={order._id}>
                                <div className='flex-col'>
                                    <div className='flex justify-between'>
                                        <h2 className='font-semibold text-lg'>Order #{order._id}</h2>
                                        <Link to={`/order/${order._id}`} className='hidden sm:block'>
                                            <h2 className='font-semibold text-lg hover:text-slate-600'>Show Order Details</h2>
                                        </Link>
                                    </div>
                                    <div className='flex flex-col sm:flex-row sm:gap-8 mb-4'>
                                        <h3><span className='font-semibold'>Date:</span> {order.createdAt.substring(8,10) + '.' + order.createdAt.substring(5,7) + '.' + order.createdAt.substring(0,4) }</h3>
                                        <h3><span className='font-semibold'>Amount:</span> {order.totalPrice}€</h3>
                                        <div className='flex gap-1 items-center sm:justify-center'>
                                            <h3><span className='font-semibold'>Paid:</span> </h3>
                                            { order.isPaid ? 
                                                order.paidAt.substring(8,10) + '.' + order.paidAt.substring(5,7) + '.' + order.paidAt.substring(0,4) : 
                                                <i className='fa-solid fa-xmark text-red-500'></i>
                                            }
                                        </div>
                                        <div className='flex gap-1 items-center sm:justify-center'>
                                            <h3><span className='font-semibold'>Delivered:</span> </h3>
                                            { order.isDelivered ? 
                                                order.deliveredAt.substring(8,10) + '.' + order.deliveredAt.substring(5,7) + '.' + order.deliveredAt.substring(0,4) : 
                                                <i className='fa-solid fa-xmark text-red-500'></i>}
                                        </div>
                                    </div>
                                    <div className='flex overflow-x-auto space-x-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:mb-4'>
                                        {order.orderItems.map((item) => (
                                            <Link to={`/product/${item.product}`} key={item.product} className='flex-shrink-0 w-[45%] sm:w-auto'>
                                            <div className='border rounded-lg shadow-md flex flex-col h-full'>
                                                <img src={`${process.env.PUBLIC_URL}/images/${item.imageId}.jpg`} alt={item.productDisplayName} className='w-full h-auto mb-4'/>
                                                <div className='p-4 flex-grow flex items-center'>
                                                {item.productDisplayName}
                                                </div>
                                            </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className='flex justify-center pt-4 sm:hidden'>
                                        <Link to={`/order/${order._id}`} >
                                            <button type='submit' className='p-2 duration-300 underline font-semibold'>
                                                Show Order Details
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                                
                                {index !== orders.length - 1 && <hr className='border-t-2 border-gray-300 my-4' />}
                            </div>
                        ))}
                    </div>
                )}
                <div className='h-32 sm:h-64' />
            </div>
        </div>
    </>
  )
}

export default MyOrdersScreen