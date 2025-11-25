"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import type { Menu } from "@/lib/menus"
import { NFLMenuClient } from "@/components/header/nfl-menu-client"
import { ChristmasTreeMegaMenu } from "@/components/header/christmas-tree-mega-menu"
import { isNFLMenuItem, isChristmasTreeMenuItem } from "@/lib/nfl-teams"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { MegaMenuWithCart } from "@/components/header/mega-menu-with-cart"
import { MobileMenuEnhanced } from "@/components/header/mobile-menu-enhanced"
import { useGeo } from "@/lib/geo/context"
import { getStateCodeFromRegion } from "@/lib/geo/state-mapping"
import { InfoCenterMegaMenu } from "@/components/header/info-center-mega-menu"

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

interface HeaderClientProps {
  menuData: Menu | null
  megaMenuData?: Record<string, any>
  submenuProductsData?: Record<string, any[]>
  nflFlagProducts: ShopifyProduct[]
  christmasTreeProducts: ShopifyProduct[]
  holidayProducts?: ShopifyProduct[]
  partsProducts?: ShopifyProduct[]
  judgemeBadge?: React.ReactNode
}

export function HeaderClient({
  menuData,
  megaMenuData = {},
  submenuProductsData = {},
  nflFlagProducts,
  christmasTreeProducts,
  holidayProducts = [],
  partsProducts = [],
  judgemeBadge,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0
  const menuRef = useRef<HTMLDivElement>(null)
  const { location } = useGeo()
  const stateCode = location ? getStateCodeFromRegion(location.region) : null
  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    return null
  }

  const menuItems = menuData.items

  const isResourceMenu = (item: any) => {
    const title = item.title.toLowerCase()
    return title.includes("resource") || title.includes("about") || title.includes("company") || title.includes("info")
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        {/* Top utility bar */}
        <div className="bg-[#0B1C2C] text-white">
          <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <Link href="/info-center/phoenix-365-day-home-trial" className="hover:text-[#C8A55C] transition-colors">
                365-Day Home Trial
              </Link>
              <span className="hidden sm:inline text-white/40">|</span>
              <Link href="/guarantee" className="hidden sm:inline hover:text-[#C8A55C] transition-colors">
                Lifetime Warranty
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/find-store" className="flex items-center gap-1 hover:text-[#C8A55C] transition-colors">
                <MapPinIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Find in Store</span>
              </Link>
              <Link href="/account" className="hover:text-[#C8A55C] transition-colors">
                My Account
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-[1400px] px-2 sm:px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <img
                  src="/images/favicon.png"
                  alt="Atlantic Flagpole Logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-[#0B1C2C] font-serif leading-tight">
                    ATLANTIC
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#D4AF37] font-semibold tracking-wider leading-tight">
                    FLAGPOLE
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center justify-center flex-1" ref={menuRef}>
                <div className="flex items-center gap-1">
                  {menuItems.map((item: any) => (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={item.url}
                        className="relative px-4 py-2 text-sm font-semibold text-[#0B1C2C] hover:text-[#C8A55C] transition-all duration-300 inline-flex items-center justify-center group"
                      >
                        <span>{item.title}</span>
                        <span
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#C8A55C] transition-all duration-300 ${activeDropdown === item.id ? "w-full" : "w-0 group-hover:w-full"}`}
                        />
                      </Link>

                      {/* Mega Menu Dropdown */}
                      {activeDropdown === item.id && item.items && item.items.length > 0 && (
                        <div
                          className="fixed left-0 right-0 top-full pt-0 z-50"
                          style={{ top: "auto" }}
                          onMouseEnter={() => setActiveDropdown(item.id)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="bg-white shadow-2xl border-t-4 border-[#C8A55C] animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="container mx-auto px-4 py-6">
                              {isNFLMenuItem(item.title) ? (
                                <NFLMenuClient
                                  nflFlagProducts={nflFlagProducts}
                                  onLinkClick={() => setActiveDropdown(null)}
                                />
                              ) : isChristmasTreeMenuItem(item.title) ? (
                                <ChristmasTreeMegaMenu
                                  products={christmasTreeProducts}
                                  submenuProductsData={submenuProductsData}
                                  onLinkClick={() => setActiveDropdown(null)}
                                />
                              ) : isResourceMenu(item) ? (
                                <InfoCenterMegaMenu onLinkClick={() => setActiveDropdown(null)} />
                              ) : (
                                <MegaMenuWithCart
                                  title={item.title}
                                  menuItems={item.items || []}
                                  featuredProducts={megaMenuData[item.id]?.products?.nodes || []}
                                  onLinkClick={() => setActiveDropdown(null)}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/quiz"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#C8A55C] text-[#0B1C2C] text-sm font-bold rounded-lg hover:bg-[#b8954c] transition-colors"
                >
                  Take Quiz
                </Link>
                <Link
                  href="/account"
                  className="hidden lg:flex p-2 text-gray-600 hover:text-[#C8A55C] transition-colors"
                  aria-label="Account"
                >
                  <UserIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/cart"
                  className="p-2 text-gray-600 hover:text-[#C8A55C] transition-colors relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C8A55C] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F5F3EF] border-b border-gray-200">
          <div className="container mx-auto px-2 md:px-4">
            <div className="flex items-center gap-2 h-10">
              {/* Quick Links - compact */}
              <div className="hidden lg:flex items-center gap-0.5 flex-shrink-0">
                {[
                  { href: "/reviews", label: "Reviews" },
                  { href: "/compare", label: "Compare" },
                  { href: "/about", label: "About" },
                  { href: "/help-center", label: "Help" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-2 py-1 text-xs font-medium text-[#0B1C2C] hover:text-[#C8A55C] whitespace-nowrap transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/led-christmas-trees-for-flagpole"
                  className="px-2 py-1 text-xs font-bold text-red-600 hover:text-red-700 whitespace-nowrap"
                >
                  Holiday Deals
                </Link>
              </div>

              <div className="flex-1 min-w-0">
                <SearchBarWrapper />
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenuEnhanced
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        shopifyAccountUrl={shopifyAccountUrl}
        onQuizOpen={() => {
          setMobileMenuOpen(false)
          setQuizModalOpen(true)
        }}
        menuData={menuData}
        megaMenuData={megaMenuData}
        submenuProductsData={submenuProductsData}
        nflFlagProducts={nflFlagProducts}
        christmasTreeProducts={christmasTreeProducts}
        holidayProducts={holidayProducts}
        partsProducts={partsProducts}
      />

      <FlagpoleQuizModal isOpen={quizModalOpen} onClose={() => setQuizModalOpen(false)} />

      {judgemeBadge && <div className="hidden">{judgemeBadge}</div>}
    </>
  )
}
