import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardOverview from './sections/DashboardOverview'
import Sales from './sections/Sales'
import Orders from './sections/Orders'
import Users from './sections/Users'
import Sellers from './sections/Sellers'
import Logistics from './sections/Logistics'
import Payments from './sections/Payments'
import Analytics from './sections/Analytics'
import AIVerification from './sections/AIVerification'
import Settings from './sections/Settings'
import SecurityAlerts from './sections/SecurityAlerts'
import './App.css'

type SectionType = 'dashboard' | 'sales' | 'orders' | 'users' | 'sellers' | 'logistics' | 'payments' | 'analytics' | 'ai-verification' | 'settings' | 'security'

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard')
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate content on section change
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [activeSection])

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'sales':
        return <Sales />
      case 'orders':
        return <Orders />
      case 'users':
        return <Users />
      case 'sellers':
        return <Sellers />
      case 'logistics':
        return <Logistics />
      case 'payments':
        return <Payments />
      case 'analytics':
        return <Analytics />
      case 'ai-verification':
        return <AIVerification />
      case 'settings':
        return <Settings />
      case 'security':
        return <SecurityAlerts />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ${isSidebarExpanded ? 'ml-[280px]' : 'ml-[80px]'}`}>
        <Header />
        <main 
          ref={mainRef}
          className="flex-1 overflow-auto p-6 grid-bg relative"
        >
          <div className="noise-overlay absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-[1600px] mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
