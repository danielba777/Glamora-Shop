import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'
import { logout } from '../../slices/authSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const ProductListScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()
  const { data: products, isLoading, error, refetch } = useGetProductsQuery({ keyword: 'search term', pageNumber: 1 });
  const [createProduct,{ isLoading: loadingCreate }] = useCreateProductMutation()
  const [deleteProduct,{ isLoading: loadingDelete }] = useDeleteProductMutation()

  const logoutHandler = async () => {
    try{
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.log(err)
    } 
  }

  const createProductHandler = async () => {
    if(window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct()
        refetch()
      } catch (err) {
        console.log(err?.data?.message || err.error)
      }
    }
  }

  const deleteHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        refetch()
      } catch (err) {
        console.log(err?.data?.message || err.error)
      }
    }
  }

  if (isLoading) return <Loader />
  if (error) return <Message variant='danger'>{error}</Message>

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Link className='p-2' to='/'><i className='fa-solid fa-chevron-left'></i></Link>
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

          <button className='p-2 sm:rounded-md w-max sm:w-[220px] sm:h-[50px] sm:border sm:border-2 sm:border-slate-300 border-b-2 border-slate-400'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center w-max sm:w-[50px] text-xl sm:text-base'>
                <i className='fa-solid fa-tags'></i>
              </div>
              <div className='flex items-center justify-start text-xl sm:text-base w-max'>
                <p>Products</p>
              </div>
            </div>
          </button>

          <div className='hidden sm:flex items-center justify-center mt-4 sm:justify-start'>
            <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400 min-w-[220px]' onClick={logoutHandler}>Logout</button>
          </div>
        </div>
        <div className='flex flex-col justify-center sm:w-4/5 gap-2'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold my-4'>All Products</h2>
            <button className='flex items-center gap-1 rounded-md w-max h-max py-1 px-2 border border-2 border-slate-600 hover:border-slate-400 hover:text-slate-400'
                    onClick={createProductHandler}>
              <i className='fa-regular fa-square-plus'></i> 
              <p>Create Product</p>
            </button>
          </div>
          
          { products ? (
            <div className='overflow-x-auto'>
                <table className='text-center w-full'>
                    <thead>
                        <tr className='border-b-4'>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>SUBCATEGORY</th>
                            <th>SEASON</th>
                            <th>USAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className='border-b-2 hover:bg-slate-200 cursor-pointer'>
                                <td>{product._id}</td>
                                <td>{product.productDisplayName}</td>
                                <td>{product.price}€</td>
                                <td>{product.masterCategory}</td>
                                <td>{product.subCategory}</td>
                                <td>{product.season}</td>
                                <td>{product.usage}</td>
                                <td className='hover:text-slate-400'>
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <i className='fa-regular fa-pen-to-square p-2'></i>
                                    </Link>
                                </td>
                                <td className='hover:text-slate-400' onClick={() => deleteHandler(product._id)}><i className='fa-regular fa-trash-can p-2'></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <Message variant='danger'>No Products Found</Message>
        )}

          <div className='h-32 sm:h-64' />
        </div>
      </div>
    </>
  )
}

export default ProductListScreen