import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Navigation,
  Calendar,
  TrendingUp,
  Box,
  ArrowRight
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const shipments = [
  { id: 'SHP001', orderId: 'ORD001', customer: 'Alice Johnson', origin: 'New York, NY', destination: 'Los Angeles, CA', carrier: 'FedEx', status: 'in_transit', eta: '2024-01-18', progress: 65, items: 2 },
  { id: 'SHP002', orderId: 'ORD002', customer: 'Bob Smith', origin: 'Chicago, IL', destination: 'Miami, FL', carrier: 'UPS', status: 'delivered', eta: 'Delivered', progress: 100, items: 1 },
  { id: 'SHP003', orderId: 'ORD003', customer: 'Carol White', origin: 'Seattle, WA', destination: 'Denver, CO', carrier: 'DHL', status: 'pending', eta: '2024-01-20', progress: 0, items: 3 },
  { id: 'SHP004', orderId: 'ORD004', customer: 'David Brown', origin: 'Boston, MA', destination: 'Atlanta, GA', carrier: 'FedEx', status: 'in_transit', eta: '2024-01-17', progress: 80, items: 1 },
  { id: 'SHP005', orderId: 'ORD005', customer: 'Emma Davis', origin: 'San Francisco, CA', destination: 'Portland, OR', carrier: 'UPS', status: 'exception', eta: 'Delayed', progress: 45, items: 2 },
]

const logisticsStats = [
  { title: 'Active Shipments', value: '234', icon: Truck, color: '#d4ff00' },
  { title: 'Delivered Today', value: '89', icon: CheckCircle, color: '#22c55e' },
  { title: 'Pending', value: '45', icon: Clock, color: '#eab308' },
  { title: 'Exceptions', value: '12', icon: AlertCircle, color: '#ef4444' },
]

const trackingEvents = [
  { time: '10:30 AM', date: 'Jan 16, 2024', location: 'Los Angeles, CA', status: 'In Transit', description: 'Package arrived at sorting facility' },
  { time: '08:15 AM', date: 'Jan 16, 2024', location: 'Phoenix, AZ', status: 'In Transit', description: 'Package departed facility' },
  { time: '06:00 PM', date: 'Jan 15, 2024', location: 'Albuquerque, NM', status: 'In Transit', description: 'Package arrived at facility' },
  { time: '02:30 PM', date: 'Jan 15, 2024', location: 'Dallas, TX', status: 'Picked Up', description: 'Package picked up by carrier' },
]

export default function Logistics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedShipment, setSelectedShipment] = useState<typeof shipments[0] | null>(null)

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
      in_transit: 'bg-blue-500/20 text-blue-500',
      delivered: 'bg-green-500/20 text-green-500 status-glow-success',
      pending: 'bg-yellow-500/20 text-yellow-500 status-glow-warning',
      exception: 'bg-red-500/20 text-red-500 status-glow-danger',
    }
    const labels = {
      in_transit: 'In Transit',
      delivered: 'Delivered',
      pending: 'Pending',
      exception: 'Exception',
    }
    return (
      <Badge className={`${styles[status as keyof typeof styles]} capitalize`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logistics</h1>
          <p className="text-[#b4b4b4] mt-1">Track and manage shipments</p>
        </div>
        <Button className="bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
          <Navigation className="w-4 h-4 mr-2" />
          Track Shipment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {logisticsStats.map((stat, index) => {
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
            placeholder="Search shipments..."
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
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
            <option value="exception">Exception</option>
          </select>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.map((shipment, index) => (
          <div
            key={shipment.id}
            className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 card-hover cursor-pointer group"
            onClick={() => setSelectedShipment(shipment)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#d4ff00]/20 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#d4ff00]" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#d4ff00]">{shipment.id}</span>
                    <span className="text-[#666]">•</span>
                    <span className="text-sm text-[#b4b4b4]">{shipment.orderId}</span>
                  </div>
                  <p className="font-medium">{shipment.customer}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-[#666]" />
                  <span className="text-[#b4b4b4]">{shipment.origin}</span>
                  <ArrowRight className="w-4 h-4 text-[#d4ff00]" />
                  <span className="text-[#b4b4b4]">{shipment.destination}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-[#b4b4b4]">{shipment.carrier}</p>
                    <p className="font-medium">{shipment.eta}</p>
                  </div>
                  {getStatusBadge(shipment.status)}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#b4b4b4]">{shipment.items} items</span>
                <span className="text-[#d4ff00]">{shipment.progress}%</span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4ff00] to-[#a3cc00] rounded-full transition-all duration-1000"
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <h3 className="font-semibold">Delivery Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">On-Time Delivery</span>
              <span className="font-medium text-green-500">94.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">Average Delivery Time</span>
              <span className="font-medium">2.3 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">Customer Satisfaction</span>
              <span className="font-medium text-green-500">4.8/5</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center">
              <Box className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <h3 className="font-semibold">Carrier Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">FedEx</span>
              <span className="font-medium">45 shipments</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">UPS</span>
              <span className="font-medium">38 shipments</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">DHL</span>
              <span className="font-medium">22 shipments</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <h3 className="font-semibold">Today's Schedule</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">Pickups</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">Deliveries</span>
              <span className="font-medium">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#b4b4b4]">Returns</span>
              <span className="font-medium">5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Detail Dialog */}
      <Dialog open={!!selectedShipment} onOpenChange={() => setSelectedShipment(null)}>
        <DialogContent className="bg-[#141414] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Shipment Tracking</DialogTitle>
          </DialogHeader>
          {selectedShipment && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <div>
                  <p className="text-sm text-[#b4b4b4]">Shipment ID</p>
                  <p className="font-mono text-lg text-[#d4ff00]">{selectedShipment.id}</p>
                </div>
                {getStatusBadge(selectedShipment.status)}
              </div>
              
              {/* Route */}
              <div className="bg-[#0f0f0f] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 text-[#d4ff00] mx-auto mb-2" />
                    <p className="font-medium">{selectedShipment.origin.split(',')[0]}</p>
                    <p className="text-sm text-[#666]">{selectedShipment.origin.split(',')[1]}</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#d4ff00] to-[#a3cc00]"
                        style={{ width: `${selectedShipment.progress}%` }}
                      />
                    </div>
                    <Truck className="w-5 h-5 text-[#d4ff00] mx-auto -mt-3" style={{ marginLeft: `${selectedShipment.progress}%`, transform: 'translateX(-50%)' }} />
                  </div>
                  <div className="text-center">
                    <MapPin className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="font-medium">{selectedShipment.destination.split(',')[0]}</p>
                    <p className="text-sm text-[#666]">{selectedShipment.destination.split(',')[1]}</p>
                  </div>
                </div>
              </div>
              
              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#b4b4b4]">Carrier</p>
                  <p className="font-medium">{selectedShipment.carrier}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">ETA</p>
                  <p className="font-medium">{selectedShipment.eta}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">Items</p>
                  <p className="font-medium">{selectedShipment.items}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">Progress</p>
                  <p className="font-medium text-[#d4ff00]">{selectedShipment.progress}%</p>
                </div>
              </div>
              
              {/* Tracking Timeline */}
              <div>
                <h4 className="font-semibold mb-4">Tracking History</h4>
                <div className="space-y-4">
                  {trackingEvents.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-[#d4ff00]' : 'bg-[#666]'}`} />
                        {index < trackingEvents.length - 1 && (
                          <div className="w-0.5 h-full bg-[#2a2a2a] mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{event.status}</span>
                          <span className="text-sm text-[#666]">{event.time}</span>
                        </div>
                        <p className="text-sm text-[#b4b4b4]">{event.description}</p>
                        <p className="text-sm text-[#666]">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
                  <Navigation className="w-4 h-4 mr-2" />
                  Track Live
                </Button>
                <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  Contact Carrier
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
