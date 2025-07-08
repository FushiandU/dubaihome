import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Settings, 
  BarChart3, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Send,
  Globe,
  Database,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Tag,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  tags: string[];
  source: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
  value?: number;
}

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent' | 'active';
  recipients: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  scheduledAt?: string;
}

interface SMTPSettings {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
}

interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  canonicalUrl: string;
  robots: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data
  useEffect(() => {
    setLeads([
      {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+44 7123 456789',
        status: 'new',
        tags: ['high-value', 'uk-investor'],
        source: 'Landing Page',
        createdAt: '2024-01-15T10:30:00Z',
        value: 250000
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+44 7987 654321',
        status: 'contacted',
        tags: ['first-time-buyer'],
        source: 'WhatsApp',
        createdAt: '2024-01-14T15:45:00Z',
        lastContact: '2024-01-15T09:00:00Z',
        value: 180000
      }
    ]);

    setCampaigns([
      {
        id: '1',
        name: 'Welcome Series',
        subject: 'Your Dubai Property Investment Guide',
        status: 'active',
        recipients: 150,
        openRate: 68.5,
        clickRate: 12.3,
        createdAt: '2024-01-10T08:00:00Z'
      }
    ]);
  }, []);

  const stats = [
    { title: 'Total Leads', value: '247', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Conversion Rate', value: '8.2%', change: '+2.1%', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Email Opens', value: '68.5%', change: '+5.3%', icon: Mail, color: 'text-purple-600' },
    { title: 'Revenue', value: '£2.4M', change: '+18%', icon: BarChart3, color: 'text-orange-600' }
  ];

  const handleBulkAction = (action: string) => {
    if (selectedLeads.length === 0) {
      toast.error('Please select leads first');
      return;
    }
    
    switch (action) {
      case 'email':
        toast.success(`Email campaign sent to ${selectedLeads.length} leads`);
        break;
      case 'tag':
        toast.success(`Tags added to ${selectedLeads.length} leads`);
        break;
      case 'export':
        toast.success(`Exported ${selectedLeads.length} leads`);
        break;
      case 'delete':
        setLeads(leads.filter(lead => !selectedLeads.includes(lead.id)));
        setSelectedLeads([]);
        toast.success(`Deleted ${selectedLeads.length} leads`);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'leads', label: 'Lead Management', icon: Users },
              { id: 'campaigns', label: 'Email Campaigns', icon: Mail },
              { id: 'tags', label: 'Tags & Segments', icon: Tag },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'website', label: 'Website Settings', icon: Globe },
              { id: 'smtp', label: 'SMTP Settings', icon: Send },
              { id: 'seo', label: 'SEO Settings', icon: Search },
              { id: 'settings', label: 'General Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-green-600">{stat.change}</p>
                          </div>
                          <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leads.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-sm text-gray-600">{lead.email}</p>
                          </div>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaigns.map((campaign) => (
                        <div key={campaign.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{campaign.name}</p>
                            <Badge>{campaign.status}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Open Rate</p>
                              <p className="font-medium">{campaign.openRate}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Click Rate</p>
                              <p className="font-medium">{campaign.clickRate}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Lead Management */}
            <TabsContent value="leads" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Lead Management</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {selectedLeads.length > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-blue-800">
                        {selectedLeads.length} lead(s) selected
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" onClick={() => handleBulkAction('email')}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleBulkAction('tag')}>
                          <Tag className="w-4 h-4 mr-2" />
                          Add Tags
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLeads(filteredLeads.map(lead => lead.id));
                              } else {
                                setSelectedLeads([]);
                              }
                            }}
                            checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedLeads.includes(lead.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLeads([...selectedLeads, lead.id]);
                                } else {
                                  setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {lead.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {lead.value ? `£${lead.value.toLocaleString()}` : '-'}
                          </TableCell>
                          <TableCell>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Campaigns */}
            <TabsContent value="campaigns" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Email Campaigns</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Email Campaign</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="campaign-name">Campaign Name</Label>
                        <Input id="campaign-name" placeholder="Enter campaign name" />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject Line</Label>
                        <Input id="subject" placeholder="Enter email subject" />
                      </div>
                      <div>
                        <Label htmlFor="recipients">Recipients</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Leads</SelectItem>
                            <SelectItem value="new">New Leads</SelectItem>
                            <SelectItem value="qualified">Qualified Leads</SelectItem>
                            <SelectItem value="high-value">High Value Leads</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="content">Email Content</Label>
                        <Textarea 
                          id="content" 
                          placeholder="Enter email content..." 
                          rows={8}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="schedule" />
                        <Label htmlFor="schedule">Schedule for later</Label>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button>Send Campaign</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <Badge>{campaign.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{campaign.subject}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Recipients</span>
                          <span className="font-medium">{campaign.recipients}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Open Rate</span>
                          <span className="font-medium">{campaign.openRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Click Rate</span>
                          <span className="font-medium">{campaign.clickRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Created</span>
                          <span className="font-medium">
                            {new Date(campaign.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* SMTP Settings */}
            <TabsContent value="smtp" className="space-y-6">
              <h2 className="text-2xl font-bold">SMTP Settings</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Email Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input id="smtp-host" defaultValue="smtp.hostinger.com" />
                    </div>
                    <div>
                      <Label htmlFor="smtp-port">Port</Label>
                      <Input id="smtp-port" type="number" defaultValue="465" />
                    </div>
                    <div>
                      <Label htmlFor="smtp-username">Username</Label>
                      <Input id="smtp-username" defaultValue="noreply@rizarah.com" />
                    </div>
                    <div>
                      <Label htmlFor="smtp-password">Password</Label>
                      <Input id="smtp-password" type="password" defaultValue="test@123" />
                    </div>
                    <div>
                      <Label htmlFor="from-name">From Name</Label>
                      <Input id="from-name" defaultValue="Dubai Property Pro" />
                    </div>
                    <div>
                      <Label htmlFor="from-email">From Email</Label>
                      <Input id="from-email" defaultValue="noreply@rizarah.com" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ssl" defaultChecked />
                    <Label htmlFor="ssl">Use SSL/TLS</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button>Save Settings</Button>
                    <Button variant="outline">Test Connection</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Settings */}
            <TabsContent value="seo" className="space-y-6">
              <h2 className="text-2xl font-bold">SEO Settings</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Search Engine Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="seo-title">Page Title</Label>
                    <Input 
                      id="seo-title" 
                      defaultValue="UK Buyer's Guide to Dubai Property 2025 - Free Download | Dubai Property Pro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seo-description">Meta Description</Label>
                    <Textarea 
                      id="seo-description" 
                      defaultValue="Download the complete UK Buyer's Guide to Dubai Property 2025. Learn how UK investors earn 8% tax-free returns. Trusted by 500+ investors."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seo-keywords">Keywords</Label>
                    <Input 
                      id="seo-keywords" 
                      defaultValue="Dubai property guide 2025, UK investors, tax-free returns, Dubai real estate, property investment guide"
                    />
                  </div>
                  <div>
                    <Label htmlFor="og-title">Open Graph Title</Label>
                    <Input 
                      id="og-title" 
                      defaultValue="UK Buyer's Guide to Dubai Property 2025 - Free Download"
                    />
                  </div>
                  <div>
                    <Label htmlFor="og-description">Open Graph Description</Label>
                    <Textarea 
                      id="og-description" 
                      defaultValue="Modern, comprehensive guide for UK investors. 8% tax-free returns, expert insights, trusted by 500+ investors."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="canonical-url">Canonical URL</Label>
                    <Input id="canonical-url" placeholder="https://dubaipropertypro.com" />
                  </div>
                  <Button>Save SEO Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Website Settings */}
            <TabsContent value="website" className="space-y-6">
              <h2 className="text-2xl font-bold">Website Settings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="Dubai Property Pro" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+971 55 799 4258" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="shibikabeer@gmail.com" />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input id="whatsapp" defaultValue="+971 55 799 4258" />
                    </div>
                    <Button>Update Contact Info</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Landing Page Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hero-title">Hero Title</Label>
                      <Input id="hero-title" defaultValue="UK Buyer's Guide to Dubai Property 2025" />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                      <Textarea 
                        id="hero-subtitle" 
                        defaultValue="Discover how UK investors are earning 8% tax-free returns with Dubai property investment"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cta-text">Call-to-Action Text</Label>
                      <Input id="cta-text" defaultValue="Download Guide Now" />
                    </div>
                    <Button>Update Content</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;