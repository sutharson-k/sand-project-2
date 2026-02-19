import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  ShoppingCart,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const orders = [
  { id: 'ORD001', customer: 'Alice Johnson', email: 'alice@email.com', product: 'Wireless Headphones Pro', quantity: 2, total: 199.98, status: 'completed', date: '2024-01-15', shipping: 'Express' },
  { id: 'ORD002', customer: 'Bob Smith', email: 'bob@email.com', product: 'Smart Watch Series X', quantity: 1, total: 299.99, status: 'processing', date: '2024-01-15', shipping: 'Standard' },
  { id: 'ORD003', customer: 'Carol White', email: 'carol@email.com', product: 'Premium Laptop Stand', quantity: 3, total: 149.97, status: 'shipped', date: '2024-01-14', shipping: 'Express' },
  { id: 'ORD004', customer: 'David Brown', email: 'david@email.com', product: 'USB-C Hub Deluxe', quantity: 1, total: 79.99, status: 'cancelled', date: '2024-01-14', shipping: 'Standard' },
  { id: 'ORD005', customer: 'Emma Davis', email: 'emma@email.com', product: 'Mechanical Keyboard', quantity: 2, total: 299.98, status: 'pending', date: '2024-01-13', shipping: 'Express' },
  { id: 'ORD006', customer: 'Frank Miller', email: 'frank@email.com', product: 'Wireless Mouse Pro', quantity: 1, total: 59.99, status: 'completed', date: '2024-01-13', shipping: 'Standard' },
  { id: 'ORD007', customer: 'Grace Lee', email: 'grace@email.com', product: 'Monitor Stand', quantity: 1, total: 89.99, status: 'processing', date: '2024-01-12', shipping: 'Express' },
  { id: 'ORD008', customer: 'Henry Wilson', email: 'henry@email.com', product: 'Webcam 4K', quantity: 2, total: 399.98, status: 'shipped', date: '2024-01-12', shipping: 'Standard' },
]

const orderStats = [
  { title: 'Total Orders', value: '1,247', icon: ShoppingCart, color: '#d4ff00' },
  { title: 'Pending', value: '48', icon: Clock, color: '#eab308' },
  { title: 'Processing', value: '156', icon: Package, color: '#3b82f6' },
  { title: 'Shipped', value: '89', icon: Truck, color: '#8b5cf6' },
  { title: 'Completed', value: '892', icon: CheckCircle, color: '#22c55e' },
  { title: 'Cancelled', value: '62', icon: XCircle, color: '#ef4444' },
]

export default function Orders() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

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
      processing: 'bg-blue-500/20 text-blue-500',
      shipped: 'bg-purple-500/20 text-purple-500',
      pending: 'bg-yellow-500/20 text-yellow-500 status-glow-warning',
      cancelled: 'bg-red-500/20 text-red-500 status-glow-danger',
    }
    return (
      <Badge className={`${styles[status as keyof typeof styles]} capitalize`}>
        {status}
      </Badge>
    )
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const ordersPerPage = 5
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-[#b4b4b4] mt-1">Manage and track all orders</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {orderStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-[#141414] border border-[#1a1a1a] rounded-xl p-4 card-hover cursor-pointer"
              onClick={() => setStatusFilter(stat.title.toLowerCase() === 'total orders' ? 'all' : stat.title.toLowerCase())}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-[#b4b4b4]">{stat.title}</p>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl pl-11 pr-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#b4b4b4]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Order ID</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Product</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Quantity</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Total</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-[#b4b4b4]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr 
                  key={order.id}
                  className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors table-row-hover"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="py-4 px-6">
                    <span className="font-mono text-[#d4ff00]">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-[#666]">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#666]" />
                      <span className="truncate max-w-[150px]">{order.product}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{order.quantity}</td>
                  <td className="py-4 px-6 font-medium">${order.total}</td>
                  <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                  <td className="py-4 px-6 text-[#b4b4b4]">{order.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-[#b4b4b4]" />
                      </button>
                      <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-[#b4b4b4]" />
                      </button>
                      <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-[#1a1a1a]">
          <p className="text-sm text-[#b4b4b4]">
            Showing {(currentPage - 1) * ordersPerPage + 1} to {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-[#1a1a1a] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg font-medium transition-colors ${
                  currentPage === page 
                    ? 'bg-[#d4ff00] text-black' 
                    : 'hover:bg-[#1a1a1a] text-[#b4b4b4]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-[#1a1a1a] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-[#141414] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <div>
                  <p className="text-sm text-[#b4b4b4]">Order ID</p>
                  <p className="font-mono text-lg text-[#d4ff00]">{selectedOrder.id}</p>
                </div>
                {getStatusBadge(selectedOrder.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#b4b4b4] mb-1">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p className="text-sm text-[#666]">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4] mb-1">Order Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#b4b4b4] mb-2">Product</p>
                <div className="bg-[#0f0f0f] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-[#d4ff00]" />
                      <span>{selectedOrder.product}</span>
                    </div>
                    <span className="text-[#b4b4b4]">x{selectedOrder.quantity}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#b4b4b4] mb-1">Shipping Method</p>
                  <p className="font-medium">{selectedOrder.shipping}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4] mb-1">Total Amount</p>
                  <p className="font-medium text-xl text-[#d4ff00]">${selectedOrder.total}</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
                  <Truck className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
