import React from 'react'

const Footer = () => {
  return (
    <>

      <div className='hidden sm:flex justify-between items-center p-4 bg-amber-200 text-zinc-950'>
        <button></button>
        <button className='flex gap-2 items-center'>
          <i className='fa-solid fa-truck-fast'></i>
          <p>Free Shipping</p>
        </button>
        <button className='flex gap-2 items-center'>
          <i className='fa-solid fa-award'></i>
          <p>100 Days Money Back</p>
        </button>
        <button className='flex gap-2 items-center'>
          <i className='fa-solid fa-file-invoice'></i>
          <p>Pay On Bill</p>
        </button>
        <button></button>
      </div>

      <div className='block sm:hidden relative h-12 overflow-hidden bg-amber-200 text-zinc-950'>
          <div className='absolute inset-0'>
            <div className='absolute inset-0 flex items-center justify-center animate-slide-1'>
              <i className='fa-solid fa-truck-fast'></i>
              <p className='ml-2'>Free Shipping</p>
            </div>
            <div className='absolute inset-0 flex items-center justify-center animate-slide-2'>
              <i className='fa-solid fa-award'></i>
              <p className='ml-2'>100 Days Money Back</p>
            </div>
            <div className='absolute inset-0 flex items-center justify-center animate-slide-3'>
              <i className='fa-solid fa-file-invoice'></i>
              <p className='ml-2'>Pay On Bill</p>
            </div>
          </div>
      </div>

      <hr />
      <footer className='flex flex-col sm:flex-row w-full justify-center gap-4 sm:gap-16 p-8 text-zinc-950'>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-xl hover:text-zinc-600 cursor-pointer logo'>Glamora</h1>
          <div className='flex gap-8 sm:gap-2 text-lg'>
            <button className='hover:text-zinc-600 cursor-pointer'><i className='fa-brands fa-facebook'></i></button>
            <button className='hover:text-zinc-600 cursor-pointer'><i className='fa-brands fa-instagram'></i></button>
            <button className='hover:text-zinc-600 cursor-pointer'><i className='fa-brands fa-x-twitter'></i></button>
            <button className='hover:text-zinc-600 cursor-pointer'><i className='fa-brands fa-youtube'></i></button>
            <button className='hover:text-zinc-600 cursor-pointer'><i className='fa-brands fa-pinterest'></i></button>
            <button className='hover:text-zinc-600 cursor-pointer'><i className='fa-brands fa-tiktok'></i></button>
          </div> 
        </div>

        <div className='flex flex-col items-start text-zinc-700 gap-2'>
          <h2 className='text-zinc-950 mb-2 font-semibold'>CUSTOMER SUPPORT</h2>
          <button className='hover:text-zinc-400'>Help & Contact</button>
          <button className='hover:text-zinc-400'>Affiliate partner programm</button>
          <button className='hover:text-zinc-400'>Creator Collaborations</button>
          <button className='hover:text-zinc-400'>Delivery area</button>
        </div>

        <div className='flex flex-col items-start text-zinc-700 gap-2'>
          <h2 className='text-zinc-950 mb-2 font-semibold'>SECURE SHOPPING</h2>
          <button className='flex items-center gap-1 hover:text-zinc-400'>
            <i className='fa-solid fa-star'></i> 
            <p>Our customers rate us as "very good"</p>
          </button>
          <button className='flex items-center gap-2 hover:text-zinc-400'>
            <i className='fa-solid fa-lock'></i> 
            <p>Your data is safe with us</p>
          </button>
        </div>
      </footer>
      <div className='flex justify-center items-center gap-2 bg-zinc-100 text-zinc-400 p-2'>
        <i className='fa-regular fa-copyright'></i>
        <p>2024 <span className='logo'>Glamora</span></p>
      </div>
    </>
  )
}

export default Footer