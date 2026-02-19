import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const paymentData = [
  { name: 'Mon', income: 12500, expense: 8200 },
  { name: 'Tue', income: 15200, expense: 9800 },
  { name: 'Wed', income: 11800, expense: 7500 },
  { name: 'Thu', income: 18900, expense: 11200 },
  { name: 'Fri', income: 22400, expense: 13500 },
  { name: 'Sat', income: 25600, expense: 14800 },
  { name: 'Sun', income: 19800, expense: 10200 },
]

const methodData = [
  { name: 'Credit Card', value: 45, color: '#d4ff00' },
  { name: 'PayPal', value: 25, color: '#3b82f6' },
  { name: 'Bank Transfer', value: 20, color: '#8b5cf6' },
  { name: 'Crypto', value: 10, color: '#f97316' },
]

const transactions = [
  { id: 'TXN001', customer: 'Alice Johnson', email: 'alice@email.com', amount: 299.99, method: 'Credit Card', status: 'completed', date: '2024-01-15 14:30', type: 'income' },
  { id: 'TXN002', customer: 'Bob Smith', email: 'bob@email.com', amount: 149.50, method: 'PayPal', status: 'pending', date: '2024-01-15 13:15', type: 'income' },
  { id: 'TXN003', customer: 'Platform Fee', email: 'system', amount: 500.00, method: 'Bank Transfer', status: 'completed', date: '2024-01-15 12:00', type: 'expense' },
  { id: 'TXN004', customer: 'Carol White', email: 'carol@email.com', amount: 899.99, method: 'Credit Card', status: 'completed', date: '2024-01-15 11:45', type: 'income' },
  { id: 'TXN005', customer: 'David Brown', email: 'david@email.com', amount: 49.99, method: 'Crypto', status: 'failed', date: '2024-01-15 10:30', type: 'income' },
  { id: 'TXN006', customer: 'Marketing', email: 'system', amount: 1200.00, method: 'Bank Transfer', status: 'completed', date: '2024-01-15 09:00', type: 'expense' },
]

const paymentStats = [
  { title: 'Total Revenue', value: '$847,392', change: 18.2, changeType: 'up', icon: DollarSign },
  { title: 'Total Expenses', value: '$234,567', change: 5.4, changeType: 'up', icon: TrendingDown },
  { title: 'Net Profit', value: '$612,825', change: 24.8, changeType: 'up', icon: TrendingUp },
  { title: 'Pending', value: '$45,230', change: -2.1, changeType: 'down', icon: Clock },
]

export default function Payments() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(
      sectionRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }
    )
  }, [])

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-500/20 text-green-500 status-glow-success',
      pending: 'bg-yellow-500/20 text-yellow-500 status-glow-warning',
      failed: 'bg-red-500/20 text-red-500 status-glow-danger',
    }
    return (
      <Badge className={`${styles[status as keyof typeof styles]} capitalize`}>
        {status}
      </Badge>
    )
  }

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter
    const matchesType = typeFilter === 'all' || txn.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-[#b4b4b4] mt-1">Manage transactions and financial overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentStats.map((stat, index) => {
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expense Chart */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Income vs Expenses</h3>
              <p className="text-sm text-[#b4b4b4]">Weekly financial overview</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[#d4ff00]" />
                <span className="text-xs text-[#b4b4b4]">Income</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="text-xs text-[#b4b4b4]">Expense</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={paymentData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4ff00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4ff00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
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
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#d4ff00" 
                  strokeWidth={2}
                  fill="url(#incomeGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expense" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fill="url(#expenseGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <p className="text-sm text-[#b4b4b4]">Distribution by method</p>
          </div>
          
          <div className="space-y-4">
            {methodData.map((method) => (
              <div key={method.name} className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: method.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{method.name}</span>
                    <span className="text-sm font-medium">{method.value}%</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${method.value}%`, backgroundColor: method.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">Total Transactions</span>
              <span className="font-medium">1,247</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          
          <div className="flex items-center gap-3">
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
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-9 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#b4b4b4]">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#b4b4b4]">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#b4b4b4]">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#b4b4b4]">Method</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#b4b4b4]">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#b4b4b4]">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr 
                  key={txn.id}
                  className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors table-row-hover"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono text-[#d4ff00]">{txn.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{txn.customer}</p>
                      {txn.email !== 'system' && (
                        <p className="text-sm text-[#666]">{txn.email}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${txn.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      {txn.type === 'income' ? '+' : '-'}${txn.amount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#666]" />
                      <span>{txn.method}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(txn.status)}</td>
                  <td className="py-3 px-4 text-[#b4b4b4]">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
