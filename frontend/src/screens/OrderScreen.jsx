import React,{ useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer  } from '@paypal/react-paypal-js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice'
import { addDecimals } from '../utils/cartUtils'
import { toast } from 'react-toastify'

const OrderScreen = () => {

    const { id: orderId } = useParams()
    const { userInfo } = useSelector((state) => state.auth);

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation()
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery(orderId)

    useEffect(() => {
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'EUR',
                    }
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            if (order && !order.isPaid) {
                if(!window.paypal){
                    loadPayPalScript()
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details })
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        })
    }

    function onError(err) {
        toast.error(err.message);
    }

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => { return orderId })
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId)
            console.log('DELIVER ORDER AWAIT')
            refetch()
        } catch (err) {
            console.log(err?.data?.message || err.message)
        }
    }

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <Message variant='danger'>{error?.data?.message}</Message>
    }

    if (!order) {
        return <Message variant='danger'>Order not found</Message>
    }

    const { orderItems, shippingAddress, user } = order

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data.message}</Message>
  ) : (
    <>
        <div className='flex flex-col gap-4'>
            <Link className='p-2' to='/'><i className='fa-solid fa-chevron-left'></i></Link>
            <div />
        </div>
        <div className='flex flex-col sm:flex-row w-full'>
            <div className='flex flex-col sm:w-2/3'>
                <h1 className='text-xl text-slate-600'>Order #{order._id}</h1>
                <h1 className='text-xl font-semibold my-4'>Shipping</h1>
                <div className='flex flex-col border border-2 border-slate-900 rounded-md sm:w-2/3 p-2'>
                    <div className='flex justify-start'>
                        <p className='text-sm text-slate-500'>To</p>
                    </div>
                    <div className='flex-col mb-2'>
                        <p>{user.name}</p>
                    </div>
                    <div className='flex justify-start'>
                        <p className='text-sm text-slate-500'>Shipping Address</p>
                    </div>
                    <div className='flex-col'>
                        <p>{shippingAddress.address}</p>
                        <p>{shippingAddress.postalCode} {shippingAddress.city}</p>
                        <p>{shippingAddress.country}</p>
                    </div>
                </div>
                <div className='sm:w-2/3 mt-2'>
                    {order.isDelivered ? (
                        <Message variant='success'>Delivered on: {order.deliveredAt.substring(8,10) + '.' + order.deliveredAt.substring(5,7) + '.' + order.deliveredAt.substring(0,4) }</Message>
                    ) : (
                        <Message variant='danger'>Not Delivered</Message>
                    )}
                </div>
                <h1 className='text-xl font-semibold my-4'>Payment Method</h1>
                <div className='flex flex-col border border-2 border-slate-900 rounded-md sm:w-2/3 p-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm text-slate-500'>Payment Method</p>
                    </div>
                    <p>{order.paymentMethod}</p>
                </div>
                <div className='sm:w-2/3 mt-2'>
                    {order.isPaid ? (
                        <Message variant='success'>Paid on: {order.paidAt.substring(8,10) + '.' + order.paidAt.substring(5,7) + '.' + order.paidAt.substring(0,4) }</Message>
                    ) : (
                        <Message variant='danger'>Not Paid</Message>
                    )}
                </div>
                <div className='sm:w-2/3'>
                    <h2 className='text-xl font-semibold mb-4 mt-6'>Order Summary</h2>
                    <div className='flex justify-between pb-4'>
                            <h2 className='font-semibold'>Delivery</h2>
                            <div className='bg-slate-200 rounded-xl px-2'>
                                Di, 11.06. - Do, 13.06.
                            </div>
                    </div>
                    <div>
                        { orderItems.map((item) => (
                                <div className='flex mb-6 bg-white p-4 rounded-lg border' key={item._id}>
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
                </div>
            </div>
            <div className='flex flex-col sm:w-1/3 h-max border rounded-lg bg-slate-50 p-6 shadow-md'>
                <div className='flex flex-col gap-2'>
                    <h2 className='hidden sm:block text-xl font-semibold mb-2'>Order Summary</h2>
                    <div className='flex justify-between text-md font-semibold'>
                        <h2>Items</h2>
                        <h2 className='logo'>{addDecimals(order.itemsPrice)}€</h2>
                    </div>
                    <div className='flex justify-between text-md font-semibold'>
                        <h2>Tax (19%)</h2>
                        <h2 className='logo'>{addDecimals(order.taxPrice)}€</h2>
                    </div>
                    <div className='flex justify-between text-md font-semibold'>
                        <h2>Shipping</h2>
                        <h2 className='logo'>{addDecimals(order.shippingPrice)}€</h2>
                    </div>
                    <hr className='my-2' />
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-bold'>Total</h2>
                        <h2 className='text-xl font-semibold logo'>{addDecimals(order.totalPrice)}€</h2>
                    </div>
                </div>
                {isPending ? (
                    <Loader />
                ) : (
                    <div className='mt-6'>
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                    </div>
                )}
                
                { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <div className='flex flex-col gap-4'>
                        <hr className='border-t-4 border-slate-400' />
                        <button className='px-1 rounded-md w-full h-[45px] border border-2 border-slate-600 my-1 hover:border-slate-400 hover:text-slate-400'
                                onClick={deliverOrderHandler}>
                            Mark as delivered
                        </button>
                    </div>
                )}

            </div>
            
        </div>
        <div className='h-32 sm:h-64' />
    </>
  )
}

export default OrderScreen