import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const Navbar = () => {
  const { cart } = useStore()

  return (
    <div className='navbar'>
      <Link to='/'>Products</Link>
      <Link to='/cart'>Cart ({cart.items.length})</Link>
    </div>
  )
}

export default Navbar
