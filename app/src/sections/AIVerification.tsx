import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  RefreshCw,
  Eye,
  User,
  FileText,
  Shield,
  Cpu,
  Zap,
  BarChart3
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const verificationData = [
  { name: 'Mon', verified: 45, rejected: 5, pending: 12 },
  { name: 'Tue', verified: 52, rejected: 3, pending: 8 },
  { name: 'Wed', verified: 48, rejected: 7, pending: 15 },
  { name: 'Thu', verified: 61, rejected: 4, pending: 10 },
  { name: 'Fri', verified: 58, rejected: 6, pending: 14 },
  { name: 'Sat', verified: 42, rejected: 2, pending: 6 },
  { name: 'Sun', verified: 38, rejected: 3, pending: 8 },
]

const queueItems = [
  { id: 'VEF001', type: 'identity', user: 'John Doe', email: 'john@email.com', confidence: 98.5, status: 'verified', submitted: '2 min ago', avatar: 'JD' },
  { id: 'VEF002', type: 'document', user: 'Sarah Smith', email: 'sarah@email.com', confidence: 87.2, status: 'pending', submitted: '5 min ago', avatar: 'SS' },
  { id: 'VEF003', type: 'identity', user: 'Mike Johnson', email: 'mike@email.com', confidence: 45.8, status: 'rejected', submitted: '10 min ago', avatar: 'MJ' },
  { id: 'VEF004', type: 'document', user: 'Emily Brown', email: 'emily@email.com', confidence: 94.3, status: 'verified', submitted: '15 min ago', avatar: 'EB' },
  { id: 'VEF005', type: 'identity', user: 'David Wilson', email: 'david@email.com', confidence: 72.1, status: 'pending', submitted: '20 min ago', avatar: 'DW' },
  { id: 'VEF006', type: 'document', user: 'Lisa Anderson', email: 'lisa@email.com', confidence: 91.7, status: 'verified', submitted: '25 min ago', avatar: 'LA' },
]

const aiStats = [
  { title: 'Total Verified', value: '12,847', icon: CheckCircle, color: '#22c55e' },
  { title: 'Pending Review', value: '234', icon: Clock, color: '#eab308' },
  { title: 'Rejected', value: '89', icon: XCircle, color: '#ef4444' },
  { title: 'Accuracy Rate', value: '98.7%', icon: Cpu, color: '#d4ff00' },
]

const recentAlerts = [
  { id: 1, type: 'suspicious', message: 'Multiple failed attempts detected', user: 'user@email.com', time: '2 min ago' },
  { id: 2, type: 'warning', message: 'Document quality below threshold', user: 'john@email.com', time: '5 min ago' },
  { id: 3, type: 'info', message: 'New verification model deployed', user: 'System', time: '15 min ago' },
]

export default function AIVerification() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scannerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<typeof queueItems[0] | null>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(
      sectionRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }
    )

    // Scanner animation
    if (scannerRef.current) {
      gsap.to(scannerRef.current, {
        y: '100%',
        duration: 2,
        repeat: -1,
        ease: 'none'
      })
    }
  }, [])

  const getStatusBadge = (status: string) => {
    const styles = {
      verified: 'bg-green-500/20 text-green-500 status-glow-success',
      pending: 'bg-yellow-500/20 text-yellow-500 status-glow-warning',
      rejected: 'bg-red-500/20 text-red-500 status-glow-danger',
    }
    return (
      <Badge className={`${styles[status as keyof typeof styles]} capitalize`}>
        {status}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    return type === 'identity' ? <User className="w-4 h-4" /> : <FileText className="w-4 h-4" />
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const filteredItems = queueItems.filter(item => {
    const matchesSearch = item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Verification</h1>
          <p className="text-[#b4b4b4] mt-1">Automated identity and document verification</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2a2a2a] rounded-xl">
            <div className="w-2 h-2 bg-[#d4ff00] rounded-full live-pulse" />
            <span className="text-sm">AI Active</span>
          </div>
          <Button variant="outline" className="border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#d4ff00]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retrain Model
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {aiStats.map((stat, index) => {
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
        {/* Verification Queue */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold">Verification Queue</h3>
              <p className="text-sm text-[#b4b4b4]">Pending and recent verifications</p>
            </div>
            
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 text-sm focus:outline-none focus:border-[#d4ff00] cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="relative flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl hover:bg-[#1a1a1a] transition-colors cursor-pointer group overflow-hidden"
                onClick={() => setSelectedItem(item)}
              >
                {/* Scanner Effect */}
                {item.status === 'pending' && (
                  <div 
                    ref={index === 0 ? scannerRef : null}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4ff00] to-transparent scanner-line"
                  />
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{item.avatar}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#d4ff00] text-sm">{item.id}</span>
                      <div className="flex items-center gap-1 text-[#666]">
                        {getTypeIcon(item.type)}
                        <span className="text-xs capitalize">{item.type}</span>
                      </div>
                    </div>
                    <p className="font-medium">{item.user}</p>
                    <p className="text-sm text-[#666]">{item.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="text-right">
                    <p className="text-sm text-[#b4b4b4]">Confidence</p>
                    <p className={`font-bold ${getConfidenceColor(item.confidence)}`}>
                      {item.confidence}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#b4b4b4]">Submitted</p>
                    <p className="font-medium">{item.submitted}</p>
                  </div>
                  {getStatusBadge(item.status)}
                  <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <Eye className="w-4 h-4 text-[#666]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Performance */}
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#d4ff00]" />
              </div>
              <h3 className="font-semibold">AI Performance</h3>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={verificationData}>
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
                  <Line type="monotone" dataKey="verified" stroke="#22c55e" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="pending" stroke="#eab308" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-[#b4b4b4]">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-[#b4b4b4]">Rejected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs text-[#b4b4b4]">Pending</span>
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold">Security Alerts</h3>
            </div>
            
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-lg ${
                    alert.type === 'suspicious' ? 'bg-red-500/10 border border-red-500/20' :
                    alert.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                    'bg-blue-500/10 border border-blue-500/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
                      alert.type === 'suspicious' ? 'text-red-500' :
                      alert.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-[#666] mt-1">{alert.user} • {alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
                <Zap className="w-4 h-4 mr-2" />
                Run Batch Verification
              </Button>
              <Button variant="outline" className="w-full border-[#2a2a2a] hover:bg-[#1a1a1a]">
                <Shield className="w-4 h-4 mr-2" />
                Review Flagged Items
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-[#141414] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Verification Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#2a2a2a]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center">
                  <span className="text-black font-bold text-xl">{selectedItem.avatar}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedItem.user}</h3>
                  <p className="text-[#b4b4b4]">{selectedItem.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(selectedItem.status)}
                    <div className="flex items-center gap-1 text-[#666]">
                      {getTypeIcon(selectedItem.type)}
                      <span className="text-sm capitalize">{selectedItem.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0f0f0f] rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#b4b4b4]">AI Confidence Score</span>
                  <span className={`text-2xl font-bold ${getConfidenceColor(selectedItem.confidence)}`}>
                    {selectedItem.confidence}%
                  </span>
                </div>
                <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedItem.confidence >= 90 ? 'bg-green-500' :
                      selectedItem.confidence >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${selectedItem.confidence}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#b4b4b4]">Verification ID</p>
                  <p className="font-mono">{selectedItem.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b4b4b4]">Submitted</p>
                  <p className="font-medium">{selectedItem.submitted}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-500 hover:bg-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
