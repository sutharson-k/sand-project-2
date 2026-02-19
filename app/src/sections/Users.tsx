import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  Users as UsersIcon,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  UserPlus,
  Edit,
  CheckCircle,
  XCircle,
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

const users = [
  { id: 'USR001', name: 'Alice Johnson', email: 'alice@email.com', phone: '+1 234-567-8901', location: 'New York, USA', role: 'customer', status: 'active', joined: '2024-01-15', orders: 12, spent: 1249.99 },
  { id: 'USR002', name: 'Bob Smith', email: 'bob@email.com', phone: '+1 234-567-8902', location: 'Los Angeles, USA', role: 'customer', status: 'active', joined: '2024-01-14', orders: 8, spent: 899.50 },
  { id: 'USR003', name: 'Carol White', email: 'carol@email.com', phone: '+1 234-567-8903', location: 'Chicago, USA', role: 'customer', status: 'inactive', joined: '2024-01-13', orders: 3, spent: 299.99 },
  { id: 'USR004', name: 'David Brown', email: 'david@email.com', phone: '+1 234-567-8904', location: 'Houston, USA', role: 'admin', status: 'active', joined: '2023-12-01', orders: 0, spent: 0 },
  { id: 'USR005', name: 'Emma Davis', email: 'emma@email.com', phone: '+1 234-567-8905', location: 'Phoenix, USA', role: 'customer', status: 'active', joined: '2024-01-12', orders: 15, spent: 1849.75 },
  { id: 'USR006', name: 'Frank Miller', email: 'frank@email.com', phone: '+1 234-567-8906', location: 'Philadelphia, USA', role: 'customer', status: 'banned', joined: '2024-01-10', orders: 1, spent: 49.99 },
  { id: 'USR007', name: 'Grace Lee', email: 'grace@email.com', phone: '+1 234-567-8907', location: 'San Antonio, USA', role: 'moderator', status: 'active', joined: '2023-11-15', orders: 5, spent: 599.99 },
  { id: 'USR008', name: 'Henry Wilson', email: 'henry@email.com', phone: '+1 234-567-8908', location: 'San Diego, USA', role: 'customer', status: 'active', joined: '2024-01-08', orders: 7, spent: 749.25 },
]

const userStats = [
  { title: 'Total Users', value: '89,234', icon: UsersIcon, color: '#d4ff00' },
  { title: 'Active', value: '76,543', icon: CheckCircle, color: '#22c55e' },
  { title: 'Inactive', value: '8,234', icon: XCircle, color: '#666' },
  { title: 'New This Month', value: '1,247', icon: UserPlus, color: '#3b82f6' },
]

export default function Users() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
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
      active: 'bg-green-500/20 text-green-500 status-glow-success',
      inactive: 'bg-gray-500/20 text-gray-500',
      banned: 'bg-red-500/20 text-red-500 status-glow-danger',
    }
    return (
      <Badge className={`${styles[status as keyof typeof styles]} capitalize`}>
        {status}
      </Badge>
    )
  }

  const getRoleBadge = (role: string) => {
    const styles = {
      customer: 'bg-blue-500/20 text-blue-500',
      admin: 'bg-purple-500/20 text-purple-500',
      moderator: 'bg-orange-500/20 text-orange-500',
    }
    return (
      <Badge className={`${styles[role as keyof typeof styles]} capitalize`}>
        {role}
      </Badge>
    )
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const usersPerPage = 5
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-[#b4b4b4] mt-1">Manage your platform users</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {userStats.map((stat, index) => {
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
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl pl-11 pr-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#b4b4b4]" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedUsers.map((user, index) => (
          <div
            key={user.id}
            className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 card-hover tilt-card cursor-pointer group"
            onClick={() => setSelectedUser(user)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center ring-animation">
                  <span className="text-black font-bold text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#141414] ${
                  user.status === 'active' ? 'bg-green-500' :
                  user.status === 'inactive' ? 'bg-gray-500' : 'bg-red-500'
                }`} />
              </div>
              <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="w-4 h-4 text-[#666]" />
              </button>
            </div>
            
            <h3 className="font-semibold text-lg mb-1 group-hover:text-[#d4ff00] transition-colors">{user.name}</h3>
            <p className="text-sm text-[#666] mb-4">{user.email}</p>
            
            <div className="flex items-center gap-2 mb-4">
              {getRoleBadge(user.role)}
              {getStatusBadge(user.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1a1a1a]">
              <div>
                <p className="text-xs text-[#666]">Orders</p>
                <p className="font-medium">{user.orders}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Spent</p>
                <p className="font-medium text-[#d4ff00]">${user.spent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#b4b4b4]">
          Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
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

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="bg-[#141414] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#2a2a2a]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center">
                  <span className="text-black font-bold text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-[#b4b4b4]">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#b4b4b4]">Phone</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#b4b4b4]">Location</p>
                    <p className="font-medium">{selectedUser.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#b4b4b4]">Joined</p>
                    <p className="font-medium">{selectedUser.joined}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#d4ff00]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#b4b4b4]">User ID</p>
                    <p className="font-medium font-mono">{selectedUser.id}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0f0f0f] rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#d4ff00]">{selectedUser.orders}</p>
                    <p className="text-sm text-[#b4b4b4]">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#d4ff00]">${selectedUser.spent}</p>
                    <p className="text-sm text-[#b4b4b4]">Total Spent</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
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
