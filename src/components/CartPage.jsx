import React, { useEffect } from 'react'
import { useStore } from './StoreContext'

export default function CartPage() {
  const { cart, fetchCart, updateCart, removeFromCart, API } = useStore()

  useEffect(() => {
    fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Bag</h1>
      {(!cart.items || cart.items.length === 0) ? (
        <div className="text-slate-600">Your bag is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((it) => (
              <CartRow key={it.product_id} item={it} onUpdate={updateCart} onRemove={removeFromCart} API={API} />
            ))}
          </div>
          <div className="border rounded-2xl p-4 h-fit">
            <div className="flex justify-between mb-2"><span>Subtotal</span><span className="font-semibold">${cart.subtotal?.toFixed?.(2) || cart.subtotal}</span></div>
            <button className="mt-4 w-full bg-black text-white rounded-full py-2 hover:opacity-90">Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

function CartRow({ item, onUpdate, onRemove, API }) {
  const [product, setProduct] = React.useState(null)
  useEffect(() => {
    fetch(`${API}/api/products/${item.product_id}`).then(r => r.json()).then(setProduct)
  }, [API, item.product_id])
  if (!product) return null
  return (
    <div className="flex gap-4 border rounded-2xl p-4">
      {product.image_url && <img src={product.image_url} alt={product.title} className="w-24 h-24 object-cover rounded-lg" />}
      <div className="flex-1">
        <div className="font-semibold">{product.title}</div>
        <div className="text-slate-500 text-sm mb-2">${product.price?.toFixed?.(2) || product.price}</div>
        <div className="flex items-center gap-2">
          <select
            value={item.quantity}
            onChange={(e) => onUpdate(item.product_id, Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i+1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <button onClick={() => onRemove(item.product_id)} className="text-red-600 hover:underline">Remove</button>
        </div>
      </div>
      <div className="font-semibold">${(product.price * item.quantity).toFixed(2)}</div>
    </div>
  )
}
