import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { PedidosProvider } from "@/contexts/pedidos-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PB Shopping - Melhores Descontos",
  description: "Encontre os melhores descontos do PB Shopping",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <PedidosProvider>{children}</PedidosProvider>
        </CartProvider>
      </body>
    </html>
  )
}
