import React,{ useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'
import { logout } from '../../slices/authSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const UserEditScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id: userId } = useParams()

    const [logoutApiCall] = useLogoutMutation()
    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId)
    const [updateUser] = useUpdateUserMutation()

    console.log('User Data: ', user)

    useEffect(() => {
      if (user) {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }, [user])

    const logoutHandler = async () => {
        try{
          await logoutApiCall().unwrap()
          dispatch(logout())
          navigate('/login')
        } catch (err) {
          console.log(err)
        } 
    }

    const submitHandler = async (e) => {
      e.preventDefault()

      try {
          await updateUser({
            userId,
            name,
            email,
            isAdmin
          }).unwrap()

          refetch()

          navigate('/admin/userlist')

      } catch (err) {
          console.log(err?.data?.message || err.error)
      }
    }
  
  return (
    <>
      <div className='flex flex-col gap-4'>
        <Link className='p-2' to='/admin/productlist'><i className='fa-solid fa-chevron-left'></i></Link>
        <div />
      </div>
      <div className='flex flex-col sm:flex-row w-full'>
        <div className='flex sm:flex-col gap-2 overflow-x-auto sm:w-1/5'>

            <Link to='/admin/orderlist'>
            <button className='p-2 sm:rounded-md w-max hover:border-slate-400 sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
                <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center w-max sm:w-[50px] text-xl sm:text-base'>
                    <i className='fa-solid fa-cubes'></i>
                </div>
                <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                    <p>Orders</p>
                </div>
                </div>
            </button>
            </Link>

            <Link to='/admin/userlist'>
                <button className='p-2 sm:rounded-md w-max sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-300 border-b-2 border-slate-400'>
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

            <Link to='/admin/productList'>
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
            <h2 className='text-xl font-semibold my-4'>Edit User</h2>

            { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
              <div className='flex flex-col sm:w-1/2 border rounded-md shadow-md p-2'>
                <form onSubmit={submitHandler} className='flex flex-col gap-4 p-4'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='name' className='text-left pl-1'>Name</label>
                    <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                        id='name'
                        value={name}
                        type='text'
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='name' className='text-left pl-1'>Email</label>
                    <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                        id='email'
                        value={email}
                        type='text'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className='flex justify-center pt-4'>
                    <button type='submit' className='bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md min-w-[200px]'>
                      Update
                    </button>
                  </div>

                </form>
              </div>
            )}

            <div className='h-32 sm:h-64' />
        </div>
      </div>
    </>
  )
}

export default UserEditScreen