"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Minus, Trash2, Heart, Truck, Shield, CreditCard, Gift, Calculator, Tag, Star, Lock, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function CarrinhoPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getSubtotal,
    getTotalPrice,
    getDiscountAmount,
    cupomAplicado,
    aplicarCupom,
    removerCupom,
  } = useCart()

  const [cep, setCep] = useState("")
  const [cupom, setCupom] = useState("")
  const [frete, setFrete] = useState(0)
  const [prazoEntrega, setPrazoEntrega] = useState("")
  const [cupomError, setCupomError] = useState("")

  const calcularFrete = () => {
    if (cep.length === 8) {
      // Simulação de cálculo de frete
      const freteCalculado = getSubtotal() > 200 ? 0 : 15.9
      setFrete(freteCalculado)
      setPrazoEntrega(freteCalculado === 0 ? "Frete Grátis" : "3-5 dias úteis")
    }
  }

  const handleAplicarCupom = () => {
    setCupomError("")
    const sucesso = aplicarCupom(cupom)
    if (sucesso) {
      setCupom("")
    } else {
      setCupomError("Cupom inválido ou expirado")
    }
  }

  const subtotal = getSubtotal()
  const freteCalculado = subtotal > 200 ? 0 : frete || 15.9
  const desconto = getDiscountAmount()
  const total = subtotal + freteCalculado - desconto

  if (items.length === 0) {
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
          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-12 shadow-xl">
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h1>
                <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Que tal explorar nossos produtos em oferta?</p>
                <Link href="/">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                <span className="font-semibold text-sm md:text-base">Voltar às Compras</span>
              </Link>
              <h1 className="text-lg md:text-2xl font-bold text-center">
                Meu Carrinho ({getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"})
              </h1>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                <span className="text-xs md:text-sm text-green-600 hidden sm:inline">Compra Segura</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center justify-between text-lg md:text-xl">
                    <span>Produtos no Carrinho</span>
                    <Badge variant="secondary" className="text-xs md:text-sm">
                      {getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 border rounded-lg bg-white/50">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base line-clamp-2">{item.name}</h3>
                        <div className={`inline-block px-2 py-1 rounded text-xs text-white mb-1 ${item.storeColor}`}>
                          {item.storeName}
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{item.rating}</span>
                          {item.eco && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Eco-Friendly
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 line-through">
                            R$ {item.originalPrice.toLocaleString()}
                          </span>
                          <span className="font-bold text-green-600 text-sm md:text-base">R$ {item.discountPrice.toLocaleString()}</span>
                          <Badge className="bg-red-500 text-white text-xs">-{item.discount}%</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                          <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm md:text-base">R$ {(item.discountPrice * item.quantity).toLocaleString()}</div>
                          <div className="flex space-x-1 mt-1">
                            <Button variant="ghost" size="sm" className="p-1">
                              <Heart className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Frete */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                    <Truck className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Calcular Frete</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <Input
                      placeholder="Digite seu CEP"
                      value={cep}
                      onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                      maxLength={8}
                      className="flex-1"
                    />
                    <Button onClick={calcularFrete} className="w-full md:w-auto">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calcular
                    </Button>
                  </div>
                  {prazoEntrega && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-sm md:text-base">PAC - Correios</div>
                          <div className="text-xs md:text-sm text-gray-600">{prazoEntrega}</div>
                        </div>
                        <div className="font-bold text-sm md:text-base">{frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}</div>
                      </div>
                      {subtotal < 200 && (
                        <div className="text-xs md:text-sm text-blue-600 bg-blue-50 p-2 rounded">
                          💡 Adicione mais R$ {(200 - subtotal).toFixed(2)} e ganhe frete grátis!
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div className="space-y-4">
              {/* Cupom */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                    <Tag className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Cupom de Desconto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  {!cupomAplicado ? (
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <Input
                          placeholder="Digite o cupom"
                          value={cupom}
                          onChange={(e) => {
                            setCupom(e.target.value.toUpperCase())
                            setCupomError("")
                          }}
                          className="flex-1"
                        />
                        <Button onClick={handleAplicarCupom} disabled={!cupom.trim()} className="w-full md:w-auto">
                          Aplicar
                        </Button>
                      </div>
                      {cupomError && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{cupomError}</div>}
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">Cupons Disponíveis:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                          <div className="bg-gray-50 p-2 rounded">DESCONTO10 - 10% off</div>
                          <div className="bg-gray-50 p-2 rounded">BEMVINDO - 15% off</div>
                          <div className="bg-gray-50 p-2 rounded">FRETEGRATIS - Frete grátis</div>
                          <div className="bg-gray-50 p-2 rounded">SAVE20 - 20% off</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-green-800 font-semibold text-sm md:text-base">Cupom {cupomAplicado.codigo} aplicado!</span>
                          <div className="text-xs md:text-sm text-green-600">
                            {cupomAplicado.tipo === "percentual"
                              ? `${cupomAplicado.desconto}% de desconto`
                              : `R$ ${cupomAplicado.desconto.toFixed(2)} de desconto`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600 text-sm md:text-base">-R$ {desconto.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removerCupom}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Resumo */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm md:text-base">
                      <span>
                        Subtotal ({getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"})
                      </span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span>Frete</span>
                      <span className={freteCalculado === 0 ? "text-green-600 font-semibold" : ""}>
                        {freteCalculado === 0 ? "Grátis" : `R$ ${freteCalculado.toFixed(2)}`}
                      </span>
                    </div>
                    {desconto > 0 && (
                      <div className="flex justify-between text-sm md:text-base text-green-600">
                        <span>Desconto ({cupomAplicado?.codigo})</span>
                        <span>-R$ {desconto.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg md:text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-600">R$ {total.toFixed(2)}</span>
                  </div>

                  {/* Economia */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-green-800">Você está economizando</div>
                      <div className="text-lg md:text-xl font-bold text-green-600">
                        R${" "}
                        {(
                          items.reduce(
                            (acc, item) => acc + (item.originalPrice - item.discountPrice) * item.quantity,
                            0,
                          ) + desconto
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Métodos de Pagamento */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Métodos de Pagamento:</div>
                    <div className="flex items-center space-x-2 text-xs md:text-sm">
                      <CreditCard className="w-4 h-4" />
                      <span>Cartão, PIX, Boleto</span>
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">💳 Até 12x sem juros no cartão</div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-sm md:text-base">
                      <Lock className="w-4 h-4 mr-2" />
                      Finalizar Compra
                    </Button>
                  </Link>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Compra 100% segura</span>
                    </div>
                    <div className="text-xs text-gray-600">🔄 Troca grátis em 30 dias</div>
                  </div>
                </CardContent>
              </Card>

              {/* Produtos Relacionados */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                    <Gift className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Você pode gostar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="text-sm text-gray-600 text-center py-4">Produtos relacionados aparecerão aqui</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
