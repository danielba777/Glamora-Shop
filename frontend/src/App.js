import React, { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router-dom'

const App = () => {

  const ScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();
  
    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  }

  return(
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-1'>
          <div className='container mx-auto p-4'>
            <Outlet />
            <ScrollToTop />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App