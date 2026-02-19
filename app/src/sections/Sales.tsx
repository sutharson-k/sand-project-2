import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import {
  TrendingUp,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const monthlyData = [
  { name: 'Jan', revenue: 45000, target: 40000 },
  { name: 'Feb', revenue: 52000, target: 45000 },
  { name: 'Mar', revenue: 48000, target: 50000 },
  { name: 'Apr', revenue: 61000, target: 55000 },
  { name: 'May', revenue: 58000, target: 60000 },
  { name: 'Jun', revenue: 72000, target: 65000 },
  { name: 'Jul', revenue: 68000, target: 70000 },
  { name: 'Aug', revenue: 75000, target: 72000 },
  { name: 'Sep', revenue: 82000, target: 75000 },
  { name: 'Oct', revenue: 79000, target: 80000 },
  { name: 'Nov', revenue: 88000, target: 85000 },
  { name: 'Dec', revenue: 95000, target: 90000 },
]

const topProducts = [
  { id: 1, name: 'Wireless Headphones Pro', category: 'Electronics', sales: 1234, revenue: 123400, growth: 23.5 },
  { id: 2, name: 'Smart Watch Series X', category: 'Electronics', sales: 987, revenue: 98700, growth: 15.2 },
  { id: 3, name: 'Premium Laptop Stand', category: 'Accessories', sales: 856, revenue: 42800, growth: -5.3 },
  { id: 4, name: 'USB-C Hub Deluxe', category: 'Accessories', sales: 743, revenue: 37150, growth: 8.7 },
  { id: 5, name: 'Mechanical Keyboard', category: 'Electronics', sales: 654, revenue: 65400, growth: 12.1 },
]

const recentTransactions = [
  { id: 'TRX001', customer: 'Alice Johnson', product: 'Wireless Headphones Pro', amount: 99.99, status: 'completed', date: '2024-01-15' },
  { id: 'TRX002', customer: 'Bob Smith', product: 'Smart Watch Series X', amount: 299.99, status: 'pending', date: '2024-01-15' },
  { id: 'TRX003', customer: 'Carol White', product: 'Premium Laptop Stand', amount: 49.99, status: 'completed', date: '2024-01-14' },
  { id: 'TRX004', customer: 'David Brown', product: 'USB-C Hub Deluxe', amount: 79.99, status: 'cancelled', date: '2024-01-14' },
  { id: 'TRX005', customer: 'Emma Davis', product: 'Mechanical Keyboard', amount: 149.99, status: 'completed', date: '2024-01-13' },
]

const salesMetrics = [
  { title: 'Total Revenue', value: '$847,392', change: 18.2, changeType: 'up', icon: DollarSign },
  { title: 'Avg Order Value', value: '$127.50', change: 5.4, changeType: 'up', icon: TrendingUp },
  { title: 'Conversion Rate', value: '3.24%', change: -1.2, changeType: 'down', icon: ArrowUpRight },
  { title: 'Total Orders', value: '6,847', change: 12.8, changeType: 'up', icon: Calendar },
]

export default function Sales() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(
      sectionRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }
    )
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 status-glow-success">Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 status-glow-warning">Pending</Badge>
      case 'cancelled':
        return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 status-glow-danger">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <p className="text-[#b4b4b4] mt-1">Track your sales performance and revenue</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => {
          const Icon = metric.icon
          const ChangeIcon = metric.changeType === 'up' ? ArrowUpRight : ArrowDownRight
          
          return (
            <div
              key={index}
              className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4ff00]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#d4ff00]" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.changeType === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <ChangeIcon className="w-4 h-4" />
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <p className="text-[#b4b4b4] text-sm mb-1">{metric.title}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <p className="text-sm text-[#b4b4b4]">Monthly revenue vs target</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
              <div className="w-3 h-3 rounded-full bg-[#d4ff00]" />
              <span className="text-xs text-[#b4b4b4]">Revenue</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
              <span className="text-xs text-[#b4b4b4]">Target</span>
            </div>
          </div>
        </div>
        
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4ff00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d4ff00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#141414', 
                  border: '1px solid #2a2a2a',
                  borderRadius: '12px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#d4ff00" 
                strokeWidth={2}
                fill="url(#revenueGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Products</h3>
            <Button variant="ghost" size="sm" className="text-[#d4ff00]">View All</Button>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div 
                key={product.id}
                className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center text-[#d4ff00] font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-[#b4b4b4]">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.revenue.toLocaleString()}</p>
                  <p className={`text-sm ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-9 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg pl-9 pr-3 text-sm focus:outline-none focus:border-[#d4ff00]"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl hover:bg-[#1a1a1a] transition-colors table-row-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-[#b4b4b4]">{transaction.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount}</p>
                    <p className="text-sm text-[#666]">{transaction.date}</p>
                  </div>
                  {getStatusBadge(transaction.status)}
                  <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#666]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
