"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, Heart, ShoppingCart, Star, Leaf, MapPin, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { stores } from "@/app/data/stores"

interface LojaPageProps {
  params: {
    slug: string
  }
}

export default function LojaPage({ params }: LojaPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("discount")
  const [favorites, setFavorites] = useState<number[]>([])

  const { addToCart, getTotalItems } = useCart()

  // Encontrar a loja pelo slug
  const store = stores.find((s) => s.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "e") === params.slug)

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loja não encontrada</h1>
          <Link href="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    )
  }

  const filteredProducts = store.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        return b.discount - a.discount
      case "price":
        return a.discountPrice - b.discountPrice
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, storeName: store.name, storeColor: store.color })
  }

  const averageDiscount = Math.round(
    store.products.reduce((acc, product) => acc + product.discount, 0) / store.products.length,
  )

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
              <Link href="/" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Voltar ao PB Shopping</span>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar na loja..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Link href="/carrinho">
                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Carrinho
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Store Header */}
        <section className={`${store.color} text-white py-12`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-6 mb-8">
              <Image
                src={store.logo || "/placeholder.svg"}
                alt={store.name}
                width={100}
                height={100}
                className="rounded-full bg-white p-3 shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{store.name}</h1>
                <p className="text-xl opacity-90 mb-4">{store.category}</p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Piso 2 - Ala Norte</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>10h às 22h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>(46) 3220-1234</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <div className="text-3xl font-bold">{store.products.length}</div>
                  <div className="text-sm opacity-75">Produtos</div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Até {Math.max(...store.products.map((p) => p.discount))}% OFF
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{averageDiscount}%</div>
                <div className="text-sm opacity-75">Desconto Médio</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{store.products.filter((p) => p.rating >= 4.5).length}</div>
                <div className="text-sm opacity-75">Produtos 4.5★+</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{store.products.filter((p) => p.eco).length}</div>
                <div className="text-sm opacity-75">Eco-Friendly</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">Frete</div>
                <div className="text-sm opacity-75">Grátis acima R$200</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white/90 backdrop-blur-md border-b py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">{filteredProducts.length} produtos encontrados</span>
                {searchTerm && (
                  <Badge variant="outline">
                    Buscando por: "{searchTerm}"
                    <button onClick={() => setSearchTerm("")} className="ml-2 text-gray-500 hover:text-gray-700">
                      ×
                    </button>
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Ordenar por:</span>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Maior Desconto</SelectItem>
                    <SelectItem value="price">Menor Preço</SelectItem>
                    <SelectItem value="rating">Melhor Avaliação</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/90 backdrop-blur-md shadow-lg"
              >
                <CardHeader className="p-4">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
                    {product.eco && (
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                        <Leaf className="w-3 h-3" />
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">
                      R$ {product.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-xl font-bold text-green-600">R$ {product.discountPrice.toLocaleString()}</div>
                  </div>
                  <Button className="w-full mt-3" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-4">Tente buscar por outro termo ou limpe os filtros.</p>
                <Button onClick={() => setSearchTerm("")}>Limpar Busca</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
