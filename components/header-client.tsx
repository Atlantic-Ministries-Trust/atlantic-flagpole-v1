"use client"
import Link from "next/link"
import type React from "react"

import { useState, useEffect, useRef } from "react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import type { Menu } from "@/lib/menus"
import { NFLMenuClient } from "@/components/header/nfl-menu-client"
import { ChristmasTreeMegaMenu } from "@/components/header/christmas-tree-mega-menu"
import { isNFLMenuItem, isChristmasTreeMenuItem } from "@/lib/nfl-teams"
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
  menuData?: Menu | null
  megaMenuData?: Record<string, any>
  submenuProductsData?: Record<string, any[]>
  nflFlagProducts?: any[]
  christmasTreeProducts?: any[]
  holidayProducts?: any[]
  partsProducts?: any[]
  judgemeBadge?: React.ReactNode
}

function HeaderClient({
  menuData,
  megaMenuData = {},
  submenuProductsData = {},
  nflFlagProducts = [],
  christmasTreeProducts = [],
  holidayProducts = [],
  partsProducts = [],
  judgemeBadge,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [closingDropdown, setClosingDropdown] = useState<string | null>(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { cart } = useCart()
  const totalItems = cart?.lines?.edges ? cart.lines.edges.length : 0
  const menuRef = useRef<HTMLDivElement>(null)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { location } = useGeo()
  const stateCode = location ? getStateCodeFromRegion(location.region) : null
  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseEnter = (itemId: string, hasDropdown: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    if (activeDropdown && activeDropdown !== itemId) {
      setClosingDropdown(activeDropdown)
      setActiveDropdown(null)

      hoverTimeoutRef.current = setTimeout(() => {
        setClosingDropdown(null)
        setActiveDropdown(itemId)
        hoverTimeoutRef.current = null
      }, 200)
    } else if (!activeDropdown && hasDropdown) {
      setActiveDropdown(itemId)
    }
  }

  const handleMouseLeave = (itemId: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null)
        closeTimeoutRef.current = null
      }, 200)
    }
  }

  const openCart = () => {
    setMobileMenuOpen(false)
    // Logic to open cart goes here
  }

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    console.error("[v0] HeaderClient: menuData or menuData.items is undefined")
    return null
  }

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 bg-background shadow-md transition-all duration-500 ${
          isMounted ? "opacity-100 translate-y-0 animate-header-slide-down" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="bg-navy text-ivory border-b border-afp-gold/20">
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-10 px-3 md:px-5 gap-3 text-xs md:text-sm">
              {/* Left section: Hamburger + Utility Links */}
              <div className="flex items-center gap-2 md:gap-4">
                {isMounted && (
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="text-ivory hover:text-gold transition-colors p-1.5 hover:bg-afp-white/10 rounded-lg"
                    aria-label="Open menu"
                  >
                    <MenuIcon className="w-5 h-5" />
                  </button>
                )}

                <Link
                  href="/pages/365-day-home-trial"
                  className="text-ivory hover:text-gold transition-colors whitespace-nowrap hidden sm:block"
                >
                  365-Day Trial
                </Link>

                <Link
                  href="/pages/lifetime-warranty"
                  className="text-ivory hover:text-gold transition-colors whitespace-nowrap hidden md:block"
                >
                  Warranty
                </Link>
              </div>

              {/* Center section: Secondary nav links + Search */}
              <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center max-w-3xl">
                <Link
                  href="/pages/reviews"
                  className="text-ivory hover:text-gold transition-colors whitespace-nowrap hidden lg:block"
                >
                  Reviews
                </Link>
                <Link
                  href="/pages/compare"
                  className="text-ivory hover:text-gold transition-colors whitespace-nowrap hidden lg:block"
                >
                  Compare
                </Link>
                <Link
                  href="/pages/about"
                  className="text-ivory hover:text-gold transition-colors whitespace-nowrap hidden lg:block"
                >
                  About
                </Link>
                <Link
                  href="/pages/help"
                  className="text-ivory hover:text-gold transition-colors whitespace-nowrap hidden lg:block"
                >
                  Help
                </Link>
                <Link
                  href="/collections/holiday-deals"
                  className="text-ivory hover:text-gold transition-colors whitespace-nowrap hidden lg:block"
                >
                  Holiday Deals
                </Link>

                {/* Search Bar */}
                <div className="flex-[2] max-w-xl">
                  <SearchBarWrapper />
                </div>
              </div>

              {/* Right section: Account */}
              <Link
                href="/account"
                className="text-ivory hover:text-gold transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden md:inline">Account</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-background border-b border-border">
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-16 md:h-20 px-3 md:px-5 gap-3">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <img src="/images/favicon.png" alt="Atlantic Flagpole" className="w-10 h-10 md:w-12 md:h-12" />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg md:text-xl text-foreground leading-tight">
                    ATLANTIC
                  </span>
                  <span className="font-serif text-xs md:text-sm text-gold tracking-[0.48em] leading-tight">
                    FLAGPOLE
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-2">
                {menuData.items.map((item) => {
                  const isNFL = isNFLMenuItem(item.title)
                  const isChristmas = isChristmasTreeMenuItem(item.title)
                  const isInfoCenter = item.title === "Info Center"
                  const hasDropdown = isNFL || isChristmas || isInfoCenter || (item.items && item.items.length > 0)
                  const isActive = activeDropdown === item.title

                  return (
                    <div
                      key={item.title}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.title, hasDropdown)}
                      onMouseLeave={() => handleMouseLeave(item.title, hasDropdown)}
                    >
                      {hasDropdown ? (
                        <button
                          className={`px-5 py-3 font-medium text-foreground hover:text-gold transition-colors relative ${
                            isActive ? "text-gold" : ""
                          }`}
                        >
                          {item.title}
                          <span
                            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gold transform transition-transform origin-left ${
                              isActive ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.path}
                          className="px-5 py-3 font-medium text-foreground hover:text-gold transition-colors relative group/link"
                        >
                          {item.title}
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold transform transition-transform origin-left scale-x-0 group-hover/link:scale-x-100" />
                        </Link>
                      )}

                      {hasDropdown && (isActive || closingDropdown === item.title) && (
                        <div
                          className="absolute left-0 right-0"
                          style={{
                            top: "calc(100% - 12px)",
                            minWidth: isInfoCenter ? "300px" : isNFL || isChristmas ? "900px" : "800px",
                          }}
                        >
                          {/* Invisible hover bridge */}
                          <div className="h-3 w-full" />

                          <div
                            className={`bg-card border border-border shadow-xl rounded-lg overflow-hidden ${
                              closingDropdown === item.title ? "animate-slideUp" : "animate-slideDown"
                            }`}
                          >
                            {isNFL ? (
                              <NFLMenuClient />
                            ) : isChristmas ? (
                              <ChristmasTreeMegaMenu />
                            ) : isInfoCenter ? (
                              <InfoCenterMegaMenu />
                            ) : (
                              <MegaMenuWithCart
                                title={item.title}
                                items={item.items || []}
                                menuProducts={megaMenuData?.[item.id]?.products?.nodes || []}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>

              {/* Cart Icon */}
              <button
                onClick={() => openCart()}
                className="relative p-2 text-foreground hover:text-gold transition-colors rounded-lg hover:bg-muted"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-afp-danger text-afp-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMounted && (
        <MobileMenuEnhanced
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          menu={menuData}
          megaMenuData={megaMenuData}
          nflFlagProducts={nflFlagProducts}
          christmasTreeProducts={christmasTreeProducts}
          location={location}
          stateCode={stateCode}
        />
      )}

      {/* Flagpole Quiz Modal */}
      <FlagpoleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  )
}

export { HeaderClient }
