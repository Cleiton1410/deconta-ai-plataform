"use client"

import { useState } from "react"
<<<<<<< HEAD
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Receipt,
  Shield,
  Lock,
  User,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  Store,
  Truck,
  Clock,
  Phone,
  AlertCircle,
} from "lucide-react"
=======
import { ArrowLeft, CreditCard, Smartphone, Receipt, Shield, Lock, User, MapPin, Eye, EyeOff, CheckCircle, Store, Truck, Clock, Phone, AlertCircle } from 'lucide-react'
>>>>>>> testes
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { usePedidos } from "@/contexts/pedidos-context"
import { useRouter } from "next/navigation"

// Dados das lojas físicas
const lojasDisponiveis = [
  {
    id: 1,
    nome: "Magazine Luiza - PB Shopping",
    endereco: "PB Shopping - Piso 2, Loja 201",
    telefone: "(46) 3220-1234",
    horario: "10h às 22h",
    tempoPreparacao: "2-4 horas",
    disponivel: true,
  },
  {
    id: 2,
    nome: "Renner - PB Shopping",
    endereco: "PB Shopping - Piso 1, Loja 105",
    telefone: "(46) 3220-1235",
    horario: "10h às 22h",
    tempoPreparacao: "1-2 horas",
    disponivel: true,
  },
  {
    id: 3,
    nome: "Tok&Stok - PB Shopping",
    endereco: "PB Shopping - Piso 2, Loja 220",
    telefone: "(46) 3220-1236",
    horario: "10h às 22h",
    tempoPreparacao: "4-6 horas",
    disponivel: false,
  },
  {
    id: 4,
    nome: "Centauro - PB Shopping",
    endereco: "PB Shopping - Piso 1, Loja 115",
    telefone: "(46) 3220-1237",
    horario: "10h às 22h",
    tempoPreparacao: "2-3 horas",
    disponivel: true,
  },
]

export default function CheckoutPage() {
  const { items, getSubtotal, getTotalItems, getDiscountAmount, cupomAplicado, clearCart } = useCart()
  const { criarPedido } = usePedidos()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [installments, setInstallments] = useState("1")
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryType, setDeliveryType] = useState("entrega") // 'entrega' ou 'retirada'
  const [selectedStore, setSelectedStore] = useState("")
  const [pedidoId, setPedidoId] = useState("")

  // Estados do formulário
  const [formData, setFormData] = useState({
    // Dados pessoais
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    password: "",
    confirmPassword: "",

    // Endereço
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",

    // Pagamento
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    pixKey: "",

    // Termos
    acceptTerms: false,
    acceptNewsletter: false,
  })

  const [pixGenerated, setPixGenerated] = useState(false)
  const [pixCode, setPixCode] = useState("")
  const [pixQRCode, setPixQRCode] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})\d+?$/, "$1")
  }

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\/\d{2})\d+?$/, "$1")
  }

  const buscarCEP = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()
        if (!data.erro) {
          handleInputChange("street", data.logradouro)
          handleInputChange("neighborhood", data.bairro)
          handleInputChange("city", data.localidade)
          handleInputChange("state", data.uf)
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error)
      }
    }
  }

  const generatePixCode = () => {
    // Simular geração de código PIX
    const pixKey = "pix@pbshopping.com.br"
    const amount = total.toFixed(2).replace(".", "")
    const identifier = `PB${Date.now().toString().slice(-6)}`

    // Código PIX simulado (em produção seria gerado pelo backend)
    const pixCodeGenerated = `00020126580014br.gov.bcb.pix0136${pixKey}0208${identifier}5204000053039865802BR5913PB Shopping6009Pato Branco62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    setPixCode(pixCodeGenerated)
    setPixQRCode(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCodeGenerated)}`,
    )
    setPixGenerated(true)
  }

  const processPayment = async () => {
    setIsProcessing(true)

    if (paymentMethod === "pix" && !pixGenerated) {
      generatePixCode()
      setIsProcessing(false)
      return
    }

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Criar o pedido no contexto
    const lojaEscolhida = lojasDisponiveis.find((loja) => loja.id.toString() === selectedStore)

    const dadosPedido = {
      dataCompra: new Date().toISOString(),
      dataEntrega: new Date(
<<<<<<< HEAD
        Date.now() + (deliveryType === "retirada" ? 6 * 60 * 60 * 1000 : 3 * 24 * 60 * 60 * 1000),
      ).toISOString(),
      tipoEntrega: deliveryType,
      total,
      desconto: discount,
      frete: shipping,
      metodoPagamento: paymentMethod === "credit" ? "Cartão de Crédito" : paymentMethod === "pix" ? "PIX" : "Boleto",
      status: "pendente", // ou o valor inicial adequado para status
=======
        Date.now() +
          (deliveryType === "retirada"
            ? 6 * 60 * 60 * 1000
            : 3 * 24 * 60 * 60 * 1000)
      ).toISOString(),
      tipoEntrega: deliveryType as "entrega" | "retirada",
      total,
      desconto: discount,
      frete: shipping,
      metodoPagamento:
        paymentMethod === "credit"
          ? "Cartão de Crédito"
          : paymentMethod === "pix"
          ? "PIX"
          : "Boleto",
      status: "confirmado",
>>>>>>> testes
      cliente: {
        nome: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        telefone: formData.phone,
      },
      endereco:
        deliveryType === "entrega"
          ? {
              rua: `${formData.street}, ${formData.number}`,
              bairro: formData.neighborhood,
              cidade: formData.city,
              estado: formData.state,
              cep: formData.cep,
            }
          : undefined,
      loja:
        deliveryType === "retirada" && lojaEscolhida
          ? {
              nome: lojaEscolhida.nome,
              endereco: lojaEscolhida.endereco,
              telefone: lojaEscolhida.telefone,
              horario: lojaEscolhida.horario,
            }
          : undefined,
      itens: items.map((item) => ({
        id: item.id,
        nome: item.name,
        preco: item.discountPrice,
        quantidade: item.quantity,
        imagem: item.image,
      })),
<<<<<<< HEAD
    }

    const novoId = criarPedido(dadosPedido)
=======
    };

    const novoId = criarPedido(dadosPedido);
>>>>>>> testes
    setPedidoId(novoId)
    clearCart()
    setIsProcessing(false)
    setStep(4) // Página de sucesso
  }

  const subtotal = getSubtotal()
  const shipping = deliveryType === "retirada" ? 0 : subtotal > 200 ? 0 : 15.9
  const discount = getDiscountAmount()
  const total = subtotal + shipping - discount

  if (items.length === 0) {
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
            <h1 className="text-xl md:text-2xl font-bold mb-4">Carrinho vazio</h1>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Adicione produtos ao carrinho para finalizar a compra.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Página de sucesso
  if (step === 4) {
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
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-green-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Pedido Confirmado!</h1>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  Seu pedido foi processado com sucesso. Você receberá um e-mail de confirmação em breve.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600">Número do Pedido</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">#PB{pedidoId}</div>
                </div>

                {deliveryType === "retirada" && selectedStore && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-2">Retirada na Loja</h3>
                    <div className="text-sm text-gray-700">
                      <p>{lojasDisponiveis.find((loja) => loja.id.toString() === selectedStore)?.nome}</p>
                      <p className="text-xs mt-1">
                        Seu pedido estará pronto em{" "}
                        {lojasDisponiveis.find((loja) => loja.id.toString() === selectedStore)?.tempoPreparacao}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Link href="/">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      Continuar Comprando
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-transparent"
                    onClick={() => router.push(`/pedidos/${pedidoId}`)}
                  >
                    Acompanhar Pedido
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Substituir a seção de lojas disponíveis por:
  const getLojasDosProdutos = () => {
    const lojasUnicas = new Set()
    items.forEach((item) => {
      lojasUnicas.add(item.storeName)
    })

    return lojasDisponiveis.filter((loja) =>
      Array.from(lojasUnicas).some((storeName) => loja.nome.includes(storeName as string)),
    )
  }

  const lojasDosProdutos = getLojasDosProdutos()

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
              <Link href="/carrinho" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold hidden sm:inline">Voltar ao Carrinho</span>
                <span className="font-semibold sm:hidden">Voltar</span>
              </Link>
              <h1 className="text-lg md:text-2xl font-bold">Finalizar Compra</h1>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                <span className="text-xs md:text-sm text-green-600 hidden sm:inline">Compra Segura</span>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="bg-white/90 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {[
                { num: 1, label: "Dados", fullLabel: "Dados Pessoais", icon: User },
                { num: 2, label: "Entrega", fullLabel: "Entrega", icon: deliveryType === "retirada" ? Store : MapPin },
                { num: 3, label: "Pagamento", fullLabel: "Pagamento", icon: CreditCard },
              ].map(({ num, label, fullLabel, icon: Icon }) => (
                <div key={num} className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                      step >= num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > num ? (
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <Icon className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                  </div>
                  <span
                    className={`text-xs md:text-sm ${step >= num ? "text-blue-600 font-semibold" : "text-gray-600"}`}
                  >
                    <span className="md:hidden">{label}</span>
                    <span className="hidden md:inline">{fullLabel}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Formulário */}
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-md shadow-xl">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">
                    {step === 1 && "Dados Pessoais"}
                    {step === 2 && (deliveryType === "retirada" ? "Retirada na Loja" : "Endereço de Entrega")}
                    {step === 3 && "Método de Pagamento"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
                  {/* Step 1: Dados Pessoais */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Nome *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="Seu nome"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Sobrenome *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Seu sobrenome"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="seu@email.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Telefone *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", formatPhone(e.target.value))}
                            placeholder="(11) 99999-9999"
                            maxLength={15}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cpf">CPF *</Label>
                          <Input
                            id="cpf"
                            value={formData.cpf}
                            onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                            placeholder="000.000.000-00"
                            maxLength={14}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="birthDate">Data de Nascimento *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="password">Senha *</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              placeholder="Mínimo 6 caracteres"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            placeholder="Confirme sua senha"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={
                          !formData.firstName ||
                          !formData.lastName ||
                          !formData.email ||
                          !formData.phone ||
                          !formData.cpf
                        }
                      >
                        Continuar para Entrega
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Entrega/Retirada */}
                  {step === 2 && (
                    <div className="space-y-6">
                      {/* Tipo de Entrega */}
                      <div>
                        <Label className="text-base font-semibold mb-4 block">Como você quer receber?</Label>
                        <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="entrega" id="entrega" />
                            <div className="flex items-center space-x-3 flex-1">
                              <Truck className="w-5 h-5 text-blue-600" />
                              <div>
                                <Label htmlFor="entrega" className="font-medium">
                                  Entrega em Casa
                                </Label>
                                <p className="text-sm text-gray-600">
                                  {subtotal > 200 ? "Frete grátis" : "Frete R$ 15,90"} - 3 a 5 dias úteis
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value="retirada" id="retirada" />
                            <div className="flex items-center space-x-3 flex-1">
                              <Store className="w-5 h-5 text-green-600" />
                              <div>
                                <Label htmlFor="retirada" className="font-medium">
                                  Retirar na Loja
                                </Label>
                                <p className="text-sm text-gray-600">Sem custo de frete - Pronto em algumas horas</p>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Endereço de Entrega */}
                      {deliveryType === "entrega" && (
                        <div className="space-y-4">
                          <h3 className="font-semibold">Endereço de Entrega</h3>
                          <div>
                            <Label htmlFor="cep">CEP *</Label>
                            <Input
                              id="cep"
                              value={formData.cep}
                              onChange={(e) => {
                                const cep = e.target.value.replace(/\D/g, "")
                                handleInputChange("cep", cep)
                                if (cep.length === 8) {
                                  buscarCEP(cep)
                                }
                              }}
                              placeholder="00000-000"
                              maxLength={8}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                              <Label htmlFor="street">Rua *</Label>
                              <Input
                                id="street"
                                value={formData.street}
                                onChange={(e) => handleInputChange("street", e.target.value)}
                                placeholder="Nome da rua"
                              />
                            </div>
                            <div>
                              <Label htmlFor="number">Número *</Label>
                              <Input
                                id="number"
                                value={formData.number}
                                onChange={(e) => handleInputChange("number", e.target.value)}
                                placeholder="123"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="complement">Complemento</Label>
                            <Input
                              id="complement"
                              value={formData.complement}
                              onChange={(e) => handleInputChange("complement", e.target.value)}
                              placeholder="Apartamento, bloco, etc."
                            />
                          </div>

                          <div>
                            <Label htmlFor="neighborhood">Bairro *</Label>
                            <Input
                              id="neighborhood"
                              value={formData.neighborhood}
                              onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                              placeholder="Nome do bairro"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city">Cidade *</Label>
                              <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                placeholder="Nome da cidade"
                              />
                            </div>
                            <div>
                              <Label htmlFor="state">Estado *</Label>
                              <Input
                                id="state"
                                value={formData.state}
                                onChange={(e) => handleInputChange("state", e.target.value)}
                                placeholder="UF"
                                maxLength={2}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Seleção de Loja */}
                      {deliveryType === "retirada" && (
                        <div className="space-y-4">
                          <h3 className="font-semibold">Escolha a loja para retirada</h3>
                          <div className="space-y-3">
                            {lojasDosProdutos.map((loja) => (
                              <div
                                key={loja.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                  selectedStore === loja.id.toString()
                                    ? "border-blue-500 bg-blue-50"
                                    : loja.disponivel
                                      ? "border-gray-200 hover:border-gray-300"
                                      : "border-gray-100 bg-gray-50 cursor-not-allowed"
                                }`}
                                onClick={() => loja.disponivel && setSelectedStore(loja.id.toString())}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h4 className="font-semibold text-sm md:text-base">{loja.nome}</h4>
                                      {!loja.disponivel && (
                                        <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                                          Indisponível
                                        </Badge>
                                      )}
                                    </div>

                                    {/* Mostrar produtos disponíveis nesta loja */}
                                    <div className="mb-3">
                                      <p className="text-xs text-gray-500 mb-1">Produtos disponíveis:</p>
                                      <div className="space-y-1">
                                        {items
                                          .filter((item) => loja.nome.includes(item.storeName))
                                          .map((item) => (
                                            <div
                                              key={item.id}
                                              className="text-xs text-gray-600 flex items-center space-x-2"
                                            >
                                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                              <span>
                                                {item.name} (Qtd: {item.quantity})
                                              </span>
                                            </div>
                                          ))}
                                      </div>
                                    </div>

                                    <div className="space-y-1 text-sm text-gray-600">
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-xs md:text-sm">{loja.endereco}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-xs md:text-sm">{loja.telefone}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-xs md:text-sm">{loja.horario}</span>
                                      </div>
                                      {loja.disponivel && (
                                        <div className="flex items-center space-x-2 text-green-600">
                                          <CheckCircle className="w-4 h-4" />
                                          <span className="text-xs md:text-sm">Pronto em {loja.tempoPreparacao}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {selectedStore === loja.id.toString() && (
                                    <CheckCircle className="w-5 h-5 text-blue-600" />
                                  )}
                                </div>
                              </div>
                            ))}
                            {lojasDosProdutos.length === 0 && (
                              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                                <h3 className="text-lg font-semibold mb-2">Retirada não disponível</h3>
                                <p className="text-gray-600 text-sm">
                                  Os produtos em seu carrinho não estão disponíveis para retirada em loja no momento.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                          Voltar
                        </Button>
                        <Button
                          onClick={() => setStep(3)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          disabled={
                            deliveryType === "entrega"
                              ? !formData.cep ||
                                !formData.street ||
                                !formData.number ||
                                !formData.neighborhood ||
                                !formData.city ||
                                !formData.state
                              : !selectedStore || lojasDosProdutos.length === 0
                          }
                        >
                          Continuar para Pagamento
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Pagamento */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="credit" className="text-xs md:text-sm">
                            Cartão
                          </TabsTrigger>
                          <TabsTrigger value="pix" className="text-xs md:text-sm">
                            PIX
                          </TabsTrigger>
                          <TabsTrigger value="boleto" className="text-xs md:text-sm">
                            Boleto
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="credit" className="space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Número do Cartão *</Label>
                            <Input
                              id="cardNumber"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                              placeholder="0000 0000 0000 0000"
                              maxLength={19}
                            />
                          </div>

                          <div>
                            <Label htmlFor="cardName">Nome no Cartão *</Label>
                            <Input
                              id="cardName"
                              value={formData.cardName}
                              onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
                              placeholder="NOME COMO NO CARTÃO"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Validade *</Label>
                              <Input
                                id="expiryDate"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                                placeholder="MM/AA"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Parcelas</Label>
                            <RadioGroup value={installments} onValueChange={setInstallments}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1" id="1x" />
                                <Label htmlFor="1x" className="text-sm">
                                  1x de R$ {total.toFixed(2)} sem juros
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="2" id="2x" />
                                <Label htmlFor="2x" className="text-sm">
                                  2x de R$ {(total / 2).toFixed(2)} sem juros
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3" id="3x" />
                                <Label htmlFor="3x" className="text-sm">
                                  3x de R$ {(total / 3).toFixed(2)} sem juros
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="6" id="6x" />
                                <Label htmlFor="6x" className="text-sm">
                                  6x de R$ {(total / 6).toFixed(2)} sem juros
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="12" id="12x" />
                                <Label htmlFor="12x" className="text-sm">
                                  12x de R$ {(total / 12).toFixed(2)} sem juros
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </TabsContent>

                        <TabsContent value="pix" className="space-y-4">
                          {!pixGenerated ? (
                            <div className="text-center p-6 bg-blue-50 rounded-lg">
                              <Smartphone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                              <h3 className="text-lg font-semibold mb-2">Pagamento via PIX</h3>
                              <p className="text-gray-600 mb-4 text-sm">
                                Clique em "Gerar PIX" para criar o código de pagamento.
                              </p>
                              <Badge className="bg-green-100 text-green-800 mb-4">Aprovação instantânea</Badge>
                              <Button onClick={generatePixCode} className="w-full bg-blue-600 hover:bg-blue-700">
                                Gerar Código PIX
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">PIX Gerado com Sucesso!</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  Escaneie o QR Code ou copie o código abaixo para realizar o pagamento
                                </p>
                                <Badge className="bg-green-100 text-green-800">Válido por 30 minutos</Badge>
                              </div>

                              {/* QR Code */}
                              <div className="text-center p-6 bg-white rounded-lg border-2 border-dashed border-blue-300">
                                <img
                                  src={pixQRCode || "/placeholder.svg"}
                                  alt="QR Code PIX"
                                  className="mx-auto mb-4"
                                  width={200}
                                  height={200}
                                />
                                <p className="text-sm text-gray-600">Escaneie com o app do seu banco</p>
                              </div>

                              {/* Código Copia e Cola */}
                              <div className="space-y-2">
                                <Label className="text-sm font-semibold">Código PIX (Copia e Cola):</Label>
                                <div className="relative">
                                  <textarea
                                    value={pixCode}
                                    readOnly
                                    className="w-full p-3 text-xs bg-gray-50 border rounded-lg resize-none h-20 font-mono"
                                  />
                                  <Button
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => {
                                      navigator.clipboard.writeText(pixCode)
                                      alert("Código PIX copiado!")
                                    }}
                                  >
                                    Copiar
                                  </Button>
                                </div>
                              </div>

                              {/* Instruções */}
                              <div className="bg-yellow-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2">Como pagar:</h4>
                                <ol className="text-sm text-gray-700 space-y-1">
                                  <li>1. Abra o app do seu banco</li>
                                  <li>2. Escolha a opção PIX</li>
                                  <li>3. Escaneie o QR Code ou cole o código</li>
                                  <li>4. Confirme o pagamento</li>
                                </ol>
                              </div>

                              {/* Dados do Pagamento */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">Beneficiário:</span>
                                    <div className="font-semibold">PB Shopping</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Valor:</span>
                                    <div className="font-semibold text-green-600">R$ {total.toFixed(2)}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Chave PIX:</span>
                                    <div className="font-semibold text-xs">pix@pbshopping.com.br</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Identificador:</span>
                                    <div className="font-semibold">PB{Date.now().toString().slice(-6)}</div>
                                  </div>
                                </div>
                              </div>

                              <Button onClick={() => setPixGenerated(false)} variant="outline" className="w-full">
                                Gerar Novo Código
                              </Button>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="boleto" className="space-y-4">
                          <div className="text-center p-6 bg-orange-50 rounded-lg">
                            <Receipt className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                            <h3 className="text-lg font-semibold mb-2">Pagamento via Boleto</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                              O boleto será gerado após a confirmação do pedido.
                            </p>
                            <Badge className="bg-orange-100 text-orange-800">Vencimento em 3 dias úteis</Badge>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={formData.acceptTerms}
                            onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                          />
                          <Label htmlFor="terms" className="text-sm">
                            Aceito os{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                              termos de uso
                            </a>{" "}
                            e
                            <a href="#" className="text-blue-600 hover:underline ml-1">
                              política de privacidade
                            </a>{" "}
                            *
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.acceptNewsletter}
                            onCheckedChange={(checked) => handleInputChange("acceptNewsletter", checked as boolean)}
                          />
                          <Label htmlFor="newsletter" className="text-sm">
                            Quero receber ofertas e novidades por e-mail
                          </Label>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                          Voltar
                        </Button>
                        <Button
                          onClick={processPayment}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={!formData.acceptTerms || isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processando...
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              {paymentMethod === "pix" && !pixGenerated ? "Gerar PIX" : "Finalizar Compra"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div>
              <Card className="bg-white/90 backdrop-blur-md shadow-xl sticky top-4">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6">
                  <div className="space-y-3">
                    {items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                          <div className="text-xs text-gray-500">Qtd: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-semibold">
                          R$ {(item.discountPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="text-sm text-gray-500 text-center">+{items.length - 3} outros produtos</div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({getTotalItems()} itens)</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Frete</span>
                      <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                        {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {discount > 0 && cupomAplicado && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Desconto ({cupomAplicado.codigo})</span>
                        <span>-R$ {discount.toFixed(2)}</span>
                      </div>
                    )}
                    {deliveryType === "retirada" && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Economia no frete:</span>
                        <span>R$ 15,90</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">R$ {total.toFixed(2)}</span>
                  </div>

                  {paymentMethod === "credit" && installments !== "1" && (
                    <div className="text-sm text-center text-gray-600 bg-gray-50 p-2 rounded">
                      {installments}x de R$ {(total / Number.parseInt(installments)).toFixed(2)} sem juros
                    </div>
                  )}

                  {deliveryType === "retirada" && selectedStore && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Retirada na Loja</h4>
                      <p className="text-xs text-gray-600">
                        {lojasDisponiveis.find((loja) => loja.id.toString() === selectedStore)?.nome}
                      </p>
                      <p className="text-xs text-green-600">
                        Pronto em{" "}
                        {lojasDisponiveis.find((loja) => loja.id.toString() === selectedStore)?.tempoPreparacao}
                      </p>
                    </div>
                  )}

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Compra 100% segura</span>
                    </div>
                    <div className="text-xs text-gray-600">🔄 Troca grátis em 30 dias</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
