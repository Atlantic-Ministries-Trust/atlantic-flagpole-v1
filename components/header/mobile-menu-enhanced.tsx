"use client"

import type React from "react"
import type { ShopifyProduct } from "@/lib/types"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { navigationConfig } from "@/lib/navigation-config"
import { cn } from "@/lib/utils"

const XIcon = ({ className }: { className?: string }) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const ChevronLeftIcon = ({ className }: { className?: string }) => (
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
    <path d="m15 18-6-6 6-6" />
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

const SparklesIcon = ({ className }: { className?: string }) => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
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

const PackageIcon = ({ className }: { className?: string }) => (
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
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="M3.3 7 8.7 5 8.7-4" />
    <path d="M12 22V12" />
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

const HelpCircleIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
)

const FlagIcon = ({ className }: { className?: string }) => (
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
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
  </svg>
)

const MapIcon = ({ className }: { className?: string }) => (
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
    <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
    <path d="M15 5.764v15" />
    <path d="M9 3.236v15" />
  </svg>
)

const ShieldIcon = ({ className }: { className?: string }) => (
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
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
)

const PhoneIcon = ({ className }: { className?: string }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const GiftIcon = ({ className }: { className?: string }) => (
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
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
)

const TruckIcon = ({ className }: { className?: string }) => (
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
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
)

const AwardIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const HomeIcon = ({ className }: { className?: string }) => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 0-2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const ShoppingBagIcon = ({ className }: { className?: string }) => (
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
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

const SettingsIcon = ({ className }: { className?: string }) => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const BookOpenIcon = ({ className }: { className?: string }) => (
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
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const MessageCircleIcon = ({ className }: { className?: string }) => (
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
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
)

const CreditCardIcon = ({ className }: { className?: string }) => (
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
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
)

const FileTextIcon = ({ className }: { className?: string }) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
)

const PercentIcon = ({ className }: { className?: string }) => (
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
    <line x1="19" x2="5" y1="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
)

interface MobileMenuEnhancedProps {
  isOpen: boolean
  onClose: () => void
  location?: any
  stateCode?: string | null
  shopifyAccountUrl?: string
  onQuizOpen?: () => void
  menuData?: any
  megaMenuData?: Record<string, any>
  submenuProductsData?: Record<string, any[]>
  nflFlagProducts?: ShopifyProduct[]
  christmasTreeProducts?: ShopifyProduct[]
  holidayProducts?: ShopifyProduct[]
  partsProducts?: ShopifyProduct[]
}

type TabType = "shop" | "explore" | "help" | "account"

export function MobileMenuEnhanced({
  isOpen,
  onClose,
  location,
  stateCode,
  shopifyAccountUrl,
  onQuizOpen,
  menuData,
  megaMenuData = {},
  submenuProductsData = {},
  nflFlagProducts = [],
  christmasTreeProducts = [],
  holidayProducts = [],
  partsProducts = [],
}: MobileMenuEnhancedProps) {
  const [activeTab, setActiveTab] = useState<TabType>("shop")
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [categoryStack, setCategoryStack] = useState<{ index: number; label: string }[]>([])

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("shop")
      setExpandedSections([])
      setCategoryStack([])
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const navigateToCategory = (index: number, label: string) => {
    setCategoryStack((prev) => [...prev, { index, label }])
  }

  const navigateBack = () => {
    setCategoryStack((prev) => prev.slice(0, -1))
  }

  const currentCategoryIndex = categoryStack.length > 0 ? categoryStack[categoryStack.length - 1].index : -1
  const currentCategory = currentCategoryIndex >= 0 ? navigationConfig[currentCategoryIndex] : null

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "shop", label: "Shop", icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { id: "explore", label: "Explore", icon: <MapIcon className="w-5 h-5" /> },
    { id: "help", label: "Help", icon: <HelpCircleIcon className="w-5 h-5" /> },
    { id: "account", label: "Account", icon: <UserIcon className="w-5 h-5" /> },
  ]

  const quickLinks = [
    { label: "Flagpole Quiz", icon: <SparklesIcon className="w-5 h-5" />, action: onQuizOpen },
    { label: "Find My State", icon: <MapPinIcon className="w-5 h-5" />, href: "/state-flags" },
    { label: "Compare Products", icon: <StarIcon className="w-5 h-5" />, href: "/compare" },
    { label: "Holiday Deals", icon: <GiftIcon className="w-5 h-5" />, href: "/holiday-seasonal" },
  ]

  const helpLinks = [
    { label: "Contact Us", icon: <PhoneIcon className="w-5 h-5" />, href: "/contact" },
    { label: "Help Center", icon: <HelpCircleIcon className="w-5 h-5" />, href: "/help-center" },
    { label: "Shipping Info", icon: <TruckIcon className="w-5 h-5" />, href: "/shipping" },
    { label: "Returns & Warranty", icon: <ShieldIcon className="w-5 h-5" />, href: "/guarantee" },
    {
      label: "Installation Guide",
      icon: <BookOpenIcon className="w-5 h-5" />,
      href: "/info-center/installation-guide",
    },
    { label: "Chat with Flaggy AI", icon: <MessageCircleIcon className="w-5 h-5" />, href: "#flaggy" },
  ]

  const accountLinks = [
    { label: "My Account", icon: <UserIcon className="w-5 h-5" />, href: shopifyAccountUrl },
    { label: "Order History", icon: <PackageIcon className="w-5 h-5" />, href: `${shopifyAccountUrl}/orders` },
    { label: "Saved Items", icon: <HeartIcon className="w-5 h-5" />, href: "/wishlist" },
    { label: "Payment Methods", icon: <CreditCardIcon className="w-5 h-5" />, href: `${shopifyAccountUrl}/addresses` },
    { label: "Settings", icon: <SettingsIcon className="w-5 h-5" />, href: "/cookie-settings" },
  ]

  const renderShopTab = () => {
    if (categoryStack.length > 0) {
      const categoryIndex = categoryStack[0].index
      const currentCategory = navigationConfig[categoryIndex]
      const categoryProducts = submenuProductsData[currentCategory.title] || []

      return (
        <div className="space-y-6 animate-in slide-in-from-right duration-200">
          {/* Back Button */}
          <button
            onClick={() => setCategoryStack([])}
            className="flex items-center gap-2 text-gray-600 hover:text-[#C8A55C] transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>

          {/* Category Header */}
          <div className="bg-[#F5F3EF] -mx-4 px-4 py-3 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#0B1C2C]">{currentCategory.title}</h2>
            {currentCategory.href && (
              <Link
                href={currentCategory.href}
                onClick={onClose}
                className="text-sm text-[#C8A55C] hover:text-[#0B1C2C] font-semibold inline-block mt-1"
              >
                View All {currentCategory.title} →
              </Link>
            )}
          </div>

          {/* Featured Products */}
          {categoryProducts.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3">Featured Products</h4>
              <div className="space-y-3">
                {categoryProducts.slice(0, 3).map((product: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/products/${product.handle}`}
                    onClick={onClose}
                    className="flex items-start gap-3 p-3 bg-white hover:bg-[#F5F3EF] rounded-lg transition-all shadow-sm hover:shadow-md border border-gray-100"
                  >
                    {product.images?.nodes?.[0]?.url && (
                      <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={product.images.nodes[0].url || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-sm text-[#0B1C2C] mb-1 line-clamp-2">{product.title}</h5>
                      {product.priceRange?.minVariantPrice && (
                        <p className="text-sm font-bold text-[#C8A55C]">
                          ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      )}
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Subcategories */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Browse {currentCategory.title}</h4>
            <div className="space-y-1">
              {currentCategory.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-[#F5F3EF] transition-colors"
                >
                  <span className="text-gray-900 font-medium">{item.label}</span>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6 animate-in slide-in-from-left duration-200">
        {/* Featured Products - Amazon Style */}
        <div className="bg-gradient-to-br from-[#F5F3EF] to-white -mx-4 px-4 py-4 border-b border-gray-200">
          <h3 className="text-base font-bold text-[#0B1C2C] mb-3 flex items-center gap-2">
            <PackageIcon className="w-5 h-5 text-[#C8A55C]" />
            Featured Products
          </h3>
          <div className="space-y-2">
            <Link
              href="/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle"
              onClick={onClose}
              className="flex items-start gap-3 p-3 bg-white hover:bg-[#F5F3EF] rounded-lg transition-all shadow-sm hover:shadow-md border border-gray-100"
            >
              <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src="https://cdn.shopify.com/s/files/1/2133/9559/files/Phoenix_Telescoping_Flagpole_Premier_Kit_-_Starter_Bundle.png?v=1761115372"
                  alt="Phoenix Premier Kit"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#C8A55C] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Most Popular
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#0B1C2C] mb-1">Phoenix Premier Kit</h4>
                <p className="text-xs text-gray-600 mb-1 line-clamp-1">Complete bundle with all accessories</p>
                <span className="text-sm font-bold text-[#C8A55C]">Starting at $779</span>
              </div>
            </Link>

            <Link
              href="/collections/telescoping-flagpoles"
              onClick={onClose}
              className="flex items-start gap-3 p-3 bg-white hover:bg-[#F5F3EF] rounded-lg transition-all shadow-sm hover:shadow-md border border-gray-100"
            >
              <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src="https://cdn.shopify.com/s/files/1/2133/9559/files/phoenix-telescoping-flagpole-usa-flag.jpg?v=1735597814"
                  alt="Telescoping Flagpoles"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Best Seller
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#0B1C2C] mb-1">Telescoping Flagpoles</h4>
                <p className="text-xs text-gray-600 mb-1 line-clamp-1">Easy install, no ladders needed</p>
                <span className="text-sm font-bold text-[#C8A55C]">Shop Collection →</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Trending / Quick Actions */}
        <div>
          <h3 className="text-base font-bold text-[#0B1C2C] mb-3">Trending</h3>
          <div className="space-y-2">
            {location && stateCode && (
              <Link
                href={`/capitals/${stateCode.toLowerCase()}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-[#C8A55C]" />
                  <span className="text-[#0B1C2C] font-medium">Shop {location.region}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </Link>
            )}
            <Link
              href="/flagpole-finder"
              onClick={onClose}
              className="flex items-center justify-between p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <SparklesIcon className="w-5 h-5 text-[#C8A55C]" />
                <span className="text-[#0B1C2C] font-medium">Flagpole Finder</span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </Link>
            {onQuizOpen && (
              <button
                onClick={() => {
                  onQuizOpen()
                  onClose()
                }}
                className="flex items-center justify-between p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors w-full"
              >
                <div className="flex items-center gap-3">
                  <SparklesIcon className="w-5 h-5 text-[#C8A55C]" />
                  <span className="text-[#0B1C2C] font-medium">Flagpole Quiz</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Shop by Department */}
        <div>
          <h3 className="text-base font-bold text-[#0B1C2C] mb-3">Shop by Department</h3>
          <div className="space-y-1">
            {navigationConfig.map((category, idx) => (
              <button
                key={idx}
                onClick={() => navigateToCategory(idx, category.title)}
                className="flex items-center justify-between w-full p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors text-left"
              >
                <span className="text-[#0B1C2C] font-medium">{category.title}</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Popular Products Grid */}
        {Object.keys(submenuProductsData).length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#0B1C2C]">Popular Products</h3>
              <Link href="/collections/all" onClick={onClose} className="text-sm text-[#C8A55C] hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(submenuProductsData)
                .flat()
                .slice(0, 4)
                .map((product: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/products/${product.handle}`}
                    onClick={onClose}
                    className="block bg-white rounded-lg border border-gray-200 p-3 hover:border-[#C8A55C] hover:shadow-md transition-all"
                  >
                    {product.images?.nodes?.[0]?.url && (
                      <div className="aspect-square mb-2 relative overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={product.images.nodes[0].url || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                    <h5 className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">{product.title}</h5>
                    {product.priceRange?.minVariantPrice && (
                      <p className="text-sm font-bold text-[#C8A55C]">
                        ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    )}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderExploreContent = () => (
    <div className="space-y-6">
      {/* Featured Section */}
      <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1a3a5c] rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Phoenix 365-Day Trial</h3>
        <p className="text-sm text-white/80 mb-4">
          Experience America&apos;s #1 rated telescoping flagpole risk-free for a full year.
        </p>
        <Link
          href="/info-center/phoenix-365-day-home-trial"
          onClick={onClose}
          className="inline-flex items-center gap-2 bg-[#B8860B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#9a7209] transition-colors"
        >
          Learn More
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Explore Links */}
      <div className="space-y-1">
        {[
          { label: "About Atlantic Flagpole", href: "/about", icon: <HomeIcon className="w-5 h-5" /> },
          { label: "Customer Reviews", href: "/reviews", icon: <StarIcon className="w-5 h-5" /> },
          { label: "Info Center", href: "/info-center", icon: <BookOpenIcon className="w-5 h-5" /> },
          { label: "Blog", href: "/blog", icon: <FileTextIcon className="w-5 h-5" /> },
          { label: "Current Promotions", href: "/promotions", icon: <PercentIcon className="w-5 h-5" /> },
        ].map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
              {link.icon}
            </div>
            <span className="font-medium text-gray-900">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Location Banner */}
      {location && (
        <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
          <MapPinIcon className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Shopping from</p>
            <p className="font-semibold text-gray-900">{location.region}</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderHelpContent = () => (
    <div className="space-y-6">
      {/* Flaggy AI Chat */}
      <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white overflow-hidden">
        {/* Flaggy photo overlay in top right */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-xl opacity-30">
          <Image src="/images/design-mode/Flaggy.png" alt="Flaggy" fill className="object-cover object-top" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <SparklesIcon className="w-8 h-8" />
            <h3 className="text-lg font-bold">Chat with Flaggy AI</h3>
          </div>
          <p className="text-sm text-white/90 mb-4">
            Get instant answers about flagpoles, installation, and more from our AI assistant.
          </p>
          <button
            onClick={() => {
              onClose()
              // Trigger Flaggy chat via data attribute
              const flaggyButton = document.querySelector("[data-flaggy-trigger]")
              if (flaggyButton) (flaggyButton as HTMLButtonElement).click()
            }}
            className="inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors shadow-md"
          >
            Start Chat
            <MessageCircleIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Help Links */}
      <div className="space-y-1">
        {helpLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
              {link.icon}
            </div>
            <span className="font-medium text-gray-900">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <h4 className="font-semibold text-gray-900">Contact Us</h4>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <PhoneIcon className="w-4 h-4" />
          <span>1-800-FLAGPOLE</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MailIcon className="w-4 h-4" />
          <span>support@atlanticflagpole.com</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <ClockIcon className="w-4 h-4" />
          <span>Mon-Fri 9am-5pm EST</span>
        </div>
      </div>
    </div>
  )

  const renderAccountContent = () => (
    <div className="space-y-6">
      {/* Account Links */}
      <div className="space-y-1">
        {accountLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
              {link.icon}
            </div>
            <span className="font-medium text-gray-900">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Sign Out */}
      <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-colors">
        Sign Out
      </button>
    </div>
  )

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-full max-w-md bg-white z-[201] shadow-2xl transition-transform duration-300 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#0B1C2C]">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <img src="/images/favicon.png" alt="Atlantic Flagpole Logo" className="h-10 w-10 object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white font-serif leading-tight">ATLANTIC</span>
              <span className="text-[9px] text-[#D4AF37] font-semibold tracking-[0.48em] leading-tight text-center w-full">
                FLAGPOLE
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            aria-label="Close menu"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setCategoryStack([])
              }}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "text-[#B8860B] border-b-2 border-[#B8A55C] bg-white"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "shop" && renderShopTab()}
          {activeTab === "explore" && renderExploreContent()}
          {activeTab === "help" && renderHelpContent()}
          {activeTab === "account" && renderAccountContent()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <Link href="/privacy" onClick={onClose} className="hover:text-gray-700">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" onClick={onClose} className="hover:text-gray-700">
              Terms
            </Link>
            <span>•</span>
            <Link href="/accessibility" onClick={onClose} className="hover:text-gray-700">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
