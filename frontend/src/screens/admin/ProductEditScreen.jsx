import React,{ useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/usersApiSlice'
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../slices/productsApiSlice'
import { logout } from '../../slices/authSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const ProductEditScreen = () => {

    const [price, setPrice] = useState(0)
    const [gender, setGender] = useState('')
    const [masterCategory, setMasterCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [articleType, setArticleType] = useState('')
    const [baseColour, setBaseColour] = useState('')
    const [season, setSeason] = useState('')
    const [year, setYear] = useState('')
    const [usage, setUsage] = useState('')
    const [productDisplayName, setProductDisplayName] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id: productId } = useParams()

    const [logoutApiCall] = useLogoutMutation()

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
    const [updateProduct,{ isLoading: loadingUpdate }] = useUpdateProductMutation()

    /**/ console.log('Product Data: ', product)

    useEffect(() => {
        if (product) {
            setProductDisplayName(product.productDisplayName)
            setPrice(product.price)
            setMasterCategory(product.masterCategory)
            setSubCategory(product.subCategory)
            setArticleType(product.articleType)
            setBaseColour(product.baseColour)
            setGender(product.gender)
            setSeason(product.season)
            setUsage(product.usage)
            setYear(product.year)
        }
    }, [product])

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
            await updateProduct({
                _id: productId,
                imageId: product.imageId,
                productDisplayName,
                price, 
                masterCategory,
                subCategory,
                articleType,
                baseColour,
                gender,
                season,
                usage,
                year
            }).unwrap()

            refetch()

            navigate('/admin/productlist')

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

            <Link to='/admin/productList'>
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
            </Link>

          <div className='hidden sm:flex items-center justify-center mt-4 sm:justify-start'>
            <button className='border border-2 border-slate-600 px-2 py-1 rounded-md w-32 hover:border-slate-400 min-w-[220px]' onClick={logoutHandler}>Logout</button>
          </div>
        </div>
        <div className='flex flex-col justify-center sm:w-4/5 gap-2'>
            <h2 className='text-xl font-semibold my-4'>Edit Product</h2>
          
            { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <div className='flex flex-col sm:w-1/2 border rounded-md shadow-md p-2'>
            <form onSubmit={submitHandler} className='flex flex-col gap-4 p-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor='productDisplayName' className='text-left pl-1'>Name</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='productDisplayName'
                    value={productDisplayName}
                    type='text'
                    placeholder='Name'
                    onChange={(e) => setProductDisplayName(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='price' className='text-left pl-1'>Price [€]</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='price'
                    value={price}
                    type='number'
                    placeholder='Price'
                    onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='masterCategory' className='text-left pl-1'>Category</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='masterCategory'
                    value={masterCategory}
                    type='text'
                    placeholder='Category'
                    onChange={(e) => setMasterCategory(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='subCategory' className='text-left pl-1'>Subcategory</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='subCategory'
                    value={subCategory}
                    type='text'
                    placeholder='Subcategory'
                    onChange={(e) => setSubCategory(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='articleType' className='text-left pl-1'>Article Type</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='articleType'
                    value={articleType}
                    type='text'
                    placeholder='Article Type'
                    onChange={(e) => setArticleType(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='baseColour' className='text-left pl-1'>Base Colour</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='baseColour'
                    value={baseColour}
                    type='text'
                    placeholder='Base Colour'
                    onChange={(e) => setBaseColour(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='gender' className='text-left pl-1'>Gender</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='gender'
                    value={gender}
                    type='text'
                    placeholder='Gender'
                    onChange={(e) => setGender(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='season' className='text-left pl-1'>Season</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='season'
                    value={season}
                    type='text'
                    placeholder='Season'
                    onChange={(e) => setSeason(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='usage' className='text-left pl-1'>Usage</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='usage'
                    value={usage}
                    type='text'
                    placeholder='Usage'
                    onChange={(e) => setUsage(e.target.value)} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='year' className='text-left pl-1'>Year</label>
                <input className='border p-2 bg-slate-100 outline-none rounded-md w-full'
                    id='year'
                    value={year}
                    type='text'
                    placeholder='Year'
                    onChange={(e) => setYear(e.target.value)} />
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

export default ProductEditScreen