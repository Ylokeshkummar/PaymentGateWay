import React from 'react'
import Header from '../Profile/Components/Header'
import Footer from '../Profile/Components/Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout