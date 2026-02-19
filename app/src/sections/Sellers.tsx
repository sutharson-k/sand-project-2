import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  Store,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Star,
  Package,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Mail,
  Phone,
  MapPin,
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

const sellers = [
  { id: 'SEL001', name: 'TechStore Inc.', owner: 'Michael Chen', email: 'michael@techstore.com', phone: '+1 234-567-8901', location: 'San Francisco, CA', category: 'Electronics', rating: 4.8, products: 156, sales: 45600, status: 'verified', joined: '2023-06-15' },
  { id: 'SEL002', name: 'Fashion Hub', owner: 'Sarah Williams', email: 'sarah@fashionhub.com', phone: '+1 234-567-8902', location: 'New York, NY', category: 'Fashion', rating: 4.5, products: 342, sales: 28900, status: 'verified', joined: '2023-08-20' },
  { id: 'SEL003', name: 'Home Essentials', owner: 'Robert Taylor', email: 'robert@homeessentials.com', phone: '+1 234-567-8903', location: 'Los Angeles, CA', category: 'Home & Garden', rating: 4.2, products: 89, sales: 12300, status: 'pending', joined: '2024-01-10' },
  { id: 'SEL004', name: 'Sports World', owner: 'Lisa Anderson', email: 'lisa@sportsworld.com', phone: '+1 234-567-8904', location: 'Chicago, IL', category: 'Sports', rating: 4.7, products: 234, sales: 38900, status: 'verified', joined: '2023-09-05' },
  { id: 'SEL005', name: 'Book Haven', owner: 'David Martinez', email: 'david@bookhaven.com', phone: '+1 234-567-8905', location: 'Boston, MA', category: 'Books', rating: 4.9, products: 567, sales: 15600, status: 'verified', joined: '2023-07-12' },
  { id: 'SEL006', name: 'Gadget Zone', owner: 'Emily Park', email: 'emily@gadgetzone.com', phone: '+1 234-567-8906', location: 'Seattle, WA', category: 'Electronics', rating: 3.8, products: 78, sales: 8900, status: 'suspended', joined: '2023-11-01' },
]

const sellerStats = [
  { title: 'Total Sellers', value: '3,456', icon: Store, color: '#d4ff00' },
  { title: 'Verified', value: '2,890', icon: CheckCircle, color: '#22c55e' },
  { title: 'Pending', value: '156', icon: Clock, color: '#eab308' },
  { title: 'New This Month', value: '89', icon: Plus, color: '#3b82f6' },
]

export default function Sellers() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedSeller, setSelectedSeller] = useState<typeof sellers[0] | null>(null)
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
      verified: 'bg-green-500/20 text-green-500 status-glow-success',
      pending: 'bg-yellow-500/20 text-yellow-500 status-glow-warning',
      suspended: 'bg-red-500/20 text-red-500 status-glow-danger',
    }
    return (
      <Badge className={`${styles[status as keyof typeof styles]} capitalize`}>
        {status}
      </Badge>
    )
  }

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sellersPerPage = 4
  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage)
  const paginatedSellers = filteredSellers.slice((currentPage - 1) * sellersPerPage, currentPage * sellersPerPage)

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sellers</h1>
          <p className="text-[#b4b4b4] mt-1">Manage platform sellers and vendors</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
            <Plus className="w-4 h-4 mr-2" />
            Add Seller
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sellerStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-[#141414] border border-[#1a1a1a] rounded-xl p-4 card-hover"
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
            placeholder="Search sellers..."
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
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedSellers.map((seller, index) => (
          <div
            key={seller.id}
            className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 card-hover group"
            onClick={() => setSelectedSeller(seller)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center">
                  <Store className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-[#d4ff00] transition-colors">{seller.name}</h3>
                  <p className="text-sm text-[#666]">{seller.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(seller.status)}
                <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4 text-[#666]" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{seller.rating}</span>
              </div>
              <span className="text-[#666]">•</span>
              <span className="text-sm text-[#b4b4b4]">{seller.category}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-[#1a1a1a]">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Package className="w-4 h-4 text-[#d4ff00]" />
                  <span className="font-bold">{seller.products}</span>
                </div>
                <p className="text-xs text-[#666]">Products</p>
              </div>
              <div className="text-center border-x border-[#1a1a1a]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#d4ff00]" />
                  <span className="font-bold">${(seller.sales / 1000).toFixed(1)}k</span>
                </div>
                <p className="text-xs text-[#666]">Sales</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-[#d4ff00]" />
                  <span className="font-bold">{Math.floor(seller.sales / 100)}</span>
                </div>
                <p className="text-xs text-[#666]">Customers</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-[#666]">Joined {seller.joined}</p>
              <Button variant="ghost" size="sm" className="text-[#d4ff00]">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#b4b4b4]">
          Showing {(currentPage - 1) * sellersPerPage + 1} to {Math.min(currentPage * sellersPerPage, filteredSellers.length)} of {filteredSellers.length} sellers
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

      {/* Seller Detail Dialog */}
      <Dialog open={!!selectedSeller} onOpenChange={() => setSelectedSeller(null)}>
        <DialogContent className="bg-[#141414] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Seller Details</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#2a2a2a]">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center">
                  <Store className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedSeller.name}</h3>
                  <p className="text-[#b4b4b4]">{selectedSeller.owner}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(selectedSeller.status)}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{selectedSeller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#b4b4b4]">Email</p>
                    <p className="font-medium text-sm">{selectedSeller.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#b4b4b4]">Phone</p>
                    <p className="font-medium">{selectedSeller.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#d4ff00]" />
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">Location</p>
                  <p className="font-medium">{selectedSeller.location}</p>
                </div>
              </div>
              
              <div className="bg-[#0f0f0f] rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#d4ff00]">{selectedSeller.products}</p>
                    <p className="text-xs text-[#b4b4b4]">Products</p>
                  </div>
                  <div className="text-center border-x border-[#1a1a1a]">
                    <p className="text-xl font-bold text-[#d4ff00]">${(selectedSeller.sales / 1000).toFixed(1)}k</p>
                    <p className="text-xs text-[#b4b4b4]">Total Sales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#d4ff00]">{Math.floor(selectedSeller.sales / 100)}</p>
                    <p className="text-xs text-[#b4b4b4]">Customers</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify Seller
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
