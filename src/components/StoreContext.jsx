import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [sessionId, setSessionId] = useState('')
  const [cart, setCart] = useState({ items: [], subtotal: 0, total_items: 0 })

  useEffect(() => {
    let sid = localStorage.getItem('session_id')
    if (!sid) {
      sid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
      localStorage.setItem('session_id', sid)
    }
    setSessionId(sid)
  }, [])

  const fetchCart = async () => {
    if (!sessionId) return
    const res = await fetch(`${API}/api/cart?session_id=${sessionId}`)
    const data = await res.json()
    setCart(data)
  }

  useEffect(() => {
    if (sessionId) fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  const addToCart = async (product_id, quantity = 1) => {
    const res = await fetch(`${API}/api/cart/add?session_id=${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, quantity }),
    })
    const data = await res.json()
    setCart(data)
  }

  const updateCart = async (product_id, quantity) => {
    const res = await fetch(`${API}/api/cart/update?session_id=${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, quantity }),
    })
    const data = await res.json()
    setCart(data)
  }

  const removeFromCart = async (product_id) => {
    const res = await fetch(`${API}/api/cart/remove?session_id=${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, quantity: 1 }),
    })
    const data = await res.json()
    setCart(data)
  }

  const value = useMemo(() => ({
    API,
    sessionId,
    cart,
    fetchCart,
    addToCart,
    updateCart,
    removeFromCart,
  }), [API, sessionId, cart])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
