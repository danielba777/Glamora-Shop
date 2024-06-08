import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const ProfileScreen = () => {

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
      <div>
        <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400 min-w-[200px]' onClick={logoutHandler}>Logout</button>
      </div>
    </>
  )
}

export default ProfileScreen