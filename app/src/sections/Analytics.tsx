import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Target,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const trafficData = [
  { name: 'Jan', visitors: 45000, pageViews: 120000, bounceRate: 35 },
  { name: 'Feb', visitors: 52000, pageViews: 145000, bounceRate: 32 },
  { name: 'Mar', visitors: 48000, pageViews: 132000, bounceRate: 38 },
  { name: 'Apr', visitors: 61000, pageViews: 168000, bounceRate: 30 },
  { name: 'May', visitors: 58000, pageViews: 159000, bounceRate: 33 },
  { name: 'Jun', visitors: 72000, pageViews: 198000, bounceRate: 28 },
]

const conversionData = [
  { name: 'Mon', rate: 2.8 },
  { name: 'Tue', rate: 3.2 },
  { name: 'Wed', rate: 2.9 },
  { name: 'Thu', rate: 3.5 },
  { name: 'Fri', rate: 4.1 },
  { name: 'Sat', rate: 3.8 },
  { name: 'Sun', rate: 3.4 },
]

const deviceData = [
  { name: 'Desktop', value: 55, color: '#d4ff00' },
  { name: 'Mobile', value: 35, color: '#3b82f6' },
  { name: 'Tablet', value: 10, color: '#8b5cf6' },
]

const topPages = [
  { path: '/products', views: 45234, change: 12.5 },
  { path: '/category/electronics', views: 32156, change: 8.3 },
  { path: '/cart', views: 28934, change: -2.1 },
  { path: '/checkout', views: 19876, change: 15.7 },
  { path: '/account', views: 15678, change: 5.4 },
]

const analyticsStats = [
  { title: 'Total Visitors', value: '324.5K', change: 18.2, changeType: 'up', icon: Users },
  { title: 'Page Views', value: '892.1K', change: 24.5, changeType: 'up', icon: Eye },
  { title: 'Avg Session', value: '4m 32s', change: 8.7, changeType: 'up', icon: Target },
  { title: 'Bounce Rate', value: '32.4%', change: -5.2, changeType: 'up', icon: TrendingDown },
]

export default function Analytics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(
      sectionRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }
    )
  }, [])

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-[#b4b4b4] mt-1">Deep insights into your platform performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat, index) => {
          const Icon = stat.icon
          const ChangeIcon = stat.changeType === 'up' ? ArrowUpRight : ArrowDownRight
          
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
                  stat.changeType === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <ChangeIcon className="w-4 h-4" />
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <p className="text-[#b4b4b4] text-sm mb-1">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Overview */}
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Traffic Overview</h3>
              <p className="text-sm text-[#b4b4b4]">Visitors and page views</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[#d4ff00]" />
                <span className="text-xs text-[#b4b4b4]">Visitors</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                <span className="text-xs text-[#b4b4b4]">Page Views</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4ff00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4ff00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#d4ff00" 
                  strokeWidth={2}
                  fill="url(#visitorGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="pageViews" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#viewGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Conversion Rate</h3>
              <p className="text-sm text-[#b4b4b4]">Daily conversion performance</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">+12.5%</span>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#d4ff00" 
                  strokeWidth={3}
                  dot={{ fill: '#d4ff00', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#d4ff00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Device Breakdown</h3>
            <p className="text-sm text-[#b4b4b4]">Traffic by device type</p>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
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
          
          <div className="space-y-3 mt-4">
            {deviceData.map((device) => (
              <div key={device.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {device.name === 'Desktop' && <Monitor className="w-4 h-4 text-[#666]" />}
                  {device.name === 'Mobile' && <Smartphone className="w-4 h-4 text-[#666]" />}
                  {device.name === 'Tablet' && <MousePointer className="w-4 h-4 text-[#666]" />}
                  <span className="text-sm">{device.name}</span>
                </div>
                <span className="font-medium" style={{ color: device.color }}>{device.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Top Pages</h3>
              <p className="text-sm text-[#b4b4b4]">Most visited pages</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[#d4ff00]">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center text-[#d4ff00] font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium font-mono">{page.path}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Eye className="w-3 h-3 text-[#666]" />
                      <span className="text-sm text-[#b4b4b4]">{page.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${page.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {page.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{Math.abs(page.change)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Geographic Distribution</h3>
            <p className="text-sm text-[#b4b4b4]">Visitors by country</p>
          </div>
          <Globe className="w-5 h-5 text-[#d4ff00]" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { country: 'United States', flag: '🇺🇸', visitors: '125.4K', percentage: 38 },
            { country: 'United Kingdom', flag: '🇬🇧', visitors: '45.2K', percentage: 14 },
            { country: 'Germany', flag: '🇩🇪', visitors: '38.9K', percentage: 12 },
            { country: 'France', flag: '🇫🇷', visitors: '29.1K', percentage: 9 },
            { country: 'Canada', flag: '🇨🇦', visitors: '24.8K', percentage: 8 },
            { country: 'Others', flag: '🌍', visitors: '61.1K', percentage: 19 },
          ].map((item) => (
            <div key={item.country} className="bg-[#0f0f0f] rounded-xl p-4">
              <div className="text-2xl mb-2">{item.flag}</div>
              <p className="font-medium text-sm">{item.country}</p>
              <p className="text-[#d4ff00] font-bold">{item.visitors}</p>
              <div className="mt-2 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#d4ff00] rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
