import Navbar from './Navbar'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="container">
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
