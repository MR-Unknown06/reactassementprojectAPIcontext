# Mini Product Store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It's a small product-browsing app that fetches products from https://fakestoreapi.com/products, lets you search, view product details, and add/remove items from a cart. Global state (products + cart) is managed with React's Context API using `useReducer`, defined in `src/context/StoreContext.js`.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all dependencies needed to run the project.

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Where each feature lives

- **Reusable components** — `src/components/Navbar.js`, `src/components/ProductCard.js`
- **Props destructuring** — `ProductCard.js` destructures `{ product, onAddToCart }` and `{ id, title, price, image }`
- **useState (lazy init + object state)** — `ProductsPage.js`, `useState(() => ({ search: '' }))`
- **useEffect (fetch on mount)** — `ProductsPage.js` and `ProductDetailPage.js`
- **useRef** — `ProductsPage.js`, focuses the search input on mount
- **Memoization** — `useMemo` and `useCallback` in `ProductsPage.js`, `memo` on `ProductCard.js`, `useCallback` in `StoreContext.js`
- **Lists with keys** — `ProductsPage.js` and `CartPage.js`
- **Controlled form input** — the search box in `ProductsPage.js`
- **Conditional rendering** — loading / empty / error states in `ProductsPage.js`, `ProductDetailPage.js`, `CartPage.js`
- **React Router v6** — routes defined in `App.js` (`/`, `/products/:id`, `/cart`), navigation via `Link` and `useNavigate`
- **Global state (Context API)** — `src/context/StoreContext.js`, exposed through the `useStore()` hook
- **HTTP requests** — `fetch('https://fakestoreapi.com/products')` in `StoreContext.js`

Only functional components and hooks are used. No class components. Styling is plain CSS (`App.css`, `index.css`), no frameworks.
