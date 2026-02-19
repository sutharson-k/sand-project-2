import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Search, Bell, Settings } from 'lucide-react'

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline()
    
    tl.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'bounce.out' }
    )
    .fromTo(
      searchRef.current,
      { width: '0%', opacity: 0 },
      { width: '100%', opacity: 1, duration: 0.8, ease: 'expo.out' },
      '-=0.4'
    )
    .fromTo(
      iconsRef.current?.children || [],
      { scale: 0 },
      { scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3'
    )
  }, [])

  const handleNotificationClick = () => {
    setNotifications(0)
    // Bell ring animation
    gsap.to('.bell-icon', {
      rotation: 15,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut'
    })
  }

  return (
    <header
      ref={headerRef}
      className="h-20 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-[#1a1a1a] flex items-center justify-between px-6 sticky top-0 z-40"
    >
      {/* Search Bar */}
      <div 
        ref={searchRef}
        className={`flex-1 max-w-xl transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}
      >
        <div className={`relative group ${searchFocused ? 'neon-glow rounded-xl' : ''}`}>
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${searchFocused ? 'text-[#d4ff00]' : 'text-[#666]'}`} />
          <input
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full h-12 bg-[#141414] border border-[#2a2a2a] rounded-xl pl-12 pr-4 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#d4ff00] transition-all duration-300"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[#1a1a1a] rounded text-xs text-[#666]">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div ref={iconsRef} className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <button
          onClick={handleNotificationClick}
          className="relative w-11 h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl flex items-center justify-center hover:bg-[#1a1a1a] hover:border-[#d4ff00] transition-all duration-300 group"
        >
          <Bell className="bell-icon w-5 h-5 text-[#b4b4b4] group-hover:text-[#d4ff00] transition-colors" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4ff00] text-black text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </button>

        {/* Settings */}
        <button className="w-11 h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl flex items-center justify-center hover:bg-[#1a1a1a] hover:border-[#d4ff00] transition-all duration-300 group">
          <Settings className="w-5 h-5 text-[#b4b4b4] group-hover:text-[#d4ff00] transition-colors" />
        </button>

        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2a2a2a] rounded-xl">
          <div className="w-2 h-2 bg-[#d4ff00] rounded-full live-pulse" />
          <span className="text-sm text-[#b4b4b4]">
            {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </header>
  )
}
