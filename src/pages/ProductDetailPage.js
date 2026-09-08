import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, fetchProducts, addToCart } = useStore()
  const { items: productList, status } = products

  useEffect(() => {
    if (status === 'idle') fetchProducts()
  }, [status, fetchProducts])

  if (status === 'loading' || status === 'idle') {
    return <p>Loading product...</p>
  }

  const product = productList.find((p) => String(p.id) === id)

  if (!product) {
    return <p>Product not found.</p>
  }

  return (
    <div className='product-detail-page'>
      <button onClick={() => navigate(-1)}>Back</button>
      <img src={product.image} alt={product.title} className='product-detail-image' />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default ProductDetailPage
