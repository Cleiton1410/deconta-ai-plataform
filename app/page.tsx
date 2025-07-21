"use client"

import { useState } from "react"
import { Search, Filter, Heart, ShoppingCart, Star, Leaf, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

// Função para gerar URLs de imagens do Unsplash baseadas no produto
const getProductImage = (productName: string, category: string) => {
  const searchTerms = {
    "Smartphone Galaxy Pro": "smartphone-samsung-galaxy",
    "Notebook UltraBook": "laptop-macbook-computer",
    "Fone Bluetooth Premium": "wireless-headphones-bluetooth",
    "Tablet 10 polegadas": "tablet-ipad-technology",
    "Smartwatch Fitness": "smartwatch-apple-watch",
    "Vestido Elegante": "elegant-dress-fashion",
    "Jaqueta Jeans Premium": "denim-jacket-fashion",
    "Tênis Casual Confort": "sneakers-casual-shoes",
    "Bolsa Executiva": "leather-handbag-business",
    "Óculos de Sol Fashion": "sunglasses-fashion-style",
    "Sofá 3 Lugares Premium": "modern-sofa-living-room",
    "Mesa de Jantar 6 Lugares": "dining-table-wooden",
    "Luminária LED Moderna": "modern-lamp-led-light",
    "Tapete Decorativo": "decorative-rug-carpet",
    "Conjunto de Panelas": "cookware-set-kitchen",
    "Bicicleta Mountain Bike": "mountain-bike-cycling",
    "Kit Musculação Completo": "gym-equipment-weights",
    "Tênis Running Pro": "running-shoes-sport",
    "Prancha de Surf": "surfboard-ocean-sport",
    "Raquete de Tênis Pro": "tennis-racket-sport",
    "Kit Skincare Completo": "skincare-beauty-cosmetics",
    "Perfume Importado 100ml": "perfume-bottle-luxury",
    "Paleta de Maquiagem": "makeup-palette-cosmetics",
    "Secador Profissional": "hair-dryer-professional",
    "Kit Unhas Gel": "nail-polish-manicure",
    "Coleção Harry Potter": "harry-potter-books",
    "Livro de Programação": "programming-book-code",
    "Romance Bestseller": "romance-novel-book",
    "Enciclopédia Ilustrada": "encyclopedia-books-education",
    "Livro de Receitas Gourmet": "cookbook-recipe-food",
    "Console Next-Gen": "gaming-console-playstation",
    "Jogo AAA Lançamento": "video-game-controller",
    "Controle Wireless Pro": "gaming-controller-wireless",
    "Headset Gamer RGB": "gaming-headset-rgb",
    "Cadeira Gamer Ergonômica": "gaming-chair-ergonomic",
    "Suplemento Whey Protein": "protein-powder-supplement",
    "Vitamina C 1000mg": "vitamin-c-supplements",
    "Ômega 3 Premium": "omega-3-fish-oil",
    "Colágeno Hidrolisado": "collagen-supplement-health",
    "Kit Primeiros Socorros": "first-aid-kit-medical",
    "Ração Premium Cães 15kg": "dog-food-premium-pet",
    "Casinha para Cães": "dog-house-pet-home",
    "Brinquedo Interativo": "dog-toy-interactive-pet",
    "Coleira GPS Smart": "smart-dog-collar-gps",
    "Kit Higiene Pet": "pet-grooming-hygiene",
    "Painel Solar Portátil": "solar-panel-portable-energy",
    "Garrafa Térmica Bambu": "bamboo-water-bottle-eco",
    "Kit Horta Vertical": "vertical-garden-plants",
    "Sacolas Reutilizáveis": "reusable-bags-eco-friendly",
    "Composteira Doméstica": "compost-bin-organic-waste",
  }

  const searchTerm = searchTerms[productName as keyof typeof searchTerms] || category.toLowerCase()
  return `https://images.unsplash.com/photo-1${Math.floor(Math.random() * 600000000) + 500000000}-${Math.floor(Math.random() * 900000000) + 100000000}?w=400&h=400&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
}

// Dados das lojas e produtos com imagens reais
const stores = [
  {
    id: 1,
    name: "TechMania",
    category: "Eletrônicos",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-blue-500",
    products: [
      {
        id: 1,
        name: "Smartphone Galaxy Pro",
        originalPrice: 2499,
        discountPrice: 1899,
        discount: 24,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: false,
      },
      {
        id: 2,
        name: "Notebook UltraBook",
        originalPrice: 3999,
        discountPrice: 2999,
        discount: 25,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: true,
      },
      {
        id: 3,
        name: "Fone Bluetooth Premium",
        originalPrice: 599,
        discountPrice: 399,
        discount: 33,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: false,
      },
      {
        id: 4,
        name: "Tablet 10 polegadas",
        originalPrice: 1299,
        discountPrice: 899,
        discount: 31,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: false,
      },
      {
        id: 5,
        name: "Smartwatch Fitness",
        originalPrice: 899,
        discountPrice: 599,
        discount: 33,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.4,
        eco: true,
      },
    ],
  },
  {
    id: 2,
    name: "ModaStyle",
    category: "Moda",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-pink-500",
    products: [
      {
        id: 6,
        name: "Vestido Elegante",
        originalPrice: 299,
        discountPrice: 179,
        discount: 40,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.9,
        eco: true,
      },
      {
        id: 7,
        name: "Jaqueta Jeans Premium",
        originalPrice: 399,
        discountPrice: 239,
        discount: 40,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: false,
      },
      {
        id: 8,
        name: "Tênis Casual Confort",
        originalPrice: 249,
        discountPrice: 149,
        discount: 40,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: true,
      },
      {
        id: 9,
        name: "Bolsa Executiva",
        originalPrice: 199,
        discountPrice: 119,
        discount: 40,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: false,
      },
      {
        id: 10,
        name: "Óculos de Sol Fashion",
        originalPrice: 159,
        discountPrice: 95,
        discount: 40,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: false,
      },
    ],
  },
  {
    id: 3,
    name: "CasaBela",
    category: "Casa & Decoração",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-green-500",
    products: [
      {
        id: 11,
        name: "Sofá 3 Lugares Premium",
        originalPrice: 1999,
        discountPrice: 1399,
        discount: 30,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: true,
      },
      {
        id: 12,
        name: "Mesa de Jantar 6 Lugares",
        originalPrice: 1299,
        discountPrice: 899,
        discount: 31,
        image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: true,
      },
      {
        id: 13,
        name: "Luminária LED Moderna",
        originalPrice: 299,
        discountPrice: 199,
        discount: 33,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: true,
      },
      {
        id: 14,
        name: "Tapete Decorativo",
        originalPrice: 199,
        discountPrice: 129,
        discount: 35,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: false,
      },
      {
        id: 15,
        name: "Conjunto de Panelas",
        originalPrice: 399,
        discountPrice: 249,
        discount: 38,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.4,
        eco: false,
      },
    ],
  },
  {
    id: 4,
    name: "SportMax",
    category: "Esportes",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-orange-500",
    products: [
      {
        id: 16,
        name: "Bicicleta Mountain Bike",
        originalPrice: 1599,
        discountPrice: 1199,
        discount: 25,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.9,
        eco: false,
      },
      {
        id: 17,
        name: "Kit Musculação Completo",
        originalPrice: 899,
        discountPrice: 629,
        discount: 30,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: false,
      },
      {
        id: 18,
        name: "Tênis Running Pro",
        originalPrice: 399,
        discountPrice: 279,
        discount: 30,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: true,
      },
      {
        id: 19,
        name: "Prancha de Surf",
        originalPrice: 799,
        discountPrice: 559,
        discount: 30,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: false,
      },
      {
        id: 20,
        name: "Raquete de Tênis Pro",
        originalPrice: 299,
        discountPrice: 199,
        discount: 33,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: false,
      },
    ],
  },
  {
    id: 5,
    name: "BeautyZone",
    category: "Beleza",
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-purple-500",
    products: [
      {
        id: 21,
        name: "Kit Skincare Completo",
        originalPrice: 299,
        discountPrice: 179,
        discount: 40,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.9,
        eco: true,
      },
      {
        id: 22,
        name: "Perfume Importado 100ml",
        originalPrice: 399,
        discountPrice: 239,
        discount: 40,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: false,
      },
      {
        id: 23,
        name: "Paleta de Maquiagem",
        originalPrice: 199,
        discountPrice: 119,
        discount: 40,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: false,
      },
      {
        id: 24,
        name: "Secador Profissional",
        originalPrice: 299,
        discountPrice: 179,
        discount: 40,
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: false,
      },
      {
        id: 25,
        name: "Kit Unhas Gel",
        originalPrice: 159,
        discountPrice: 95,
        discount: 40,
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: true,
      },
    ],
  },
  {
    id: 6,
    name: "BookWorld",
    category: "Livros",
    logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-indigo-500",
    products: [
      {
        id: 26,
        name: "Coleção Harry Potter",
        originalPrice: 299,
        discountPrice: 199,
        discount: 33,
        image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.9,
        eco: true,
      },
      {
        id: 27,
        name: "Livro de Programação",
        originalPrice: 159,
        discountPrice: 99,
        discount: 38,
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: true,
      },
      {
        id: 28,
        name: "Romance Bestseller",
        originalPrice: 49,
        discountPrice: 29,
        discount: 41,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: true,
      },
      {
        id: 29,
        name: "Enciclopédia Ilustrada",
        originalPrice: 199,
        discountPrice: 119,
        discount: 40,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: true,
      },
      {
        id: 30,
        name: "Livro de Receitas Gourmet",
        originalPrice: 89,
        discountPrice: 59,
        discount: 34,
        image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: true,
      },
    ],
  },
  {
    id: 7,
    name: "GamerHub",
    category: "Games",
    logo: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-red-500",
    products: [
      {
        id: 31,
        name: "Console Next-Gen",
        originalPrice: 2999,
        discountPrice: 2399,
        discount: 20,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.9,
        eco: false,
      },
      {
        id: 32,
        name: "Jogo AAA Lançamento",
        originalPrice: 299,
        discountPrice: 199,
        discount: 33,
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: false,
      },
      {
        id: 33,
        name: "Controle Wireless Pro",
        originalPrice: 399,
        discountPrice: 279,
        discount: 30,
        image: "https://images.unsplash.com/photo-1592840062661-eb5ad9028c3e?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: false,
      },
      {
        id: 34,
        name: "Headset Gamer RGB",
        originalPrice: 299,
        discountPrice: 199,
        discount: 33,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: false,
      },
      {
        id: 35,
        name: "Cadeira Gamer Ergonômica",
        originalPrice: 899,
        discountPrice: 629,
        discount: 30,
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: false,
      },
    ],
  },
  {
    id: 8,
    name: "HealthPlus",
    category: "Saúde",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-teal-500",
    products: [
      {
        id: 36,
        name: "Suplemento Whey Protein",
        originalPrice: 199,
        discountPrice: 139,
        discount: 30,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: true,
      },
      {
        id: 37,
        name: "Vitamina C 1000mg",
        originalPrice: 89,
        discountPrice: 59,
        discount: 34,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: true,
      },
      {
        id: 38,
        name: "Ômega 3 Premium",
        originalPrice: 129,
        discountPrice: 89,
        discount: 31,
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: true,
      },
      {
        id: 39,
        name: "Colágeno Hidrolisado",
        originalPrice: 159,
        discountPrice: 109,
        discount: 31,
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: true,
      },
      {
        id: 40,
        name: "Kit Primeiros Socorros",
        originalPrice: 99,
        discountPrice: 69,
        discount: 30,
        image: "https://images.unsplash.com/photo-1603398938425-f2c52d4d4bb1?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.4,
        eco: false,
      },
    ],
  },
  {
    id: 9,
    name: "PetLove",
    category: "Pet Shop",
    logo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-yellow-500",
    products: [
      {
        id: 41,
        name: "Ração Premium Cães 15kg",
        originalPrice: 199,
        discountPrice: 139,
        discount: 30,
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.9,
        eco: true,
      },
      {
        id: 42,
        name: "Casinha para Cães",
        originalPrice: 299,
        discountPrice: 199,
        discount: 33,
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: true,
      },
      {
        id: 43,
        name: "Brinquedo Interativo",
        originalPrice: 89,
        discountPrice: 59,
        discount: 34,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: false,
      },
      {
        id: 44,
        name: "Coleira GPS Smart",
        originalPrice: 399,
        discountPrice: 279,
        discount: 30,
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: false,
      },
      {
        id: 45,
        name: "Kit Higiene Pet",
        originalPrice: 129,
        discountPrice: 89,
        discount: 31,
        image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: true,
      },
    ],
  },
  {
    id: 10,
    name: "EcoGreen",
    category: "Sustentável",
    logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=60&h=60&fit=crop&auto=format&q=80",
    color: "bg-emerald-500",
    products: [
      {
        id: 46,
        name: "Painel Solar Portátil",
        originalPrice: 899,
        discountPrice: 629,
        discount: 30,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.9,
        eco: true,
      },
      {
        id: 47,
        name: "Garrafa Térmica Bambu",
        originalPrice: 89,
        discountPrice: 59,
        discount: 34,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.8,
        eco: true,
      },
      {
        id: 48,
        name: "Kit Horta Vertical",
        originalPrice: 199,
        discountPrice: 139,
        discount: 30,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.7,
        eco: true,
      },
      {
        id: 49,
        name: "Sacolas Reutilizáveis",
        originalPrice: 49,
        discountPrice: 29,
        discount: 41,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.6,
        eco: true,
      },
      {
        id: 50,
        name: "Composteira Doméstica",
        originalPrice: 299,
        discountPrice: 199,
        discount: 33,
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop&auto=format&q=80",
        rating: 4.5,
        eco: true,
      },
    ],
  },
]

export default function DescontAiPlatform() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("discount")
  const [favorites, setFavorites] = useState<number[]>([])

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

  const filteredStores = stores.filter((store) => selectedCategory === "all" || store.category === selectedCategory)

  const allProducts = stores.flatMap((store) =>
    store.products.map((product) => ({ ...product, storeName: store.name, storeColor: store.color })),
  )

  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || stores.find((s) => s.name === product.storeName)?.category === selectedCategory),
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const totalSavings = allProducts.reduce(
    (total, product) => total + (product.originalPrice - product.discountPrice),
    0,
  )

  const handleAddToCart = (product: any) => {
    addToCart(product)
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
        <header className="bg-transparent shadow-lg border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">PB Shopping</h1>
                </div>
                <Badge variant="secondary" className="bg-green-500/90 text-white border-0">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco-Friendly
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    className="pl-10 w-64 bg-white/90 backdrop-blur-sm border-white/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
            </div>
          </div>
        </header>

        {/* Hero Section - Transparente */}
        <section className="text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-4 drop-shadow-2xl">Encontre os Melhores Descontos no PB Shopping</h2>
            <p className="text-xl mb-8 opacity-90 drop-shadow-lg">
              Mais de 50 produtos em promoção de 10 lojas parceiras
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">R$ {totalSavings.toLocaleString()}</div>
                <div className="text-sm opacity-75">Total em Economia</div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm opacity-75">Produtos em Oferta</div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">10</div>
                <div className="text-sm opacity-75">Lojas Parceiras</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters - Transparente */}
        <section className="border-b border-white/20 py-6">
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
        <main className="container mx-auto px-4 py-8">
          {selectedCategory === "all" ? (
            // Store View
            <div className="space-y-12">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/30"
                >
                  <div className={`${store.color} p-6 text-white`}>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={store.logo || "/placeholder.svg"}
                        alt={store.name}
                        width={60}
                        height={60}
                        className="rounded-full bg-white p-2"
                      />
                      <div>
                        <h3 className="text-2xl font-bold">{store.name}</h3>
                        <p className="opacity-90">{store.category}</p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Até {Math.max(...store.products.map((p) => p.discount))}% OFF
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                      {store.products.map((product) => (
                        <Card
                          key={product.id}
                          className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/85 backdrop-blur-md shadow-lg"
                        >
                          <CardHeader className="p-4">
                            <div className="relative">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                -{product.discount}%
                              </Badge>
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
                            <h4 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h4>
                            <div className="flex items-center mb-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm ml-1">{product.rating}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500 line-through">
                                R$ {product.originalPrice.toLocaleString()}
                              </div>
                              <div className="text-lg font-bold text-green-600">
                                R$ {product.discountPrice.toLocaleString()}
                              </div>
                            </div>
                            <Button
                              className="w-full mt-3"
                              size="sm"
                              onClick={() =>
                                handleAddToCart({ ...product, storeName: store.name, storeColor: store.color })
                              }
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Comprar
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Product Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white/85 backdrop-blur-md shadow-lg"
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
                    <div className={`inline-block px-2 py-1 rounded text-xs text-white mb-2 ${product.storeColor}`}>
                      {product.storeName}
                    </div>
                    <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500 line-through">
                        R$ {product.originalPrice.toLocaleString()}
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        R$ {product.discountPrice.toLocaleString()}
                      </div>
                    </div>
                    <Button className="w-full mt-3" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Footer - Transparente */}
        <footer className="text-white py-12 border-t border-white/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold drop-shadow-lg">PB Shopping</h3>
                </div>
                <p className="text-white/80 drop-shadow-lg">
                  A plataforma que conecta você aos melhores descontos do PB Shopping de forma sustentável e
                  inteligente.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 drop-shadow-lg">Categorias</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="drop-shadow-lg">Eletrônicos</li>
                  <li className="drop-shadow-lg">Moda</li>
                  <li className="drop-shadow-lg">Casa & Decoração</li>
                  <li className="drop-shadow-lg">Esportes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 drop-shadow-lg">Sustentabilidade</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="drop-shadow-lg">Produtos Eco-Friendly</li>
                  <li className="drop-shadow-lg">Consumo Consciente</li>
                  <li className="drop-shadow-lg">Impacto Ambiental</li>
                  <li className="drop-shadow-lg">ESG</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 drop-shadow-lg">Contato</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="drop-shadow-lg">contato@pbshopping.com</li>
                  <li className="drop-shadow-lg">(11) 9999-9999</li>
                  <li className="drop-shadow-lg">São Paulo, SP</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
              <p className="drop-shadow-lg">
                &copy; 2024 PB Shopping. Todos os direitos reservados. Plataforma sustentável de descontos.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
