import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Users, AlertTriangle, Calendar, BarChart3, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const dailyDistributions = [
  { date: '01/15', distributions: 12, target: 15 },
  { date: '01/16', distributions: 18, target: 15 },
  { date: '01/17', distributions: 22, target: 15 },
  { date: '01/18', distributions: 16, target: 15 },
  { date: '01/19', distributions: 24, target: 15 },
  { date: '01/20', distributions: 19, target: 15 },
  { date: '01/21', distributions: 21, target: 15 },
];

const grainTypeDistribution = [
  { name: 'Rice', value: 45, color: '#3b82f6' },
  { name: 'Wheat', value: 30, color: '#8b5cf6' },
  { name: 'Pulses', value: 15, color: '#ef4444' },
  { name: 'Sugar', value: 6, color: '#f59e0b' },
  { name: 'Oil', value: 4, color: '#10b981' },
];

const weeklyPerformance = [
  { week: 'Week 1', efficiency: 85, target: 90 },
  { week: 'Week 2', efficiency: 92, target: 90 },
  { week: 'Week 3', efficiency: 88, target: 90 },
  { week: 'Week 4', efficiency: 95, target: 90 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#10b981'];

const PerformanceOverview = () => {
  const currentMonth = {
    totalDistributions: 132,
    targetDistributions: 150,
    uniqueBeneficiaries: 89,
    averagePerDay: 4.4,
    efficiency: 88,
    anomaliesDetected: 2
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-success';
    if (efficiency >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Performance Overview</h1>
          <p className="text-muted-foreground">Monitor distribution center performance and efficiency metrics</p>
        </div>
      </motion.div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Distributions',
            value: currentMonth.totalDistributions,
            target: currentMonth.targetDistributions,
            icon: Package,
            suffix: '',
            showProgress: true
          },
          {
            title: 'Unique Beneficiaries',
            value: currentMonth.uniqueBeneficiaries,
            target: 100,
            icon: Users,
            suffix: '',
            showProgress: true
          },
          {
            title: 'Avg. Distributions/Day',
            value: currentMonth.averagePerDay,
            target: 5,
            icon: Calendar,
            suffix: '',
            showProgress: false
          },
          {
            title: 'Efficiency Rate',
            value: currentMonth.efficiency,
            target: 90,
            icon: TrendingUp,
            suffix: '%',
            showProgress: true
          }
        ].map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">
                        {kpi.value}{kpi.suffix}
                      </p>
                      {kpi.showProgress && (
                        <Badge variant="outline" className="text-xs">
                          Target: {kpi.target}{kpi.suffix}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <kpi.icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                {kpi.showProgress && (
                  <div className="space-y-1">
                    <Progress 
                      value={(kpi.value / kpi.target) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {((kpi.value / kpi.target) * 100).toFixed(1)}% of target achieved
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Distribution Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Daily Distribution Activity
              </CardTitle>
              <CardDescription>
                Daily distribution count vs target over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyDistributions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="distributions" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grain Type Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle>Grain Type Distribution</CardTitle>
              <CardDescription>
                Breakdown of distributions by grain type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={grainTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {grainTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {grainTypeDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge variant="outline">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Weekly Efficiency Trends
            </CardTitle>
            <CardDescription>
              Performance efficiency over the past 4 weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }} 
                />
                <Bar dataKey="target" fill="#ef4444" name="Target" opacity={0.7} />
                <Bar dataKey="efficiency" fill="#3b82f6" name="Actual Efficiency" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performance Summary */}
          <Card className="glow-card">
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Current month performance highlights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Above Target Days</span>
                </div>
                <Badge className="bg-success text-success-foreground">5/7 days</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Peak Distribution Day</span>
                </div>
                <Badge variant="outline">24 distributions</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">Most Served Grain</span>
                </div>
                <Badge className="bg-warning text-warning-foreground">Rice (45%)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Anomalies & Alerts */}
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Alerts
              </CardTitle>
              <CardDescription>
                Detected anomalies and performance alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentMonth.anomaliesDetected > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Unusual Distribution Pattern</p>
                      <p className="text-xs text-muted-foreground">
                        High sugar distribution detected on Jan 18th (unusual for this center)
                      </p>
                      <Badge variant="destructive" className="mt-1 text-xs">High Priority</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Below Target Performance</p>
                      <p className="text-xs text-muted-foreground">
                        Jan 16th and Jan 18th had below-target distribution counts
                      </p>
                      <Badge className="bg-warning text-warning-foreground mt-1 text-xs">Medium Priority</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-2">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <p className="font-medium text-success">All Systems Normal</p>
                  <p className="text-sm text-muted-foreground">
                    No anomalies detected in the current period
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceOverview;