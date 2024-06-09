import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adjustQty, removeFromCart, saveShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart)

    const { cartItems, shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adjustQtyHandler = (id, operator) => {
        dispatch(adjustQty({ id, operator }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart({ id }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

  return (
    <>  
        <CheckoutSteps step1 step2 />

        <div className='flex justify-center items-start w-full'>
            <div className='flex flex-col w-full sm:w-1/2'>
                <h1 className='text-xl font-semibold my-4'>Shipping information</h1>
                <form onSubmit={submitHandler} className='flex flex-col space-y-4 w-full sm:w-2/3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='address' className='text-left'>Address</label>
                        <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                            id='address'
                            value={address}
                            type='text'
                            placeholder='Address'
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor='city' className='text-left'>City</label>
                        <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                            id='city'
                            value={city}
                            type='text'
                            placeholder='City'
                            onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor='postalCode' className='text-left'>Postal Code</label>
                        <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                            id='postalCode'
                            value={postalCode}
                            type='text'
                            placeholder='Postal Code'
                            onChange={(e) => setPostalCode(e.target.value)} />
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor='country' className='text-left'>Country</label>
                        <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                            id='country'
                            value={country}
                            type='text'
                            placeholder='Country'
                            onChange={(e) => setCountry(e.target.value)} />
                    </div>

                    <div className='flex justify-center pt-4'>
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

export default ShippingScreen