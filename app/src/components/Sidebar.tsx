import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import {
  LayoutDashboard,
  TrendingUp,
  ShoppingCart,
  Users,
  Store,
  Truck,
  CreditCard,
  BarChart3,
  ScanLine,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

type SectionType = 'dashboard' | 'sales' | 'orders' | 'users' | 'sellers' | 'logistics' | 'payments' | 'analytics' | 'ai-verification' | 'settings' | 'security'

interface SidebarProps {
  activeSection: SectionType
  setActiveSection: (section: SectionType) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}

const menuItems = [
  { id: 'dashboard' as SectionType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sales' as SectionType, label: 'Sales', icon: TrendingUp },
  { id: 'orders' as SectionType, label: 'Orders', icon: ShoppingCart },
  { id: 'users' as SectionType, label: 'Users', icon: Users },
  { id: 'sellers' as SectionType, label: 'Sellers', icon: Store },
  { id: 'logistics' as SectionType, label: 'Logistics', icon: Truck },
  { id: 'payments' as SectionType, label: 'Payments', icon: CreditCard },
  { id: 'analytics' as SectionType, label: 'Analytics', icon: BarChart3 },
  { id: 'ai-verification' as SectionType, label: 'AI Verification', icon: ScanLine },
  { id: 'settings' as SectionType, label: 'Settings', icon: Settings },
  { id: 'security' as SectionType, label: 'Security Alerts', icon: ShieldAlert },
]

export default function Sidebar({ activeSection, setActiveSection, isExpanded, setIsExpanded }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline()
    
    tl.fromTo(
      sidebarRef.current,
      { x: '-100%' },
      { x: '0%', duration: 0.8, ease: 'expo.out' }
    )
    .fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    )
    .fromTo(
      menuRef.current?.children || [],
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'expo.out' },
      '-=0.3'
    )
  }, [])

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 h-full bg-[#0f0f0f] border-r border-[#1a1a1a] z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExpanded ? 'w-[280px]' : 'w-[80px]'
      }`}
    >
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 glass opacity-50" />
      
      {/* Energy Pulse Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] energy-pulse" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div 
          ref={logoRef}
          className="h-20 flex items-center justify-center border-b border-[#1a1a1a] px-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4ff00] flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-5 h-5 text-black" />
            </div>
            {isExpanded && (
              <span className="font-bold text-lg tracking-tight whitespace-nowrap">
                Admin Panel
              </span>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-24 w-6 h-6 bg-[#d4ff00] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-20"
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4 text-black" />
          ) : (
            <ChevronRight className="w-4 h-4 text-black" />
          )}
        </button>

        {/* Menu Items */}
        <div ref={menuRef} className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-[#1a1a1a] text-[#d4ff00]' 
                    : 'text-[#b4b4b4] hover:bg-[#141414] hover:text-white'
                }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#d4ff00] rounded-r-full neon-glow" />
                )}
                
                {/* Spotlight Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4ff00]/5 to-transparent" />
                </div>

                <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'neon-text' : ''}`} />
                
                {isExpanded && (
                  <span className="font-medium text-sm whitespace-nowrap relative z-10">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-[#1a1a1a] rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-[#2a2a2a]">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-[#1a1a1a]">
          <div className={`flex items-center gap-3 ${isExpanded ? '' : 'justify-center'}`}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center">
                <span className="text-black font-bold text-sm">JS</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f0f0f] live-pulse" />
            </div>
            {isExpanded && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">John Smith</p>
                <p className="text-xs text-[#b4b4b4] truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
