import { memo } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, onAddToCart }) => {
  const { id, title, price, image } = product

  return (
    <div className='product-card'>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className='product-card-image' />
        <h3>{title}</h3>
      </Link>
      <p>${price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default memo(ProductCard)
