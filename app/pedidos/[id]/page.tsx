"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Store,
  AlertCircle,
  Download,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { usePedidos } from "@/contexts/pedidos-context"

interface PedidoPageProps {
  params: {
    id: string
  }
}

export default function PedidoPage({ params }: PedidoPageProps) {
  const { buscarPedido } = usePedidos()
  const [pedido, setPedido] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Buscar pedido no contexto
    const fetchPedido = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular loading

      const pedidoEncontrado = buscarPedido(params.id)
      setPedido(pedidoEncontrado)
      setLoading(false)
    }

    fetchPedido()
  }, [params.id, buscarPedido])

  if (loading) {
    return (
      <div
        className="min-h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/pbshopping-bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm md:text-base">Carregando informações do pedido...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!pedido) {
    return (
      <div
        className="min-h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/pbshopping-bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-red-500" />
            <h1 className="text-xl md:text-2xl font-bold mb-4">Pedido não encontrado</h1>
            <p className="text-gray-600 mb-6 text-sm md:text-base">Verifique o número do pedido e tente novamente.</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-blue-500"
      case "preparando":
        return "bg-yellow-500"
      case "pronto":
        return "bg-orange-500"
      case "entregue":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado"
      case "preparando":
        return "Preparando"
      case "pronto":
        return pedido.tipoEntrega === "retirada" ? "Pronto para Retirada" : "Saiu para Entrega"
      case "entregue":
        return pedido.tipoEntrega === "retirada" ? "Retirado" : "Entregue"
      default:
        return "Processando"
    }
  }

  const currentStepIndex = pedido.timeline.findIndex((step: any) => step.status === pedido.status)
  const progress = ((currentStepIndex + 1) / pedido.timeline.length) * 100

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url(/images/pbshopping-bg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-sm md:text-base">Voltar ao Início</span>
              </Link>
              <h1 className="text-lg md:text-2xl font-bold">Acompanhar Pedido</h1>
              <div className="flex items-center space-x-2">
                <Badge className={`${getStatusColor(pedido.status)} text-white text-xs md:text-sm`}>
                  {getStatusText(pedido.status)}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Informações Principais */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Status do Pedido */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <span className="text-lg md:text-xl">Pedido {pedido.numero}</span>
                    <Badge className={`${getStatusColor(pedido.status)} text-white w-fit`}>
                      {getStatusText(pedido.status)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progresso do Pedido</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    {pedido.timeline.map((step: any, index: number) => (
                      <div key={step.status} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                              step.concluido || index <= currentStepIndex ? getStatusColor(step.status) : "bg-gray-300"
                            } text-white`}
                          >
                            {step.concluido ? (
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                            ) : index === currentStepIndex ? (
                              <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            ) : (
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                            )}
                          </div>
                          {index < pedido.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-8 md:h-12 ${
                                index < currentStepIndex ? getStatusColor(step.status) : "bg-gray-300"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pb-6 md:pb-8">
                          <h4 className="font-semibold text-sm md:text-base">{step.titulo}</h4>
                          <p className="text-xs md:text-sm text-gray-600 mb-1">{step.descricao}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(step.data).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Produtos */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Produtos do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    {pedido.itens.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 border rounded-lg"
                      >
                        <Image
                          src={item.imagem || "/placeholder.svg"}
                          alt={item.nome}
                          width={60}
                          height={60}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm md:text-base">{item.nome}</h4>
                          <p className="text-xs md:text-sm text-gray-600">Quantidade: {item.quantidade}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm md:text-base">R$ {item.preco.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Informações de Entrega/Retirada */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                    {pedido.tipoEntrega === "retirada" ? (
                      <Store className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Truck className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                    <span>{pedido.tipoEntrega === "retirada" ? "Retirada na Loja" : "Informações de Entrega"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  {pedido.tipoEntrega === "retirada" ? (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm md:text-base">{pedido.loja.nome}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-xs md:text-sm">{pedido.loja.endereco}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-xs md:text-sm">{pedido.loja.telefone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-xs md:text-sm">Funcionamento: {pedido.loja.horario}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2 text-sm md:text-base">Importante:</h5>
                        <ul className="text-xs md:text-sm space-y-1">
                          <li>• Leve um documento com foto</li>
                          <li>• Informe o número do pedido: {pedido.numero}</li>
                          <li>• Prazo para retirada: 7 dias</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm md:text-base">Endereço de Entrega</h4>
                        <div className="text-xs md:text-sm">
                          <p>{pedido.endereco.rua}</p>
                          <p>
                            {pedido.endereco.bairro} - {pedido.endereco.cidade}/{pedido.endereco.estado}
                          </p>
                          <p>CEP: {pedido.endereco.cep}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2 text-sm md:text-base">Previsão de Entrega:</h5>
                        <p className="text-xs md:text-sm">
                          {new Date(pedido.dataEntrega).toLocaleDateString("pt-BR", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 md:space-y-6">
              {/* Resumo do Pedido */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>R$ {(pedido.total + pedido.desconto).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Desconto:</span>
                      <span>-R$ {pedido.desconto.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete:</span>
                      <span>{pedido.frete === 0 ? "Grátis" : `R$ ${pedido.frete.toFixed(2)}`}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {pedido.total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Pago via {pedido.metodoPagamento}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Cliente */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Dados do Cliente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4 md:p-6">
                  <div>
                    <div className="font-semibold text-sm md:text-base">{pedido.cliente.nome}</div>
                    <div className="text-xs md:text-sm text-gray-600 flex items-center space-x-2">
                      <Mail className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{pedido.cliente.email}</span>
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 flex items-center space-x-2">
                      <Phone className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{pedido.cliente.telefone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4 md:p-6">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Comprovante
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Falar com Suporte
                  </Button>
                  {pedido.status === "confirmado" && (
                    <Button variant="destructive" className="w-full">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Cancelar Pedido
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
