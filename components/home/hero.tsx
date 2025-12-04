"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface HeroProps {
  judgemeStats?: {
    averageRating: number
    totalReviews: number
  }
}

const ShieldIcon = () => (
  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const WindIcon = () => (
  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 014.438 0 3 3 0 004.243-4.243 3 3 0 014.438 0 3 3 0 001.946.806 3 3 0 010 4.438 3 3 0 00-.806 1.946 3 3 0 01-3.138 3.138 3 3 0 00-1.946.806 3 3 0 01-4.438 0 3 3 0 00-1.946-.806 3 3 0 01-3.138-3.138z"
    />
  </svg>
)

const AwardIcon = () => (
  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
    />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export function Hero({ judgemeStats }: HeroProps = {}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 6,
    minutes: 31,
    seconds: 15,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const rating = judgemeStats?.averageRating ?? 4.9
  const reviewCount = judgemeStats?.totalReviews ?? 2500

  return (
    <>
      <section
        className={`relative w-full min-h-[550px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] overflow-hidden bg-navy transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/design-mode/newhero.avif"
            alt="Atlantic Flagpole Hero"
            className="w-full h-full object-cover"
          />
          {/* Subtle angled gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(95deg, rgba(11, 28, 44, 0.75) 0%, rgba(11, 28, 44, 0.4) 50%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-12 sm:py-16">
          <div className="max-w-2xl">
            {/* Trust Badges with Made in USA */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-afp-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-md border border-gold/20">
                <ShieldIcon />
                <span className="text-xs sm:text-sm font-semibold text-navy">365-Day Trial</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 bg-afp-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-md border border-gold/20">
                <WindIcon />
                <span className="text-xs sm:text-sm font-semibold text-navy">Wind Rated</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 bg-afp-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-md border border-gold/20">
                <AwardIcon />
                <span className="text-xs sm:text-sm font-semibold text-navy">#1 Flagpole Company</span>
              </div>

              {/* Made in USA Badge */}
              <img src="/images/madeinusabadge.jpg" alt="Made in USA" className="h-10 sm:h-12 w-auto" />
            </div>

            {/* Main Heading */}
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-afp-white mb-3 sm:mb-4 leading-tight">
              Premium Telescoping
              <br />
              <span className="text-gold">Flagpoles</span> for Your Home
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-afp-white/90 mb-6 sm:mb-8 leading-relaxed">
              Easy install, no ladders needed. Built to withstand extreme weather with our lifetime warranty.
            </p>

            {/* Reviews */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gold text-gold" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm sm:text-base text-afp-white/90 font-semibold">
                {rating} ({reviewCount.toLocaleString()}+ Reviews)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/collections/telescoping-flagpoles"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gold hover:bg-afp-gold-700 text-afp-white font-semibold rounded-lg shadow-lg transition-all text-base sm:text-lg"
              >
                Shop Flagpoles
              </Link>

              <Link
                href="/pages/flagpole-finder"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-afp-white/10 hover:bg-afp-white/20 backdrop-blur-sm text-afp-white font-semibold rounded-lg border-2 border-afp-white/30 hover:border-afp-white/50 transition-all text-base sm:text-lg"
              >
                Find Your Flagpole
              </Link>
            </div>

            {/* In Stock Badge */}
            <div className="flex items-center gap-2 mt-6 sm:mt-8">
              <CheckCircleIcon />
              <span className="text-sm sm:text-base text-afp-white/90 font-medium">
                <span className="text-afp-success font-semibold">In Stock</span> - Ships within 24 hours
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
