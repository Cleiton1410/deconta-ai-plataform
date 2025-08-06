"use client"

import { useState, useEffect, useMemo } from "react"
<<<<<<< HEAD
import { Search, Filter, Heart, ShoppingCart, Star, Leaf, Zap, TrendingUp } from "lucide-react"
=======
import { Search, Filter, Heart, ShoppingCart, Star, Leaf, Zap, TrendingUp, Menu, X } from 'lucide-react'
>>>>>>> testes
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { stores } from "@/app/data/stores"

export default function DescontAiPlatform() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("discount")
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
<<<<<<< HEAD
=======
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
>>>>>>> testes

  const { addToCart, getTotalItems } = useCart()

  const categories = [
    "all",
    "Eletrônicos",
    "Moda",
    "Casa & Decoração",
    "Esportes",
    "Beleza",
    "Livros",
    "Games",
    "Saúde",
    "Pet Shop",
    "Sustentável",
  ]

  const allProducts = useMemo(
    () =>
      stores.flatMap((store) =>
        store.products.map((product) => ({ ...product, storeName: store.name, storeColor: store.color })),
      ),
    [],
  )

  const filteredStores = useMemo(
    () => stores.filter((store) => selectedCategory === "all" || store.category === selectedCategory),
    [selectedCategory],
  )

  const filteredProducts = useMemo(
    () =>
      allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "all" ||
            stores.find((s) => s.name === product.storeName)?.category === selectedCategory),
      ),
    [allProducts, searchTerm, selectedCategory],
  )

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "discount":
          return b.discount - a.discount
        case "price":
          return a.discountPrice - b.discountPrice
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })
  }, [filteredProducts, sortBy])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const totalSavings = useMemo(
    () => allProducts.reduce((total, product) => total + (product.originalPrice - product.discountPrice), 0),
    [allProducts],
  )

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  const getStoreSlug = (storeName: string) => {
    const slug = storeName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "e")
      .replace(/[^a-z0-9-]/g, "")
<<<<<<< HEAD
    console.log(`Store: ${storeName} -> Slug: ${slug}`)
=======
>>>>>>> testes
    return slug
  }

  const searchProducts = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setIsSearching(true)
    setShowSearchResults(true)

<<<<<<< HEAD
    // Simular delay de busca
=======
>>>>>>> testes
    setTimeout(() => {
      const results = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.storeName.toLowerCase().includes(query.toLowerCase()),
        )
<<<<<<< HEAD
        .slice(0, 8) // Limitar a 8 resultados
=======
        .slice(0, 8)
>>>>>>> testes

      setSearchResults(results)
      setIsSearching(false)
    }, 300)
  }

<<<<<<< HEAD
  // Debounce para a busca
=======
>>>>>>> testes
  const debounceSearch = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }

  const debouncedSearch = useMemo(() => debounceSearch(searchProducts, 300), [allProducts])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".search-container")) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
        <header className="bg-transparent shadow-lg border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">PB Shopping</h1>
                <Badge variant="secondary" className="bg-green-500/90 text-white border-0 hidden sm:flex">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco-Friendly
                </Badge>
              </div>
<<<<<<< HEAD
              <div className="flex items-center space-x-4">
=======

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-4">
>>>>>>> testes
                <div className="relative search-container">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                  <Input
                    placeholder="Buscar produtos..."
                    className="pl-10 w-64 bg-white/90 backdrop-blur-sm border-white/30"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      debouncedSearch(e.target.value)
                    }}
                    onFocus={() => {
                      if (searchTerm && searchResults.length > 0) {
                        setShowSearchResults(true)
                      }
                    }}
                  />
                  {showSearchResults && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 z-50 max-h-96 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-4 text-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Buscando...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="p-2">
                          <div className="text-xs text-gray-500 px-3 py-2 border-b">
                            {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} encontrado
                            {searchResults.length !== 1 ? "s" : ""}
                          </div>
                          {searchResults.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                              onClick={() => {
                                handleAddToCart(product)
                                setShowSearchResults(false)
                                setSearchTerm("")
                              }}
                            >
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium truncate">{product.name}</h4>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs px-2 py-1 rounded text-white ${product.storeColor}`}>
                                    {product.storeName}
                                  </span>
                                  <Badge className="bg-red-500 text-white text-xs">-{product.discount}%</Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-green-600">
                                  R$ {product.discountPrice.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 line-through">
                                  R$ {product.originalPrice.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="text-center p-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedCategory("all")
                                setShowSearchResults(false)
                              }}
                              className="text-xs"
                            >
                              Ver todos os resultados
                            </Button>
                          </div>
                        </div>
                      ) : (
                        searchTerm && (
                          <div className="p-4 text-center">
                            <p className="text-sm text-gray-600">Nenhum produto encontrado para "{searchTerm}"</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSearchTerm("")
                                setShowSearchResults(false)
                              }}
                              className="text-xs mt-2"
                            >
                              Limpar busca
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/90 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos ({favorites.length})
                </Button>
                <Link href="/carrinho">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white relative"
                  >
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

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/90 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
                  <h2 className="text-lg font-bold">Menu</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:bg-blue-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Mobile Search */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar produtos..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        debouncedSearch(e.target.value)
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Mobile Categories */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Categorias</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSelectedCategory(category)
                            setMobileMenuOpen(false)
                          }}
                          className={`text-xs justify-start ${
                            selectedCategory === category
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-800 hover:bg-gray-50"
                          }`}
                        >
                          {category === "all" ? "Todas" : category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Sort */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Ordenar por</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discount">Maior Desconto</SelectItem>
                        <SelectItem value="price">Menor Preço</SelectItem>
                        <SelectItem value="rating">Melhor Avaliação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Favoritos ({favorites.length})</span>
                    </Button>
                    <Link href="/carrinho" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="flex items-center space-x-2 relative">
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-sm">Carrinho</span>
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
            </div>
          </div>
        )}

        {/* Hero Section - Melhorado para mobile */}
        <section className="text-white py-8 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-2xl">
              Encontre os Melhores Descontos no PB Shopping
            </h2>
            <p className="text-sm md:text-xl mb-4 md:mb-8 opacity-90 drop-shadow-lg">
              Mais de 50 produtos em promoção de 10 lojas parceiras
            </p>
            <div className="grid grid-cols-3 gap-2 md:flex md:justify-center md:space-x-8 md:gap-0">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 md:p-4">
                <div className="text-lg md:text-3xl font-bold">R$ {Math.floor(totalSavings / 1000)}k</div>
                <div className="text-xs md:text-sm opacity-75">Total em Economia</div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 md:p-4">
                <div className="text-lg md:text-3xl font-bold">50+</div>
                <div className="text-xs md:text-sm opacity-75">Produtos em Oferta</div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 md:p-4">
                <div className="text-lg md:text-3xl font-bold">10</div>
                <div className="text-xs md:text-sm opacity-75">Lojas Parceiras</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Search Bar */}
        <div className="lg:hidden bg-white/90 backdrop-blur-md border-b border-white/20 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                debouncedSearch(e.target.value)
              }}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mobile Categories Scroll */}
        <div className="lg:hidden bg-white/90 backdrop-blur-md border-b border-white/20 p-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 text-xs ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50"
                }`}
              >
                {category === "all" ? "Todas" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters - Desktop only */}
        <section className="border-b border-white/20 py-4 md:py-6 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                    }`}
                  >
                    {category === "all" ? "Todas" : category}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm drop-shadow-lg">Ordenar por:</span>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Maior Desconto</SelectItem>
                    <SelectItem value="price">Menor Preço</SelectItem>
                    <SelectItem value="rating">Melhor Avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
<<<<<<< HEAD
        <main className="container mx-auto px-4 py-8">
=======
        <main className="container mx-auto px-4 py-4 md:py-8">
>>>>>>> testes
          {selectedCategory === "all" && !searchTerm ? (
            // Store View
            <div className="space-y-6 md:space-y-12">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/30"
                >
                  <div className={`${store.color} p-4 md:p-6 text-white`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <Image
                        src={store.logo || "/placeholder.svg"}
                        alt={store.name}
                        width={40}
                        height={40}
                        className="md:w-[60px] md:h-[60px] rounded-full bg-white p-2"
                      />
<<<<<<< HEAD
                      <div>
                        <Link href={`/loja/${getStoreSlug(store.name)}`}>
                          <h3 className="text-2xl font-bold hover:underline cursor-pointer">{store.name}</h3>
                        </Link>
                        <p className="opacity-90">{store.category}</p>
=======
                      <div className="flex-1">
                        <Link href={`/loja/${getStoreSlug(store.name)}`}>
                          <h3 className="text-lg md:text-2xl font-bold hover:underline cursor-pointer">{store.name}</h3>
                        </Link>
                        <p className="text-sm md:text-base opacity-90">{store.category}</p>
>>>>>>> testes
                      </div>
                      <div>
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs md:text-sm">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Até {Math.max(...store.products.map((p) => p.discount))}% OFF
                        </Badge>
                      </div>
                    </div>
                  </div>

<<<<<<< HEAD
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
=======
                  <div className="p-4 md:p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
>>>>>>> testes
                      {store.products.slice(0, 5).map((product) => (
                        <Card
                          key={product.id}
                          className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/85 backdrop-blur-md shadow-lg"
                        >
                          <CardHeader className="p-2 md:p-4">
                            <div className="relative">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="w-full h-24 md:h-40 object-cover rounded-lg"
                              />
                              <Badge className="absolute top-1 left-1 md:top-2 md:left-2 bg-red-500 text-white text-xs">
                                -{product.discount}%
                              </Badge>
                              {product.eco && (
                                <Badge className="absolute top-1 right-1 md:top-2 md:right-2 bg-green-500 text-white">
                                  <Leaf className="w-2 h-2 md:w-3 md:h-3" />
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-white/80 hover:bg-white p-1 md:p-2"
                                onClick={() => toggleFavorite(product.id)}
                              >
                                <Heart
                                  className={`w-3 h-3 md:w-4 md:h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                                />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-2 md:p-4">
                            <h4 className="font-semibold text-xs md:text-sm mb-1 md:mb-2 line-clamp-2">
                              {product.name}
                            </h4>
                            <div className="flex items-center mb-1 md:mb-2">
                              <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs md:text-sm ml-1">{product.rating}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500 line-through">
                                R$ {product.originalPrice.toLocaleString()}
                              </div>
                              <div className="text-sm md:text-lg font-bold text-green-600">
                                R$ {product.discountPrice.toLocaleString()}
                              </div>
                            </div>
                            <Button
                              className="w-full mt-2 md:mt-3 text-xs md:text-sm py-1 md:py-2"
                              size="sm"
                              onClick={() =>
                                handleAddToCart({ ...product, storeName: store.name, storeColor: store.color })
                              }
                            >
                              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                              Comprar
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
<<<<<<< HEAD
                    <div className="text-center mt-6">
                      <Link href={`/loja/${getStoreSlug(store.name)}`}>
                        <Button variant="outline" className="bg-white/80 hover:bg-white">
=======
                    <div className="text-center mt-4 md:mt-6">
                      <Link href={`/loja/${getStoreSlug(store.name)}`}>
                        <Button variant="outline" className="bg-white/80 hover:bg-white text-xs md:text-sm">
>>>>>>> testes
                          Ver todos os {store.products.length} produtos da {store.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Product Grid View
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/85 backdrop-blur-md shadow-lg"
                >
                  <CardHeader className="p-2 md:p-4">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-32 md:h-48 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-1 left-1 md:top-2 md:left-2 bg-red-500 text-white text-xs">
                        -{product.discount}%
                      </Badge>
                      {product.eco && (
                        <Badge className="absolute top-1 right-1 md:top-2 md:right-2 bg-green-500 text-white">
                          <Leaf className="w-2 h-2 md:w-3 md:h-3" />
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-white/80 hover:bg-white p-1 md:p-2"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart
                          className={`w-3 h-3 md:w-4 md:h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 md:p-4">
                    <div className={`inline-block px-2 py-1 rounded text-xs text-white mb-1 md:mb-2 ${product.storeColor}`}>
                      {product.storeName}
                    </div>
                    <h4 className="font-semibold text-xs md:text-base mb-1 md:mb-2 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center mb-1 md:mb-2">
                      <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs md:text-sm ml-1">{product.rating}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs md:text-sm text-gray-500 line-through">
                        R$ {product.originalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm md:text-xl font-bold text-green-600">
                        R$ {product.discountPrice.toLocaleString()}
                      </div>
                    </div>
                    <Button className="w-full mt-2 md:mt-3 text-xs md:text-sm py-1 md:py-2" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Comprar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Footer - Melhorado para mobile */}
        <footer className="text-white py-8 md:py-12 border-t border-white/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 md:w-5 md:h-5 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold drop-shadow-lg">PB Shopping</h3>
                </div>
                <p className="text-white/80 drop-shadow-lg text-sm md:text-base">
                  A plataforma que conecta você aos melhores descontos do PB Shopping de forma sustentável e
                  inteligente.
                </p>
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4 drop-shadow-lg">Categorias</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="drop-shadow-lg">Eletrônicos</li>
                  <li className="drop-shadow-lg">Moda</li>
                  <li className="drop-shadow-lg">Casa & Decoração</li>
                  <li className="drop-shadow-lg">Esportes</li>
                </ul>
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4 drop-shadow-lg">Sustentabilidade</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="drop-shadow-lg">Produtos Eco-Friendly</li>
                  <li className="drop-shadow-lg">Consumo Consciente</li>
                  <li className="drop-shadow-lg">Impacto Ambiental</li>
                  <li className="drop-shadow-lg">ESG</li>
                </ul>
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4 drop-shadow-lg">Contato</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="drop-shadow-lg">contato@pbshopping.com</li>
                  <li className="drop-shadow-lg">(11) 9999-9999</li>
                  <li className="drop-shadow-lg">São Paulo, SP</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-white/80">
              <p className="drop-shadow-lg text-sm">
                &copy; 2024 PB Shopping. Todos os direitos reservados. Plataforma sustentável de descontos.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
