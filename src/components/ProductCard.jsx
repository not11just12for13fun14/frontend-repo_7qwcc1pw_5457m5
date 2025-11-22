import React from 'react'
import { Star } from 'lucide-react'
import { useStore } from './StoreContext'

export default function ProductCard({ product, onClick, onAdd }) {
  const { addToCart } = useStore()
  return (
    <div className="group rounded-2xl overflow-hidden bg-white border hover:shadow-xl transition flex flex-col">
      <button onClick={onClick} className="text-left">
        {product.image_url && (
          <img src={product.image_url} alt={product.title} className="h-52 w-full object-cover" />
        )}
        <div className="p-4">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill={i < Math.round(product.rating || 4) ? 'currentColor' : 'transparent'} />
            ))}
          </div>
          <h3 className="font-semibold mt-1 line-clamp-1">{product.title}</h3>
          <p className="text-slate-500 text-sm line-clamp-2">{product.description}</p>
          <div className="mt-3 font-bold">${product.price?.toFixed?.(2) || product.price}</div>
        </div>
      </button>
      <button
        onClick={() => addToCart(product.id || product._id, 1)}
        className="m-4 mt-auto bg-black text-white rounded-full py-2 hover:opacity-90"
      >
        Add to Bag
      </button>
    </div>
  )
}
