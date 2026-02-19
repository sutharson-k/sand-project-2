import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  User,
  Bell,
  Shield,
  Link,
  Palette,
  Globe,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  Camera,
  Moon,
  Sun
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

const integrations = [
  { id: 1, name: 'Stripe', description: 'Payment processing', connected: true, icon: '💳' },
  { id: 2, name: 'SendGrid', description: 'Email service', connected: true, icon: '📧' },
  { id: 3, name: 'AWS S3', description: 'Cloud storage', connected: false, icon: '☁️' },
  { id: 4, name: 'Slack', description: 'Team communication', connected: true, icon: '💬' },
]

export default function SettingsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(
      sectionRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }
    )
  }, [])

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4ff00] to-[#a3cc00] flex items-center justify-center">
            <span className="text-black font-bold text-3xl">JS</span>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#141414] border border-[#2a2a2a] rounded-full flex items-center justify-center hover:bg-[#1a1a1a] transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold">John Smith</h3>
          <p className="text-[#b4b4b4]">Administrator</p>
          <p className="text-sm text-[#666]">johnsmith@email.com</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#b4b4b4] mb-2">First Name</label>
          <input
            type="text"
            defaultValue="John"
            className="w-full h-11 bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-[#b4b4b4] mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Smith"
            className="w-full h-11 bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-[#b4b4b4] mb-2">Email</label>
          <input
            type="email"
            defaultValue="johnsmith@email.com"
            className="w-full h-11 bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-[#b4b4b4] mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+1 234-567-8900"
            className="w-full h-11 bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-[#b4b4b4] mb-2">Bio</label>
          <textarea
            rows={4}
            defaultValue="Platform administrator with 5+ years of experience."
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-[#b4b4b4]">Receive updates via email</p>
            </div>
          </div>
          <Switch 
            checked={emailNotifications} 
            onCheckedChange={setEmailNotifications}
            className="data-[state=checked]:bg-[#d4ff00]"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-[#b4b4b4]">Receive push notifications</p>
            </div>
          </div>
          <Switch 
            checked={pushNotifications} 
            onCheckedChange={setPushNotifications}
            className="data-[state=checked]:bg-[#d4ff00]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <div>
              <h4 className="font-medium">Marketing Emails</h4>
              <p className="text-sm text-[#b4b4b4]">Receive promotional content</p>
            </div>
          </div>
          <Switch 
            checked={marketingEmails} 
            onCheckedChange={setMarketingEmails}
            className="data-[state=checked]:bg-[#d4ff00]"
          />
        </div>
      </div>

      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <h4 className="font-medium mb-4">Notification Preferences</h4>
        <div className="space-y-3">
          {[
            { label: 'New orders', email: true, push: true },
            { label: 'User registrations', email: true, push: false },
            { label: 'Payment alerts', email: true, push: true },
            { label: 'Security alerts', email: true, push: true },
            { label: 'System updates', email: false, push: true },
          ].map((pref, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm">{pref.label}</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-[#b4b4b4]">
                  <input type="checkbox" defaultChecked={pref.email} className="rounded border-[#2a2a2a]" />
                  Email
                </label>
                <label className="flex items-center gap-2 text-sm text-[#b4b4b4]">
                  <input type="checkbox" defaultChecked={pref.push} className="rounded border-[#2a2a2a]" />
                  Push
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <h4 className="font-medium mb-4">Change Password</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#b4b4b4] mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 pr-12 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-[#666]" /> : <Eye className="w-4 h-4 text-[#666]" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#b4b4b4] mb-2">New Password</label>
            <input
              type="password"
              className="w-full h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#b4b4b4] mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full h-11 bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 text-sm focus:outline-none focus:border-[#d4ff00] transition-colors"
            />
          </div>
          <Button className="bg-[#d4ff00] text-black hover:bg-[#c2eb00]">
            <Lock className="w-4 h-4 mr-2" />
            Update Password
          </Button>
        </div>
      </div>

      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-[#b4b4b4]">Add an extra layer of security</p>
            </div>
          </div>
          <Switch 
            checked={twoFactor} 
            onCheckedChange={setTwoFactor}
            className="data-[state=checked]:bg-[#d4ff00]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ef4444]/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#ef4444]" />
            </div>
            <div>
              <h4 className="font-medium">Login Alerts</h4>
              <p className="text-sm text-[#b4b4b4]">Get notified of new logins</p>
            </div>
          </div>
          <Switch 
            checked={loginAlerts} 
            onCheckedChange={setLoginAlerts}
            className="data-[state=checked]:bg-[#d4ff00]"
          />
        </div>
      </div>

      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <h4 className="font-medium mb-4">Active Sessions</h4>
        <div className="space-y-3">
          {[
            { device: 'Chrome on MacOS', location: 'New York, USA', current: true },
            { device: 'Safari on iPhone', location: 'New York, USA', current: false },
            { device: 'Firefox on Windows', location: 'Los Angeles, USA', current: false },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{session.device}</span>
                  {session.current && <Badge className="bg-[#d4ff00] text-black text-xs">Current</Badge>}
                </div>
                <p className="text-sm text-[#666]">{session.location}</p>
              </div>
              {!session.current && (
                <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-[#0f0f0f] rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-2xl">
                  {integration.icon}
                </div>
                <div>
                  <h4 className="font-medium">{integration.name}</h4>
                  <p className="text-sm text-[#b4b4b4]">{integration.description}</p>
                </div>
              </div>
              <Badge className={integration.connected ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}>
                {integration.connected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                className={integration.connected ? 'border-red-500 text-red-500 hover:bg-red-500/10' : 'border-[#d4ff00] text-[#d4ff00] hover:bg-[#d4ff00]/10'}
              >
                {integration.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4ff00]/20 flex items-center justify-center">
              {darkMode ? <Moon className="w-5 h-5 text-[#d4ff00]" /> : <Sun className="w-5 h-5 text-[#d4ff00]" />}
            </div>
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-[#b4b4b4]">Toggle between light and dark themes</p>
            </div>
          </div>
          <Switch 
            checked={darkMode} 
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-[#d4ff00]"
          />
        </div>
      </div>

      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <h4 className="font-medium mb-4">Accent Color</h4>
        <div className="flex gap-3">
          {['#d4ff00', '#3b82f6', '#8b5cf6', '#ef4444', '#f97316'].map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded-xl transition-transform hover:scale-110 ${color === '#d4ff00' ? 'ring-2 ring-white' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="bg-[#0f0f0f] rounded-xl p-6">
        <h4 className="font-medium mb-4">Interface Density</h4>
        <div className="flex gap-3">
          {['Compact', 'Comfortable', 'Spacious'].map((density) => (
            <button
              key={density}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                density === 'Comfortable' 
                  ? 'bg-[#d4ff00] text-black' 
                  : 'bg-[#141414] border border-[#2a2a2a] hover:border-[#d4ff00]'
              }`}
            >
              {density}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-[#b4b4b4] mt-1">Manage your account and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#d4ff00] text-black'
                    : 'bg-[#141414] border border-[#1a1a1a] text-[#b4b4b4] hover:bg-[#1a1a1a] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 capitalize">{activeTab} Settings</h2>
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'integrations' && renderIntegrations()}
          {activeTab === 'appearance' && renderAppearanceSettings()}
        </div>
      </div>
    </div>
  )
}
