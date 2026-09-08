import { createContext, useContext, useReducer, useCallback } from 'react'

const StoreContext = createContext(null)

const initialState = {
  products: {
    items: [],
    status: 'idle', 
  },
  cart: {
    items: [], 
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'products/fetchPending':
      return { ...state, products: { ...state.products, status: 'loading' } }
    case 'products/fetchSucceeded':
      return {
        ...state,
        products: { items: action.payload, status: 'succeeded' },
      }
    case 'products/fetchFailed':
      return { ...state, products: { ...state.products, status: 'failed' } }
    case 'cart/addToCart':
      return {
        ...state,
        cart: { items: [...state.cart.items, action.payload] },
      }
    case 'cart/removeFromCart':
      return {
        ...state,
        cart: {
          items: state.cart.items.filter((item) => item.id !== action.payload),
        },
      }
    default:
      return state
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchProducts = useCallback(async () => {
    dispatch({ type: 'products/fetchPending' })
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      dispatch({ type: 'products/fetchSucceeded', payload: data })
    } catch (err) {
      dispatch({ type: 'products/fetchFailed' })
    }
  }, [])

  const addToCart = useCallback((product) => {
    dispatch({ type: 'cart/addToCart', payload: product })
  }, [])

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'cart/removeFromCart', payload: id })
  }, [])

  const value = {
    products: state.products,
    cart: state.cart,
    fetchProducts,
    addToCart,
    removeFromCart,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
