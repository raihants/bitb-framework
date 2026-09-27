import Image from 'next/image'
import Link from 'next/link'
import { Menu, Search, ShoppingCart, ChevronDown, User } from 'lucide-react'

export function Header() {
  const navLinks = [
    'Game Pass',
    'Games',
    'Devices',
    'Play',
    'Store',
    'Community',
    'Support',
    'More'
  ]

  return (
    <header
      style={{ fontFamily: '"Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif' }}
      className="w-full bg-white text-[#262626] z-50 relative"
    >
      {/* Mobile Top Row & Desktop Single Row Container */}
      <div className="flex items-center justify-between w-full h-[54px] px-[5%] lg:px-[5%] border-b border-[#e6e6e6]">

        {/* Left Section: Hamburger + Search (Mobile), MS Logo + Nav (Desktop) */}
        <div className="flex items-center lg:gap-6">
          {/* Mobile hamburger & search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button aria-label="Menu" className="p-1">
              <Menu className="w-5 h-5" />
            </button>
            <button aria-label="Search" className="p-1">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Microsoft Logo (Center on mobile, Left on desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Link href="/" className="inline-block">
              <Image
                src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/RE1Mu3b.png"
                alt="Microsoft"
                width={108}
                height={23}
                className="w-auto h-[23px]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav - Separator + Xbox Logo + Links */}
          <div className="hidden lg:flex items-center">
            {/* Optional separator */}
            <div className="w-[1px] h-6 bg-[#262626] mx-4 opacity-50" />

            <Link href="/" className="mr-6 flex-shrink-0">
              <Image
                src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/RW4ESm.png"
                alt="Xbox"
                width={79}
                height={24}
                className="w-auto h-[24px]"
                priority
              />
            </Link>

            <nav className="flex items-center">
              <ul className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="px-3 py-2 text-[13px] hover:underline underline-offset-4 decoration-2"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Right Section: Cart & Sign In (Desktop + Mobile) */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Desktop Search */}
          <button aria-label="Search" className="hidden lg:flex items-center gap-2 px-2 hover:underline text-[13px]">
            <span>Search</span>
            <Search className="w-[18px] h-[18px]" />
          </button>

          <button aria-label="Cart" className="flex items-center gap-2 px-2 hover:underline text-[13px]">
            <span className="hidden lg:block">Cart</span>
            <ShoppingCart className="w-[18px] h-[18px]" />
          </button>

          <button aria-label="Sign in" className="flex items-center gap-2 px-2 hover:underline text-[13px]">
            <span className="hidden lg:block">Sign in</span>
            {/* "me control" is typically a profile circle */}
            <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Row: Xbox Logo + Expand Arrow */}
      <div className="lg:hidden flex items-center justify-between w-full h-[54px] px-[5%] border-b border-[#e6e6e6]">
        <Link href="/" className="flex items-center">
          <Image
            src="/sites/www-xbox-com-c671f65a/en-us-live-34dc964f/images/RW4ESm.png"
            alt="Xbox"
            width={79}
            height={24}
            className="w-auto h-[24px]"
            priority
          />
        </Link>
        <button aria-label="Expand Xbox Menu" className="p-1">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
