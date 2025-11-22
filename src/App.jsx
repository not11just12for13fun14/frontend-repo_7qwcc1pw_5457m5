import React, { useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { StoreProvider } from './components/StoreContext'
import NavBar from './components/NavBar'
import Categories from './components/Categories'
import ProductGrid from './components/ProductGrid'
import CartPage from './components/CartPage'

function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.25),transparent_35%)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Minimal Shoes Store</h1>
            <p className="mt-3 text-slate-200 max-w-xl">Clean, fast and simple. Browse categories, search, and add to your bag.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Shop by Category</h2>
          <Categories onSelect={(slug) => setCategory(slug)} />
        </section>

        <section className="flex items-center justify-between mt-2">
          <h2 className="text-xl font-bold">Featured</h2>
        </section>

        <ProductGrid query={query} category={category} />
      </div>
    </div>
  )
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <StoreProvider>
      <NavBar onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home key="home" />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </StoreProvider>
  )
}

export default App
