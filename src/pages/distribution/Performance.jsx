import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Package, Users, Calendar, AlertTriangle, CheckCircle, Award } from "lucide-react";

const weeklyDistributionData = [
  { day: "Mon", rations: 23, beneficiaries: 18 },
  { day: "Tue", rations: 31, beneficiaries: 25 },
  { day: "Wed", rations: 18, beneficiaries: 15 },
  { day: "Thu", rations: 27, beneficiaries: 22 },
  { day: "Fri", rations: 34, beneficiaries: 28 },
  { day: "Sat", rations: 19, beneficiaries: 16 },
  { day: "Sun", rations: 12, beneficiaries: 10 },
];

const monthlyTrends = [
  { week: "Week 1", distributions: 145 },
  { week: "Week 2", distributions: 167 },
  { week: "Week 3", distributions: 132 },
  { week: "Week 4", distributions: 189 },
];

const grainDistribution = [
  { name: "Rice", value: 45, color: "#10b981" },
  { name: "Wheat", value: 30, color: "#3b82f6" },
  { name: "Dal", value: 15, color: "#8b5cf6" },
  { name: "Oil", value: 7, color: "#f59e0b" },
  { name: "Sugar", value: 3, color: "#ef4444" },
];

const topBeneficiaries = [
  { name: "John Doe", visits: 8, lastVisit: "2024-01-15", totalReceived: "45kg", status: "regular" },
  { name: "Jane Smith", visits: 6, lastVisit: "2024-01-14", totalReceived: "38kg", status: "regular" },
  { name: "Bob Johnson", visits: 5, lastVisit: "2024-01-13", totalReceived: "32kg", status: "regular" },
  { name: "Alice Brown", visits: 4, lastVisit: "2024-01-12", totalReceived: "28kg", status: "regular" },
  { name: "Charlie Wilson", visits: 12, lastVisit: "2024-01-15", totalReceived: "85kg", status: "frequent" },
];

export default function DistributionPerformance() {
  const thisWeekTotal = weeklyDistributionData.reduce((sum, day) => sum + day.rations, 0);
  const thisWeekBeneficiaries = weeklyDistributionData.reduce((sum, day) => sum + day.beneficiaries, 0);
  const avgDailyDistributions = Math.round(thisWeekTotal / 7);
  const flaggedBeneficiaries = topBeneficiaries.filter(b => b.status === 'frequent').length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Center Performance Overview</h1>
        <p className="text-muted-foreground">Comprehensive analytics and performance metrics for your distribution center</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week's Rations</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{thisWeekTotal}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+15%</span> vs last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beneficiaries Served</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{thisWeekBeneficiaries}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8%</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{avgDailyDistributions}</div>
            <p className="text-xs text-muted-foreground">
              Distributions per day
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{flaggedBeneficiaries}</div>
            <p className="text-xs text-muted-foreground">
              Frequent visitors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Weekly Distribution Pattern</CardTitle>
            <CardDescription>
              Daily rations issued and unique beneficiaries served
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rations" fill="hsl(var(--primary))" />
                <Bar dataKey="beneficiaries" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>
              Distribution volume over the past month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="distributions" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grain Distribution Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Grain Type Distribution</CardTitle>
            <CardDescription>
              Percentage breakdown of grains distributed this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={grainDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {grainDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Key operational indicators and benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Distribution Efficiency</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-success">94%</span>
                  <p className="text-xs text-muted-foreground">vs 90% target</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Service Quality Score</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">4.7/5</span>
                  <p className="text-xs text-muted-foreground">beneficiary rating</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Inventory Turnover</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-accent">12.3x</span>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">Compliance Rate</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-secondary">98%</span>
                  <p className="text-xs text-muted-foreground">regulatory compliance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Beneficiaries */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Most Active Beneficiaries</CardTitle>
          <CardDescription>
            Frequent visitors and potential fraud detection indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topBeneficiaries.map((beneficiary, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{beneficiary.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {beneficiary.visits} visits • Last: {beneficiary.lastVisit}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">{beneficiary.totalReceived}</p>
                  <Badge 
                    variant={beneficiary.status === 'frequent' ? 'warning' : 'success'}
                    className="text-xs"
                  >
                    {beneficiary.status === 'frequent' ? (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Review Required
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Normal
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fraud Detection Alert */}
      {flaggedBeneficiaries > 0 && (
        <Card className="shadow-card border-warning/50 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Fraud Detection Alert
            </CardTitle>
            <CardDescription>
              Unusual activity patterns detected that may require investigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm">
                <strong>{flaggedBeneficiaries} beneficiaries</strong> have been flagged for frequent visits exceeding normal patterns.
              </p>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded">
                <p className="text-sm font-medium mb-1">Recommended Actions:</p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                  <li>• Verify beneficiary eligibility and documentation</li>
                  <li>• Cross-check with other distribution centers</li>
                  <li>• Contact administrator for additional verification</li>
                  <li>• Monitor for duplicate claim attempts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}