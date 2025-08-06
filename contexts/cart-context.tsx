"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  image: string
  originalPrice: number
  discountPrice: number
  discount: number
  storeName: string
  storeColor: string
  quantity: number
  rating: number
  eco: boolean
}

interface CupomData {
  codigo: string
  desconto: number
  tipo: "percentual" | "fixo"
}

interface CartContextType {
  items: CartItem[]
  cupomAplicado: CupomData | null
  addToCart: (product: any) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
  getDiscountAmount: () => number
  aplicarCupom: (codigo: string) => boolean
  removerCupom: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cupomAplicado, setCupomAplicado] = useState<CupomData | null>(null)

  const addToCart = (product: any) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    setCupomAplicado(null)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.discountPrice * item.quantity, 0)
  }

  const getDiscountAmount = () => {
    if (!cupomAplicado) return 0

    const subtotal = getSubtotal()
    if (cupomAplicado.tipo === "percentual") {
      return (subtotal * cupomAplicado.desconto) / 100
    } else {
      return cupomAplicado.desconto
    }
  }

  const getTotalPrice = () => {
    const subtotal = getSubtotal()
    const shipping = subtotal > 200 ? 0 : 15.9 // Frete grátis acima de R$ 200
    const discount = getDiscountAmount()
    return subtotal + shipping - discount
  }

  const aplicarCupom = (codigo: string): boolean => {
    const cuponsValidos: Record<string, CupomData> = {
      DESCONTO10: { codigo: "DESCONTO10", desconto: 10, tipo: "percentual" },
      BEMVINDO: { codigo: "BEMVINDO", desconto: 15, tipo: "percentual" },
      FRETEGRATIS: { codigo: "FRETEGRATIS", desconto: 15.9, tipo: "fixo" },
      SAVE20: { codigo: "SAVE20", desconto: 20, tipo: "percentual" },
    }

    const cupom = cuponsValidos[codigo.toUpperCase()]
    if (cupom) {
      setCupomAplicado(cupom)
      return true
    }
    return false
  }

  const removerCupom = () => {
    setCupomAplicado(null)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        cupomAplicado,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getSubtotal,
        getDiscountAmount,
        aplicarCupom,
        removerCupom,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
