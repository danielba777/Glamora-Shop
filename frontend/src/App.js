import React, { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  }

  return(
    <>
      <div className='flex flex-col min-h-screen w-full'>
        <Header />
        <main className='flex-1 w-full'>
          <div className='container mx-auto p-4 w-full'>
            <Outlet />
            <ScrollToTop />
          </div>
          <ToastContainer />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App