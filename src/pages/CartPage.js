import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const CartPage = () => {
  const { cart, removeFromCart } = useStore()
  const cartItems = cart.items
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className='cart-page'>
      <h1>Your Cart</h1>
      {cartItems.length === 0 && (
        <div>
          <p>Your cart is empty.</p>
          <Link to='/'>Browse products</Link>
        </div>
      )}
      <ul>
        {cartItems.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && <h2>Total: ${total.toFixed(2)}</h2>}
    </div>
  )
}

export default CartPage
