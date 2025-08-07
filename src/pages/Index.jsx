import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { 
  Wheat, Truck, Users, AlertTriangle, TrendingUp, Package, MapPin,
  Search, Plus, Eye, Edit, Trash2, Download, Upload, QrCode,
  Shield, Activity, Wallet, BarChart3, Settings, Bell
} from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState('users');
  
  // Listen for hash changes
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'users';
    setActiveSection(hash);
    
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '') || 'users';
      setActiveSection(newHash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const stats = [
    { title: "Total Users", value: "1,247", icon: Users, change: "+12%" },
    { title: "Active Wallets", value: "847", icon: Wallet, change: "+8%" },
    { title: "QR Codes Generated", value: "2,124", icon: QrCode, change: "+15%" },
    { title: "Platform Activity", value: "96.2%", icon: Activity, change: "+2.1%" },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", wallet: "Connected" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Active", wallet: "Connected" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", wallet: "Disconnected" },
  ];

  const activities = [
    { id: 1, user: "John Doe", action: "Created new QR code", timestamp: "2 minutes ago", type: "create" },
    { id: 2, user: "Jane Smith", action: "Updated user permissions", timestamp: "5 minutes ago", type: "update" },
    { id: 3, user: "System", action: "Blockchain sync completed", timestamp: "10 minutes ago", type: "system" },
    { id: 4, user: "Bob Johnson", action: "Wallet disconnected", timestamp: "15 minutes ago", type: "warning" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search users..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                            {user.status}
                          </Badge>
                          <Badge variant={user.wallet === "Connected" ? "default" : "outline"}>
                            {user.wallet}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'wallet':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Wallet & Blockchain Connection</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Status</CardTitle>
                  <CardDescription>Monitor blockchain network health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Network Status</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Block</span>
                    <span className="font-mono text-sm">#18,492,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Gas Price</span>
                    <span className="font-mono text-sm">25 gwei</span>
                  </div>
                  <Button className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Network
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Connections</CardTitle>
                  <CardDescription>Manage user wallet integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>MetaMask</span>
                      <Badge variant="default">847 users</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>WalletConnect</span>
                      <Badge variant="secondary">132 users</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>Coinbase Wallet</span>
                      <Badge variant="secondary">89 users</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'qr':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">QR Code Identity Generation</h2>
              <Button>
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Code
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>QR Code Generator</CardTitle>
                  <CardDescription>Create unique identity QR codes for users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-select">Select User</Label>
                    <Input id="user-select" placeholder="Search for user..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qr-type">QR Code Type</Label>
                    <select id="qr-type" className="w-full p-2 border rounded-md">
                      <option>Identity Verification</option>
                      <option>Access Control</option>
                      <option>Transaction Authorization</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" type="date" />
                  </div>
                  <Button className="w-full">Generate QR Code</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent QR Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-2 border rounded">
                        <QrCode className="h-8 w-8 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">User #{i}24</p>
                          <p className="text-xs text-muted-foreground">2h ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-primary">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Platform adoption over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    Chart placeholder - User growth trend
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                  <CardDescription>Most popular platform features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>QR Generation</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-24" />
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Wallet Connection</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-24" />
                        <span className="text-sm">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>User Management</span>
                      <div className="flex items-center gap-2">
                        <Progress value={58} className="w-24" />
                        <span className="text-sm">58%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'activity':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Activity Feed (Audit Log)</h2>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Real-time platform activity monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'create' ? 'bg-green-500' :
                        activity.type === 'update' ? 'bg-blue-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">by {activity.user}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'access':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Role-Based Access Control</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>Manage user roles and their permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h3 className="font-medium">Super Admin</h3>
                        <p className="text-sm text-muted-foreground">Full system access</p>
                      </div>
                      <Badge variant="default">3 users</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h3 className="font-medium">Admin</h3>
                        <p className="text-sm text-muted-foreground">Administrative privileges</p>
                      </div>
                      <Badge variant="secondary">12 users</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h3 className="font-medium">Manager</h3>
                        <p className="text-sm text-muted-foreground">Limited admin access</p>
                      </div>
                      <Badge variant="secondary">47 users</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h3 className="font-medium">User</h3>
                        <p className="text-sm text-muted-foreground">Basic user access</p>
                      </div>
                      <Badge variant="outline">1,185 users</Badge>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Role
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Permission Matrix</CardTitle>
                  <CardDescription>Configure feature access by role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['User Management', 'Wallet Access', 'QR Generation', 'Analytics', 'System Settings'].map((permission) => (
                      <div key={permission} className="flex items-center justify-between">
                        <span className="text-sm">{permission}</span>
                        <div className="flex gap-2">
                          <Shield className="h-4 w-4 text-green-500" title="Admin" />
                          <Shield className="h-4 w-4 text-blue-500" title="Manager" />
                          <Shield className="h-4 w-4 text-gray-300" title="User" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-card-foreground">GrainChain Admin</h1>
                <p className="text-sm text-muted-foreground">Administrative Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;