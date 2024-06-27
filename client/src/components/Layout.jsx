import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <main>
            <Navbar />
            <div className='pt-20'></div>
            {children}
            <Footer />
        </main>
    )
}

export default Layout;