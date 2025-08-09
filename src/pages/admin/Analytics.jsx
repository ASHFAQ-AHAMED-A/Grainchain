import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Building2, Package, Activity, CheckCircle } from "lucide-react";

const distributionData = [
  { day: "Mon", distributions: 45, centers: 8 },
  { day: "Tue", distributions: 52, centers: 9 },
  { day: "Wed", distributions: 38, centers: 7 },
  { day: "Thu", distributions: 61, centers: 10 },
  { day: "Fri", distributions: 48, centers: 8 },
  { day: "Sat", distributions: 35, centers: 6 },
  { day: "Sun", distributions: 29, centers: 5 },
];

const roleData = [
  { name: "Citizens", value: 1247, color: "#10b981" },
  { name: "Distribution Centers", value: 23, color: "#3b82f6" },
  { name: "Administrators", value: 5, color: "#8b5cf6" },
];

const regionData = [
  { region: "North", users: 312, distributions: 89 },
  { region: "South", users: 298, distributions: 76 },
  { region: "East", users: 285, distributions: 82 },
  { region: "West", users: 267, distributions: 71 },
  { region: "Central", users: 85, distributions: 34 },
];

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function AdminAnalytics() {
  const totalUsers = roleData.reduce((sum, item) => sum + item.value, 0);
  const activeCenters = roleData.find(item => item.name === "Distribution Centers")?.value || 0;
  const weeklyDistributions = distributionData.reduce((sum, day) => sum + day.distributions, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground">Comprehensive system metrics and performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Centers</CardTitle>
            <Building2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{activeCenters}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Distributions</CardTitle>
            <Package className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{weeklyDistributions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8%</span> vs last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Weekly Distribution Trends</CardTitle>
            <CardDescription>
              Daily distribution volumes and active centers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="distributions" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>
              Breakdown of users by role type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Analytics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Regional Performance</CardTitle>
          <CardDescription>
            User registration and distribution statistics by region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionData.map((region, index) => (
              <div key={region.region} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <div>
                    <p className="font-medium">{region.region} Region</p>
                    <p className="text-sm text-muted-foreground">{region.users} registered users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{region.distributions}</p>
                  <p className="text-sm text-muted-foreground">distributions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>System Health Status</CardTitle>
            <CardDescription>
              Real-time system component status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { component: "Blockchain Network", status: "operational", uptime: "99.9%" },
              { component: "Smart Contracts", status: "operational", uptime: "100%" },
              { component: "IPFS Gateway", status: "operational", uptime: "99.7%" },
              { component: "Database", status: "operational", uptime: "99.9%" },
              { component: "API Services", status: "operational", uptime: "99.8%" },
            ].map((item) => (
              <div key={item.component} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-medium">{item.component}</span>
                </div>
                <div className="text-right">
                  <Badge variant="success">Operational</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{item.uptime} uptime</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Latest Transactions</CardTitle>
            <CardDescription>
              Recent blockchain transaction activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: "Food Distribution", amount: "25kg Rice", time: "2 min ago", status: "confirmed" },
              { type: "User Registration", amount: "New Citizen", time: "5 min ago", status: "confirmed" },
              { type: "QR Generation", amount: "Batch ID: 1234", time: "8 min ago", status: "confirmed" },
              { type: "Role Assignment", amount: "Distribution Center", time: "12 min ago", status: "pending" },
              { type: "Inventory Update", amount: "50kg Wheat", time: "15 min ago", status: "confirmed" },
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">{tx.amount}</p>
                </div>
                <div className="text-right">
                  <Badge variant={tx.status === 'confirmed' ? 'success' : 'warning'}>
                    {tx.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{tx.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}