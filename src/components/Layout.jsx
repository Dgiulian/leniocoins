import React from 'react'
import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <div className="min-h-screen">
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
