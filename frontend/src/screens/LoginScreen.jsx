import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginScreen = () => {

    const [isRegistered, setIsRegistered] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading, error }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login ({ email, password }).unwrap()
            dispatch(setCredentials({...res, }))
            navigate(redirect)
        } catch (err) {
            console.log(err?.data.message || err?.error)
        }
    }

  return (
    <>
        {isRegistered ? (
            <>
                <div className='flex flex-col gap-4'>
                    <Link className='p-2' to='/'><i className='fa-solid fa-chevron-left'></i></Link>
                <div />
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='flex justify-center gap-4'>
                        <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400' onClick={() => setIsRegistered(false)}>Register</button>
                        <button className='border border-2 border-slate-200 px-2 py-1 rounded-md w-32' disabled>Login</button>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <form onSubmit={submitHandler}>
                            <div>
                                <input className='border p-2 bg-slate-100 outline-none rounded-md m-2 min-w-[270px]' 
                                    value={email} 
                                    type='email' 
                                    placeholder='Email' 
                                    onChange={(e) => setEmail(e.target.value)} />
                                <input className='border p-2 bg-slate-100 outline-none rounded-md m-2 min-w-[270px]' 
                                    value={password} 
                                    type='password' 
                                    placeholder='Password' 
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            { error && <Message variant='danger'>Your email or password is wrong. Please try again.</Message>}
                            <div className='flex justify-center p-4'>
                                <button className='bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md min-w-[200px]' disabled={isLoading}>Login</button>
                            </div>
                            { isLoading && <Loader /> }
                        </form>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className='flex flex-col gap-4'>
                    <Link className='p-2' to='/'><i className='fa-solid fa-chevron-left'></i></Link>
                <div />
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='flex justify-center gap-4'>
                        <button className='border border-2 border-slate-200 px-2 py-1 rounded-md w-32' disabled>Register</button>
                        <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400' onClick={() => setIsRegistered(true)}>Login</button>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <form>
                            <div>
                                <input className='border p-2 bg-slate-100 outline-none rounded-md m-2 min-w-[270px]' 
                                    value={firstName} 
                                    type='text' 
                                    placeholder='First Name' 
                                    onChange={(e) => setFirstName(e.target.value)} />
                                <input className='border p-2 bg-slate-100 outline-none rounded-md m-2 min-w-[270px]' 
                                    value={lastName} 
                                    type='text' 
                                    placeholder='Last Name' 
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>
                                <input className='border p-2 bg-slate-100 outline-none rounded-md m-2 min-w-[270px]' 
                                    value={email} 
                                    type='email' 
                                    placeholder='Email' 
                                    onChange={(e) => setEmail(e.target.value)} />
                                <input className='border p-2 bg-slate-100 outline-none rounded-md m-2 min-w-[270px]' 
                                    value={password} 
                                    type='password' 
                                    placeholder='Password' 
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            { error && <Message variant='danger'>{error?.data?.message || error?.error}</Message>}
                            <div className='flex justify-center p-4'>
                                <button className='bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md min-w-[200px]' disabled={isLoading}>Sign up</button>
                            </div>
                            { isLoading && <Loader /> }
                        </form>
                    </div>
                </div>
            </>
        )}

    </>
  )
}

export default LoginScreen