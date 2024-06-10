import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'
import { logout } from '../../slices/authSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const OrderListScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  console.log('Orders Data: ', orders)

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
        <div className='flex sm:flex-col gap-2 overflow-x-auto sm:w-1/5'>

          <button className='p-2 sm:rounded-md w-max sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-300 border-b-2 border-slate-400'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center w-max sm:w-[50px] text-xl sm:text-base'>
                <i className='fa-solid fa-cubes'></i>
              </div>
              <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                <p>Orders</p>
              </div>
            </div>
          </button>

          <Link to='/admin/userlist'>
            <button className='p-2 sm:rounded-md w-max hover:border-slate-400 sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
              <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center w-max sm:w-[50px] text-xl sm:text-base'>
                  <i className='fa-solid fa-users'></i>
                </div>
                <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                  <p>Users</p>
                </div>
              </div>
            </button>
          </Link>

          <Link to='/admin/productlist'>
            <button className='p-2 sm:rounded-md w-max hover:border-slate-400 sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
              <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center w-max sm:w-[50px] text-xl sm:text-base'>
                  <i className='fa-solid fa-tags'></i>
                </div>
                <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                  <p>Products</p>
                </div>
              </div>
            </button>
          </Link>

          <div className='hidden sm:flex items-center justify-center mt-4 sm:justify-start'>
            <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400 min-w-[220px]' onClick={logoutHandler}>Logout</button>
          </div>
        </div>
        <div className='flex flex-col justify-center sm:w-4/5 gap-2'>
          <h2 className='text-xl font-semibold my-4'>All Orders</h2>

          { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <table className='text-center'>
              <thead>
                <tr className='border-b-4'>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                { orders.map((order) =>(
                  <tr key={order._id} className='border-b-2 hover:bg-slate-200 cursor-pointer'>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(8,10) + '.' + order.createdAt.substring(5,7) + '.' + order.createdAt.substring(0,4)}</td>
                    <td>{order.totalPrice}€</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(8,10) + '.' + order.paidAt.substring(5,7) + '.' + order.paidAt.substring(0,4)
                      ) : (
                        <i className='fa-solid fa-xmark text-red-500'></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(8,10) + '.' + order.deliveredAt.substring(5,7) + '.' + order.deliveredAt.substring(0,4)
                      ) : (
                        <i className='fa-solid fa-xmark text-red-500'></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button className='px-1 rounded-md w-max border border-2 border-slate-600 my-1 hover:border-slate-400'>Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className='h-32 sm:h-64' />
        </div>
      </div>
    </>
  )
}

export default OrderListScreen