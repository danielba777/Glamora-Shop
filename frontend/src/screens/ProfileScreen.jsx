import React,{ useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const ProfileScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const [logoutApiCall] = useLogoutMutation()

  const [updateProfile, { isLoading:loadingUpdateProfile }] = useProfileMutation()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo.name, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password do not match')
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        alert('Profile updated successfully!')
      } catch (err) {
        alert(err?.data?.message || err.err)
      }
    }
  }

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
                <i className='fa-solid fa-lock'></i>
              </div>
              <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                <p>Profile & Security</p>
              </div>
            </div>
          </button>
          <Link to='/myorders'>
            <button className='p-2 rounded-md w-32 hover:border-slate-400 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
              <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center sm:w-[50px] text-xl sm:text-base w-max'>
                  <i className='fa-solid fa-cart-flatbed'></i>
                </div>
                <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                  <p>My orders</p>
                </div>
              </div>
            </button>
          </Link>
          <button className='p-2 rounded-md w-32 hover:border-slate-400 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center sm:w-[50px] text-xl sm:text-base w-max'>
                <i className='fa-solid fa-gear'></i>
              </div>
              <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                <p>Settings</p>
              </div>
            </div>
          </button>
          <button className='p-2 rounded-md w-32 hover:border-slate-400 w-full sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-600'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center sm:w-[50px] text-xl sm:text-base w-max'>
                <i className='fa-solid fa-comments'></i>
              </div>
              <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                <p>Help</p>
              </div>
            </div>
          </button>
          <div className='hidden sm:flex items-center justify-center mt-4 sm:justify-start'>
            <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400 min-w-[220px]' onClick={logoutHandler}>Logout</button>
          </div>
        </div>
        <div className='flex flex-col justify-center sm:w-4/5 gap-2'>
          <h2 className='text-xl font-semibold my-4'>Profile & Security</h2>
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
                <label htmlFor='email' className='text-left pl-1'>Email</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='email'
                    value={email}
                    type='email'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='password' className='text-left pl-1'>Password</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='password'
                    value={password}
                    type='password'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='confirmPassword' className='text-left pl-1'>Confirm Password</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='confirmPassword'
                    value={confirmPassword}
                    type='password'
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>

              <div className='flex justify-center pt-4'>
                <button type='submit' className='bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md min-w-[200px]'>
                  Update
                </button>
              </div>

            </form>
          </div>
          { loadingUpdateProfile && <Loader /> }
          <div className='h-32 sm:h-64' />
        </div>
      </div>
    </>
  )
}

export default ProfileScreen