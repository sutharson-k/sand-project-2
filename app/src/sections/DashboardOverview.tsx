import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign
} from 'lucide-react'

const salesData = [
  { name: 'Mon', sales: 4000, orders: 240 },
  { name: 'Tue', sales: 3000, orders: 198 },
  { name: 'Wed', sales: 5000, orders: 300 },
  { name: 'Thu', sales: 2780, orders: 208 },
  { name: 'Fri', sales: 1890, orders: 180 },
  { name: 'Sat', sales: 6390, orders: 450 },
  { name: 'Sun', sales: 5490, orders: 380 },
]

const userGrowthData = [
  { name: 'Jan', users: 4000, sellers: 240 },
  { name: 'Feb', users: 3000, sellers: 198 },
  { name: 'Mar', users: 5000, sellers: 300 },
  { name: 'Apr', users: 2780, sellers: 208 },
  { name: 'May', users: 1890, sellers: 180 },
  { name: 'Jun', users: 6390, sellers: 450 },
]

const orderStatusData = [
  { name: 'Completed', value: 65, color: '#22c55e' },
  { name: 'Pending', value: 20, color: '#eab308' },
  { name: 'Cancelled', value: 15, color: '#ef4444' },
]

const stats = [
  {
    id: 1,
    title: 'Total Sales',
    value: 284920,
    prefix: '$',
    change: 12.5,
    changeType: 'up',
    icon: TrendingUp,
    color: '#d4ff00'
  },
  {
    id: 2,
    title: 'Total Orders',
    value: 12543,
    prefix: '',
    change: 8.2,
    changeType: 'up',
    icon: ShoppingCart,
    color: '#3b82f6'
  },
  {
    id: 3,
    title: 'Total Users',
    value: 89234,
    prefix: '',
    change: -2.4,
    changeType: 'down',
    icon: Users,
    color: '#8b5cf6'
  },
  {
    id: 4,
    title: 'Total Sellers',
    value: 3456,
    prefix: '',
    change: 15.8,
    changeType: 'up',
    icon: Store,
    color: '#f97316'
  }
]

function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span ref={countRef} className="text-3xl font-bold tracking-tight">
      {prefix}{count.toLocaleString()}
    </span>
  )
}

export default function DashboardOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const chartsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Title animation
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
    )
    
    // Cards flip animation
    const cards = cardsRef.current?.children
    if (cards) {
      tl.fromTo(
        cards,
        { rotateX: 90, opacity: 0 },
        { 
          rotateX: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'back.out(1.7)' 
        },
        '-=0.4'
      )
    }
    
    // Charts draw in
    tl.fromTo(
      chartsRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'expo.out' },
      '-=0.4'
    )
  }, [])

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 ref={titleRef} className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <div className="flex items-center gap-2 text-sm text-[#b4b4b4]">
          <Activity className="w-4 h-4 text-[#d4ff00]" />
          <span>Live Updates</span>
          <div className="w-2 h-2 bg-[#d4ff00] rounded-full live-pulse" />
        </div>
      </div>

      {/* Stats Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const ChangeIcon = stat.changeType === 'up' ? ArrowUpRight : ArrowDownRight
          
          return (
            <div
              key={stat.id}
              className="relative bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 card-hover energy-pulse overflow-hidden group"
              style={{ perspective: '1000px' }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.changeType === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <ChangeIcon className="w-4 h-4" />
                    <span>{Math.abs(stat.change)}%</span>
                  </div>
                </div>
                
                <p className="text-[#b4b4b4] text-sm mb-1">{stat.title}</p>
                <AnimatedCounter value={stat.value} prefix={stat.prefix} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Analytics */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Sales Analytics</h3>
              <p className="text-sm text-[#b4b4b4]">Revenue vs Orders</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[#d4ff00]" />
                <span className="text-xs text-[#b4b4b4]">Sales</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                <span className="text-xs text-[#b4b4b4]">Orders</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4ff00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4ff00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#d4ff00" 
                  strokeWidth={2}
                  fill="url(#salesGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#ordersGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Order Status</h3>
            <p className="text-sm text-[#b4b4b4]">Distribution by status</p>
          </div>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-4 mt-4">
            {orderStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-[#b4b4b4]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth */}
        <div className="lg:col-span-3 bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">User Growth</h3>
              <p className="text-sm text-[#b4b4b4]">New users and sellers over time</p>
            </div>
            <DollarSign className="w-5 h-5 text-[#d4ff00]" />
          </div>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px'
                  }}
                />
                <Legend />
                <Bar dataKey="users" fill="#d4ff00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sellers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="text-sm text-[#d4ff00] hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          {[
            { action: 'New order received', detail: 'Order #12345 - $299.99', time: '2 min ago', type: 'order' },
            { action: 'New user registered', detail: 'john.doe@email.com', time: '5 min ago', type: 'user' },
            { action: 'Payment processed', detail: 'Transaction #TX789 - $1,499.00', time: '10 min ago', type: 'payment' },
            { action: 'Seller approved', detail: 'TechStore Inc.', time: '15 min ago', type: 'seller' },
          ].map((activity, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'order' ? 'bg-blue-500/20 text-blue-500' :
                  activity.type === 'user' ? 'bg-purple-500/20 text-purple-500' :
                  activity.type === 'payment' ? 'bg-green-500/20 text-green-500' :
                  'bg-orange-500/20 text-orange-500'
                }`}>
                  {activity.type === 'order' && <ShoppingCart className="w-5 h-5" />}
                  {activity.type === 'user' && <Users className="w-5 h-5" />}
                  {activity.type === 'payment' && <DollarSign className="w-5 h-5" />}
                  {activity.type === 'seller' && <Store className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium group-hover:text-[#d4ff00] transition-colors">{activity.action}</p>
                  <p className="text-sm text-[#b4b4b4]">{activity.detail}</p>
                </div>
              </div>
              <span className="text-sm text-[#666]">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
