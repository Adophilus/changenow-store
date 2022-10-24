import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="container">
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}

export default Layout
