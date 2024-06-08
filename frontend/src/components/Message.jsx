import React from 'react'

const Message = ({ variant, children }) => {

  return (
    <>
        { variant == 'danger' ? (
            <div className='bg-rose-200 p-4 rounded-md text-rose-600 border-2 border-rose-300'>
                {children}
            </div>
        ) : (

            variant == 'success' ? (
                <div className='bg-green-200 p-4 rounded-md text-green-600 border-2 border-green-300'>
                    {children}
                </div>
            ) : (
                <div className='bg-sky-200 p-4 rounded-md text-sky-600 border-2 border-sky-300'>
                    {children}
                </div>
            )
        ) }
    </>
  )
}

export default Message