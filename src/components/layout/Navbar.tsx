import { useSelector } from 'react-redux'

export default () => {
  const cart = useSelector((state) => state.cart)

  return (
    <nav>
      <ul>
        <li>Estore</li>
      </ul>
      <ul>
        <li>Home</li>
        <li>Store</li>
        <li>About</li>
        <li>{Object.keys(cart.items).length}</li>
      </ul>
    </nav>
  )
}
