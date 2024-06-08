import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adjustQty } from '../slices/cartSlice'

const CartScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const adjustQtyHandler = (id, operator) => {
        dispatch(adjustQty({ id, operator }));
    };

  return (
    <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col md:w-2/3 border shadow-md rounded-md p-4'>
            <div className='flex justify-between pb-4'>
                <h2 className='font-semibold'>Delivery</h2>
                <div className='bg-slate-200 rounded-xl px-2'>
                    Di, 11.06. - Do, 13.06.
                </div>
            </div>
            { cartItems.map((item) => (
                <div className='flex mb-6 p-2'>
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
                        <button className='hover:text-slate-600'>
                            <i className='fa-solid fa-trash'></i>
                        </button>
                        <h2 className='text-xl font-semibold logo'>{item.price}€</h2>
                    </div>
                </div>
            ))}
            <hr />
            <div className='flex items-center gap-2 pt-2 text-slate-400'>
                <i className='fa-solid fa-circle-exclamation'></i>
                <p>PRODUCTS ARE NOT RESERVED</p>
            </div>
        </div>
        <div className='flex flex-col gap-2 md:w-1/3 h-max border shadow-md rounded-md p-4'>
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
            <hr />
            <div className='flex justify-between'>
                <h2 className='text-xl font-bold'>Total</h2>
                <h2 className='text-xl font-semibold logo'>{cart.totalPrice}€</h2>
            </div>
            <button className='flex-1 bg-zinc-950 rounded-md text-white p-2 duration-300 hover:-translate-y-[2px] hover:shadow-md'>Proceed To Checkout</button>
        </div>
    </div>
  )
}

export default CartScreen