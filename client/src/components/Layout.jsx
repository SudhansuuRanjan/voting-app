import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main>
            <Navbar />
            <div className='pt-32'></div>
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout;