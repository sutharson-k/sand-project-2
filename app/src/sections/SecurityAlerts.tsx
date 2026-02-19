import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  ShieldAlert,
  Shield,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Search,
  Download,
  Clock,
  User,
  Globe,
  Lock,
  Eye,
  Ban,
  MoreHorizontal
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

const alertData = [
  { name: 'Mon', critical: 2, warning: 8, info: 15 },
  { name: 'Tue', critical: 1, warning: 5, info: 12 },
  { name: 'Wed', critical: 3, warning: 10, info: 18 },
  { name: 'Thu', critical: 0, warning: 6, info: 14 },
  { name: 'Fri', critical: 2, warning: 9, info: 16 },
  { name: 'Sat', critical: 1, warning: 4, info: 10 },
  { name: 'Sun', critical: 0, warning: 3, info: 8 },
]

const alerts = [
  { id: 'ALT001', type: 'critical', title: 'Multiple Failed Login Attempts', description: 'User account locked after 5 failed attempts', user: 'john.doe@email.com', ip: '192.168.1.100', location: 'New York, USA', timestamp: '2 min ago', status: 'open' },
  { id: 'ALT002', type: 'warning', title: 'Suspicious Activity Detected', description: 'Unusual transaction pattern detected', user: 'sarah.smith@email.com', ip: '10.0.0.50', location: 'London, UK', timestamp: '15 min ago', status: 'open' },
  { id: 'ALT003', type: 'info', title: 'New Device Login', description: 'First time login from new device', user: 'mike.johnson@email.com', ip: '172.16.0.25', location: 'Los Angeles, USA', timestamp: '1 hour ago', status: 'resolved' },
  { id: 'ALT004', type: 'critical', title: 'Potential Data Breach', description: 'Unusual data access pattern detected', user: 'System', ip: 'N/A', location: 'N/A', timestamp: '2 hours ago', status: 'investigating' },
  { id: 'ALT005', type: 'warning', title: 'API Rate Limit Exceeded', description: 'Multiple requests from single IP', user: 'api.user@email.com', ip: '203.0.113.50', location: 'Singapore', timestamp: '3 hours ago', status: 'open' },
  { id: 'ALT006', type: 'info', title: 'Password Changed', description: 'User successfully changed password', user: 'emma.brown@email.com', ip: '192.168.1.45', location: 'Chicago, USA', timestamp: '4 hours ago', status: 'resolved' },
]

const securityStats = [
  { title: 'Total Alerts', value: '234', icon: ShieldAlert, color: '#ef4444' },
  { title: 'Critical', value: '12', icon: AlertTriangle, color: '#ef4444' },
  { title: 'Warnings', value: '45', icon: AlertCircle, color: '#eab308' },
  { title: 'Resolved', value: '177', icon: CheckCircle, color: '#22c55e' },
]

const blockedIPs = [
  { ip: '192.168.1.200', reason: 'Brute force attack', blocked: '2 hours ago', attempts: 156 },
  { ip: '10.0.0.99', reason: 'Suspicious activity', blocked: '5 hours ago', attempts: 89 },
  { ip: '172.16.0.150', reason: 'DDoS attempt', blocked: '1 day ago', attempts: 2341 },
]

export default function SecurityAlerts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedAlert, setSelectedAlert] = useState<typeof alerts[0] | null>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(
      sectionRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }
    )
  }, [])

  const getAlertBadge = (type: string) => {
    const styles = {
      critical: 'bg-red-500/20 text-red-500 status-glow-danger',
      warning: 'bg-yellow-500/20 text-yellow-500 status-glow-warning',
      info: 'bg-blue-500/20 text-blue-500',
    }
    return (
      <Badge className={`${styles[type as keyof typeof styles]} capitalize`}>
        {type}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-red-500/20 text-red-500',
      investigating: 'bg-yellow-500/20 text-yellow-500',
      resolved: 'bg-green-500/20 text-green-500',
    }
    return (
      <Badge className={`${styles[status as keyof typeof styles]} capitalize`}>
        {status}
      </Badge>
    )
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || alert.type === typeFilter
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Alerts</h1>
          <p className="text-[#b4b4b4] mt-1">Monitor and respond to security threats</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
            <Shield className="w-4 h-4 mr-2" />
            Run Security Scan
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {securityStats.map((stat, index) => {
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold">Recent Alerts</h3>
              <p className="text-sm text-[#b4b4b4]">Security events and notifications</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
                <input
                  type="text"
                  placeholder="Search alerts..."
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
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
                  alert.type === 'critical' ? 'bg-red-500/5 border border-red-500/20 hover:bg-red-500/10' :
                  alert.type === 'warning' ? 'bg-yellow-500/5 border border-yellow-500/20 hover:bg-yellow-500/10' :
                  'bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10'
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="w-10 h-10 rounded-lg bg-[#141414] flex items-center justify-center flex-shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-[#d4ff00]">{alert.id}</span>
                    {getAlertBadge(alert.type)}
                    {getStatusBadge(alert.status)}
                  </div>
                  <h4 className="font-medium mb-1">{alert.title}</h4>
                  <p className="text-sm text-[#b4b4b4] mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-sm text-[#666]">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{alert.user}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-[#666]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Alert Trends */}
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-[#d4ff00]" />
              </div>
              <h3 className="font-semibold">Alert Trends</h3>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#141414', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar dataKey="critical" fill="#ef4444" />
                  <Bar dataKey="warning" fill="#eab308" />
                  <Bar dataKey="info" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-[#b4b4b4]">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs text-[#b4b4b4]">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-[#b4b4b4]">Info</span>
              </div>
            </div>
          </div>

          {/* Blocked IPs */}
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Ban className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold">Blocked IPs</h3>
            </div>
            
            <div className="space-y-3">
              {blockedIPs.map((ip) => (
                <div key={ip.ip} className="p-3 bg-[#0f0f0f] rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm">{ip.ip}</span>
                    <Badge className="bg-red-500/20 text-red-500 text-xs">{ip.attempts} attempts</Badge>
                  </div>
                  <p className="text-sm text-[#b4b4b4]">{ip.reason}</p>
                  <p className="text-xs text-[#666] mt-1">Blocked {ip.blocked}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4 border-[#2a2a2a] hover:bg-[#1a1a1a]">
              <Lock className="w-4 h-4 mr-2" />
              Manage Blocklist
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Resolved
              </Button>
              <Button variant="outline" className="w-full border-[#2a2a2a] hover:bg-[#1a1a1a]">
                <Eye className="w-4 h-4 mr-2" />
                View Audit Log
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="bg-[#141414] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              {getAlertIcon(selectedAlert?.type || 'info')}
              Security Alert
            </DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-6">
              <div className={`p-4 rounded-xl ${
                selectedAlert.type === 'critical' ? 'bg-red-500/10 border border-red-500/20' :
                selectedAlert.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                'bg-blue-500/10 border border-blue-500/20'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[#d4ff00]">{selectedAlert.id}</span>
                  {getAlertBadge(selectedAlert.type)}
                  {getStatusBadge(selectedAlert.status)}
                </div>
                <h3 className="text-lg font-semibold">{selectedAlert.title}</h3>
                <p className="text-[#b4b4b4]">{selectedAlert.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#b4b4b4]">User</p>
                  <p className="font-medium">{selectedAlert.user}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">IP Address</p>
                  <p className="font-mono">{selectedAlert.ip}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">Location</p>
                  <p className="font-medium">{selectedAlert.location}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">Timestamp</p>
                  <p className="font-medium">{selectedAlert.timestamp}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-500 hover:bg-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Resolved
                </Button>
                <Button variant="outline" className="flex-1 border-[#2a2a2a] hover:bg-[#1a1a1a]">
                  <Ban className="w-4 h-4 mr-2" />
                  Block IP
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
