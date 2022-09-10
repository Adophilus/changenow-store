import Navbar from './Navbar'

export default ({ children }) => {
  return (
    <main className="container">
      <Navbar />
      {children}
    </main>
  )
}
