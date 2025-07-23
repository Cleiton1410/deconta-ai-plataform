"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Heart,
  Truck,
  Shield,
  CreditCard,
  Gift,
  Calculator,
  Tag,
  Star,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"





export default function CarrinhoPage() {
  const { items, removeFromCart, updateQuantity, getTotalItems, getSubtotal, getTotalPrice } = useCart()
  const [cep, setCep] = useState("")
  const [cupom, setCupom] = useState("")
  const [frete, setFrete] = useState(0)
  const [prazoEntrega, setPrazoEntrega] = useState("")
  const [cupomAplicado, setCupomAplicado] = useState("")
  const [desconto, setDesconto] = useState(0)
  const[cuponsdisponiveis, setCupons]=useState([])
  useEffect(()=>{
  async function getcupons() {
    
    let requisicao=await fetch("http://localhost:3000/getcupons");
    if (requisicao.ok) {
      let cupons= await requisicao.json();
      if (cupons.length>0) {
       setCupons(cupons);
      }
      
    }
  }
  getcupons();
},[]);

  const calcularFrete = () => {
    if (cep.length === 8) {
      // Simulação de cálculo de frete
      const freteCalculado = getSubtotal() > 200 ? 0 : 15.9
      setFrete(freteCalculado)
      setPrazoEntrega(freteCalculado === 0 ? "Frete Grátis" : "3-5 dias úteis")
    }
  }

  const aplicarCupom = () => {
  
fetch(`http://localhost:3000/cupomdesconto/${cupom}`)
   
  }

  const subtotal = getSubtotal()
  const freteCalculado = subtotal > 200 ? 0 : frete || 15.9
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
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-12 shadow-xl">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h1>
                <p className="text-gray-600 mb-8">Que tal explorar nossos produtos em oferta?</p>
                <Link href="/">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Voltar às Compras</span>
              </Link>
              <h1 className="text-2xl font-bold">
                Meu Carrinho ({getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"})
              </h1>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600">Compra Segura</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Produtos no Carrinho</span>
                    <Badge variant="secondary">
                      {getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-white/50">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <div className={`inline-block px-2 py-1 rounded text-xs text-white mb-1 ${item.storeColor}`}>
                          {item.storeName}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{item.rating}</span>
                          {item.eco && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Eco-Friendly
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500 line-through">
                            R$ {item.originalPrice.toLocaleString()}
                          </span>
                          <span className="font-bold text-green-600">R$ {item.discountPrice.toLocaleString()}</span>
                          <Badge className="bg-red-500 text-white text-xs">-{item.discount}%</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">R$ {(item.discountPrice * item.quantity).toLocaleString()}</div>
                        <div className="flex space-x-1 mt-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Frete */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Calcular Frete</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 mb-4">
                    <Input
                      placeholder="Digite seu CEP"
                      value={cep}
                      onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                      maxLength={8}
                    />
                    <Button onClick={calcularFrete}>
                      <Calculator className="w-4 h-4 mr-2" />
                      Calcular
                    </Button>
                  </div>
                  {prazoEntrega && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-semibold">PAC - Correios</div>
                          <div className="text-sm text-gray-600">{prazoEntrega}</div>
                        </div>
                        <div className="font-bold">{frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}</div>
                      </div>
                      {subtotal < 200 && (
                        <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
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
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>Cupom de Desconto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 mb-4">
                    <Input
                      placeholder="Digite o cupom"
                      value={cupom}
                      onChange={(e) => setCupom(e.target.value.toUpperCase())}
                    />
                    <Button onClick={aplicarCupom}>Aplicar</Button>
                  </div>
                  {cupomAplicado && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-800">Cupom {cupomAplicado} aplicado!</span>
                        <span className="font-bold text-green-600">-R$ {desconto.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-semibold">Cupons Disponíveis:</div>
                    <div className="space-y-1 text-xs">
                      <div className="bg-gray-50 p-2 rounded">DESCONTO10 - 10% off</div>
                      <div className="bg-gray-50 p-2 rounded">BEMVINDO - 15% off</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resumo */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        Subtotal ({getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"})
                      </span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span className={freteCalculado === 0 ? "text-green-600 font-semibold" : ""}>
                        {freteCalculado === 0 ? "Grátis" : `R$ ${freteCalculado.toFixed(2)}`}
                      </span>
                    </div>
                    {desconto > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto</span>
                        <span>-R$ {desconto.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">R$ {total.toFixed(2)}</span>
                  </div>

                  {/* Economia */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-green-800">Você está economizando</div>
                      <div className="text-lg font-bold text-green-600">
                        R${" "}
                        {items
                          .reduce((acc, item) => acc + (item.originalPrice - item.discountPrice) * item.quantity, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Métodos de Pagamento */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Métodos de Pagamento:</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <CreditCard className="w-4 h-4" />
                      <span>Cartão, PIX, Boleto</span>
                    </div>
                    <div className="text-xs text-gray-600">💳 Até 12x sem juros no cartão</div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                    <Lock className="w-4 h-4 mr-2" />
                    Finalizar Compra
                  </Button>

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
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5" />
                    <span>Você pode gostar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
