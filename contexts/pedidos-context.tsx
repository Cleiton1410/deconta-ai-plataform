"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface PedidoItem {
  id: number
  nome: string
  preco: number
  quantidade: number
  imagem: string
}

export interface Pedido {
  id: string
  numero: string
  status: string
  dataCompra: string
  dataEntrega: string
  tipoEntrega: string
  total: number
  desconto: number
  frete: number
  metodoPagamento: string
  cliente: {
    nome: string
    email: string
    telefone: string
  }
  endereco?: {
    rua: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  loja?: {
    nome: string
    endereco: string
    telefone: string
    horario: string
  }
  itens: PedidoItem[]
  timeline: {
    status: string
    titulo: string
    descricao: string
    data: string
    concluido: boolean
  }[]
}

interface PedidosContextType {
  pedidos: Pedido[]
  criarPedido: (dadosPedido: Omit<Pedido, "id" | "numero" | "timeline">) => string
  buscarPedido: (id: string) => Pedido | null
  atualizarStatusPedido: (id: string, novoStatus: Pedido["status"]) => void
}

const PedidosContext = createContext<PedidosContextType | undefined>(undefined)

export function PedidosProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  const criarPedido = (dadosPedido: Omit<Pedido, "id" | "numero" | "timeline">): string => {
    const id = Date.now().toString().slice(-6)
    const numero = `#PB${id}`

    const timeline = [
      {
        status: "confirmado",
        titulo: "Pedido Confirmado",
        descricao: "Seu pedido foi confirmado e está sendo processado",
        data: new Date().toISOString(),
        concluido: true,
      },
      {
        status: "preparando",
        titulo: dadosPedido.tipoEntrega === "retirada" ? "Preparando para Retirada" : "Preparando Pedido",
        descricao:
          dadosPedido.tipoEntrega === "retirada"
            ? "Seus produtos estão sendo separados para retirada"
            : "Seus produtos estão sendo separados",
        data: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // +2 horas
        concluido: false,
      },
      {
        status: "pronto",
        titulo: dadosPedido.tipoEntrega === "retirada" ? "Pronto para Retirada" : "Saiu para Entrega",
        descricao:
          dadosPedido.tipoEntrega === "retirada"
            ? "Seu pedido está pronto para retirada na loja"
            : "Seu pedido saiu para entrega",
        data: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // +4 horas
        concluido: false,
      },
      {
        status: "entregue",
        titulo: dadosPedido.tipoEntrega === "retirada" ? "Retirado" : "Entregue",
        descricao:
          dadosPedido.tipoEntrega === "retirada" ? "Pedido retirado com sucesso" : "Pedido entregue com sucesso",
        data:
          dadosPedido.tipoEntrega === "retirada"
            ? new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // +6 horas para retirada
            : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 dias para entrega
        concluido: false,
      },
    ]

    const novoPedido: Pedido = {
      ...dadosPedido,
      id,
      numero,
      status: "confirmado",
      timeline,
    }

    setPedidos((prev) => [...prev, novoPedido])
    return id
  }

  const buscarPedido = (id: string): Pedido | null => {
    return pedidos.find((pedido) => pedido.id === id) || null
  }

  const atualizarStatusPedido = (id: string, novoStatus: Pedido["status"]) => {
    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === id) {
          const timelineAtualizada = pedido.timeline.map((step) => {
            if (step.status === novoStatus) {
              return { ...step, concluido: true, data: new Date().toISOString() }
            }
            return step
          })

          return {
            ...pedido,
            status: novoStatus,
            timeline: timelineAtualizada,
          }
        }
        return pedido
      }),
    )
  }

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        criarPedido,
        buscarPedido,
        atualizarStatusPedido,
      }}
    >
      {children}
    </PedidosContext.Provider>
  )
}

export function usePedidos() {
  const context = useContext(PedidosContext)
  if (context === undefined) {
    throw new Error("usePedidos must be used within a PedidosProvider")
  }
  return context
}
