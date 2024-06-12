import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const Paginate = ({ pages, page, keyword = '' }) => {

    const { gender } = useParams()

    useEffect(() => {
        console.log('useEffect(gender): ', gender)
    }, [gender])

    return (
        pages > 1 && (
            <div className='flex justify-center items-center gap-8 sm:gap-4 p-8'>
                {page > 1 ? (
                    <Link to={keyword ?
                        (gender ? `/category/${gender}/search/${keyword}/page/${page - 1}` : `/search/${keyword}/page/${page - 1}`) :
                        (gender ? `/category/${gender}/page/${page - 1}` : `/page/${page - 1}`)
                    }>
                        <h2 className='text-xl'>
                            <i className='fa-solid fa-chevron-left'></i>
                        </h2>
                    </Link>
                ) : (
                    <Link>
                        <h2 className='text-xl text-slate-400'>
                            <i className='fa-solid fa-chevron-left'></i>
                        </h2>
                    </Link>
                )}

                <h2 className='text-xl'>
                    Page {page} of {pages}
                </h2>

                {page < pages ? (
                    <Link to={keyword ?
                        (gender ? `/category/${gender}/search/${keyword}/page/${page + 1}` : `/search/${keyword}/page/${page + 1}`) :
                        (gender ? `/category/${gender}/page/${page + 1}` : `/page/${page + 1}`)
                    }>
                        <h2 className='text-xl'>
                            <i className='fa-solid fa-chevron-right'></i>
                        </h2>
                    </Link>
                ) : (
                    <Link>
                        <h2 className='text-xl'>
                            <i className='fa-solid fa-chevron-right text-slate-400'></i>
                        </h2>
                    </Link>
                )}
            </div>
        )
    )
}

export default Paginate
