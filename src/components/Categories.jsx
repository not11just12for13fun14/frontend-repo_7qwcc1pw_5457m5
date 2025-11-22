import React, { useEffect, useState } from 'react'
import { useStore } from './StoreContext'

export default function Categories({ onSelect }) {
  const { API } = useStore()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${API}/api/categories`).then(r => r.json()).then(setCategories)
  }, [API])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((c) => (
        <button
          key={c.id || c._id || c.slug}
          onClick={() => onSelect?.(c.slug)}
          className="group relative rounded-2xl overflow-hidden bg-slate-100 hover:shadow-lg transition"
        >
          {c.image_url && (
            <img src={c.image_url} alt={c.name} className="h-36 w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-2 left-3 text-white font-semibold">{c.name}</div>
        </button>
      ))}
    </div>
  )
}
