import React, { useEffect, useState } from 'react'
import { ShoppingCart, Search, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from './StoreContext'

export default function NavBar({ onSearch }) {
  const { cart } = useStore()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
              <Menu size={22} />
            </button>
            <Link to="/" className="font-extrabold text-xl tracking-tight">VibeShoe</Link>
          </div>

          <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shoes"
                className="w-full rounded-full bg-slate-100 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            </div>
          </form>

          <Link to="/cart" className="relative inline-flex items-center gap-2">
            <ShoppingCart />
            {cart?.total_items > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-black text-white rounded-full px-1.5 py-0.5">
                {cart.total_items}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSubmit} className="flex">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shoes"
                className="w-full rounded-full bg-slate-100 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            </div>
          </form>
        </div>
      )}
    </header>
  )
}
