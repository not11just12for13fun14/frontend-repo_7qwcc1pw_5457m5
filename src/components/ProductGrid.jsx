import React, { useEffect, useState } from 'react'
import { useStore } from './StoreContext'
import ProductCard from './ProductCard'

export default function ProductGrid({ query, category }) {
  const { API } = useStore()
  const [products, setProducts] = useState([])

  const load = async () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('category', category)
    const res = await fetch(`${API}/api/products?${params.toString()}`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id || p._id} product={p} />
      ))}
    </div>
  )
}
