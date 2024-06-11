import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
        <div className='flex justify-center items-center gap-8 sm:gap-4 p-8'>
            { page > 1 ? (
                <Link to={ keyword ? `/search/${keyword}/page/${page - 1}` : `/page/${page - 1}`}>
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

            { page < pages ? (
                <Link to={ keyword ? `/search/${keyword}/page/${page + 1}` : `/page/${page + 1}`}>
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