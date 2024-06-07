import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'

const App = () => {
  return( 
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto p-4'>
          <h1 className='text-3xl font-bold underline'>Welcome to Glamora!</h1>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App