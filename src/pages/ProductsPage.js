import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

const ProductsPage = () => {
  const { products, fetchProducts, addToCart } = useStore()
  const { items: productList, status } = products

  const [filters, setFilters] = useState(() => ({ search: '' }))

  const searchInputRef = useRef(null)

  useEffect(() => {
    if (status === 'idle') fetchProducts()
    searchInputRef.current.focus()
  }, [status, fetchProducts])

  const handleAddToCart = useCallback(
    (product) => addToCart(product),
    [addToCart]
  )

  const handleSearchChange = (e) => {
    setFilters({ search: e.target.value })
  }

  const filteredProducts = useMemo(() => {
    return productList.filter((product) =>
      product.title.toLowerCase().includes(filters.search.toLowerCase())
    )
  }, [productList, filters])

  return (
    <div className='products-page'>
      <h1>Products</h1>

      <input
        ref={searchInputRef}
        type='text'
        placeholder='Search products...'
        value={filters.search}
        onChange={handleSearchChange}
      />
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p>Failed to load products.</p>}
      {status === 'succeeded' && filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      <div className='product-grid'>
        {status === 'succeeded' &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
      </div>
    </div>
  )
}

export default ProductsPage
