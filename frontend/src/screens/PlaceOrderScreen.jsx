import React,{ useEffect } from 'react'
import { Link, UNSAFE_NavigationContext, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'

const PlaceOrderScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const auth = useSelector((state) => state.auth)

    const { cartItems, shippingAddress } = cart
    const { userInfo } = auth

    const [createOrder,{ isLoading, error }] = useCreateOrderMutation()

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress, navigate])

    const placeOrderHandler = async () => {

        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <div className='flex flex-col sm:flex-row w-full'>
            

            {/* ONLY VISIBLE ON MOBILE SCREEN --> */}

            <div className='flex flex-col sm:hidden border rounded-lg bg-slate-50 p-6 my-6 shadow-md'>
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
                                        <p>Quantity: {item.qty}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between items-end'>
                                    <div />
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

            {/* <-- ONLY VISIBLE ON MOBILE SCREEN */}


            <div className='flex flex-col sm:w-1/2'>
                <h1 className='text-xl font-semibold my-4'>Shipping</h1>
                <div className='flex flex-col border border-2 border-slate-900 rounded-md sm:w-2/3 p-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm text-slate-500'>Shipping Address</p>
                        <Link to='/shipping'>
                            <button className='text-sm text-blue-500 hover:text-blue-700'>Edit</button>
                        </Link>
                    </div>
                    <div className='flex-col'>
                        <p>{shippingAddress.address}</p>
                        <p>{shippingAddress.postalCode} {shippingAddress.city}</p>
                        <p>{shippingAddress.country}</p>
                    </div>
                </div>
                
                <h1 className='text-xl font-semibold my-4'>Payment</h1>
                <div className='flex flex-col border border-2 border-slate-900 rounded-md sm:w-2/3 p-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm text-slate-500'>Payment Method</p>
                        <Link to='/payment'>
                            <button className='text-sm text-blue-500 hover:text-blue-700'>Edit</button>
                        </Link>
                    </div>
                    <p>{cart.paymentMethod}</p>
                </div>
                <div className='flex justify-center sm:w-2/3 mt-8'>
                    <button className='bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md min-w-[200px]'
                            onClick={placeOrderHandler}>
                        Place Order
                    </button>
                </div>
            </div>

            <div className='hidden sm:flex sm:flex-col sm:w-1/2 border rounded-lg bg-slate-50 p-6 shadow-md'>
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
                                        <p>{item.size}</p>
                                        <p>Quantity: {item.qty}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between items-end'>
                                    <div />
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

export default PlaceOrderScreen