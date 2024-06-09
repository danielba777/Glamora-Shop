import React,{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { adjustQty, removeFromCart, saveShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentScreen = () => {

    const cart = useSelector((state) => state.cart)
    const auth = useSelector((state) => state.auth)

    const { cartItems, shippingAddress } = cart
    const { userInfo } = auth

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const adjustQtyHandler = (id, operator) => {
        dispatch(adjustQty({ id, operator }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart({ id }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 />
        <div className='flex w-full'>
            <div className='flex flex-col w-full sm:w-1/2'>
                <h1 className='text-xl font-semibold my-4'>Payment Information</h1>
                <form className='flex flex-col mt-6 sm:w-2/3' onSubmit={submitHandler}>
                    <div className='border border-2 border-slate-900 rounded-md p-2'>
                        <label className='flex gap-2 cursor-pointer'>
                                <input type='radio' value='PayPal' checked={paymentMethod === 'PayPal'} onSelect={() => setPaymentMethod('PayPal')} />
                                <p>PayPal or Credit Card</p>
                        </label>
                    </div> 
                
                    <div className='flex justify-center mt-8'>
                        <button className='bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md min-w-[200px]'>
                            Continue
                        </button>
                    </div>
                </form>
            </div>
            
            <div className='hidden sm:flex sm:flex-col w-1/2 border rounded-lg bg-slate-50 p-6 shadow-md'>
                <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
                <div className='flex justify-between pb-4'>
                        <h2 className='font-semibold'>Delivery</h2>
                        <div className='bg-slate-200 rounded-xl px-2'>
                            Di, 11.06. - Do, 13.06.
                        </div>
                </div>
                <div>
                    { cartItems.map((item) => (
                            <div className='flex mb-6 bg-white p-4 rounded-lg' key={item._id}>
                                <img src={`${process.env.PUBLIC_URL}/images/${item?.imageId}.jpg`} alt={item?.productDisplayName} className='h-[150px]'/>
                                <div className='flex flex-col justify-start flex-1 justify-between'>
                                    <div className='flex flex-col'>
                                        <h3 className='text-md font-semibold'>{item.productDisplayName}</h3>
                                        <p>{item.articleType}</p>
                                        <p>{item.baseColour}</p>
                                    </div>
                                    <div className='flex justify-between w-max min-w-[110px] gap-6 border rounded-md px-2'>
                                        <button className='hover:text-slate-400' onClick={() => adjustQtyHandler(item._id, '--')}><i className='fa-solid fa-minus'></i></button>
                                        <p className='text-lg'>{item.qty}</p>
                                        <button className='hover:text-slate-400' onClick={() => adjustQtyHandler(item._id, '++')}><i className='fa-solid fa-plus'></i></button>
                                    </div>  
                                </div>
                                <div className='flex flex-col justify-between items-end'>
                                    <button className='hover:text-slate-600' onClick={() => removeFromCartHandler(item._id)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                    <h2 className='text-xl font-semibold logo'>{item.price}€</h2>
                                </div>
                            </div>
                    ))}
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between text-md font-semibold'>
                        <h2>Items</h2>
                        <h2 className='logo'>{cart.itemsPrice}€</h2>
                    </div>
                    <div className='flex justify-between text-md font-semibold'>
                        <h2>Tax (19%)</h2>
                        <h2 className='logo'>{cart.taxPrice}€</h2>
                    </div>
                    <div className='flex justify-between text-md font-semibold'>
                        <h2>Shipping</h2>
                        <h2 className='logo'>{cart.shippingPrice}€</h2>
                    </div>
                    <hr className='my-2' />
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-bold'>Total</h2>
                        <h2 className='text-xl font-semibold logo'>{cart.totalPrice}€</h2>
                    </div>
                </div>  
            </div>
        </div>
        <div className='h-32 sm:h-64' />
    </>
  )
}

export default PaymentScreen