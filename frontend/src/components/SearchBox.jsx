import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SearchBox = () => {

    const navigate = useNavigate()
    const { keyword: urlKeyword, gender } = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {

            gender ? 
                navigate(`/category/${gender}/search/${keyword}`) :
                navigate(`/search/${keyword}`)
            
        } else {

            navigate('/')
        }
    }

    useEffect(() => {
        if  (keyword === '') {
            gender ?
                navigate(`/category/${gender}`) :
                navigate('/')
        }
    },[keyword])

  return (
    <form onSubmit={submitHandler} className='flex items-center gap-2 border border-2 p-2 rounded-lg bg-slate-200 text-slate-600'>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input type='text' onChange={(e) => setKeyword(e.target.value)} placeholder={'Search Products ' + (gender ? 'in ' + `${gender}`.charAt(0).toUpperCase() + `in ${gender}`.slice(4) : ' ')} className='bg-slate-200 w-[250px] outline-none' />
    </form>
  )
}

export default SearchBox