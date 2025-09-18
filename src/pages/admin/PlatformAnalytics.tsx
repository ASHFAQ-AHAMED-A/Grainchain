import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Activity, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const dailyTransactions = [
  { day: 'Mon', transactions: 65 },
  { day: 'Tue', transactions: 78 },
  { day: 'Wed', transactions: 90 },
  { day: 'Thu', transactions: 81 },
  { day: 'Fri', transactions: 95 },
  { day: 'Sat', transactions: 102 },
  { day: 'Sun', transactions: 88 },
];

const roleDistribution = [
  { name: 'Citizens', value: 1247, color: '#3b82f6' },
  { name: 'Distribution Centers', value: 23, color: '#8b5cf6' },
  { name: 'Administrators', value: 5, color: '#ef4444' },
];

const grainDistribution = [
  { name: 'Rice', distributed: 2450, target: 3000 },
  { name: 'Wheat', distributed: 1890, target: 2500 },
  { name: 'Pulses', distributed: 980, target: 1200 },
  { name: 'Sugar', distributed: 650, target: 800 },
  { name: 'Oil', distributed: 340, target: 500 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ef4444'];

const PlatformAnalytics = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground">Monitor system performance and distribution metrics</p>
        </div>
      </motion.div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Users',
            value: '1,275',
            change: '+12.5%',
            icon: Users,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
          },
          {
            title: 'System Uptime',
            value: '99.8%',
            change: '+0.2%',
            icon: Activity,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10'
          },
          {
            title: 'Blockchain Status',
            value: 'Online',
            change: 'Healthy',
            icon: Shield,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10'
          },
          {
            title: 'Weekly Transactions',
            value: '599',
            change: '+23.1%',
            icon: TrendingUp,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Transactions Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Daily Transactions
              </CardTitle>
              <CardDescription>
                Transaction volume over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyTransactions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
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
                    dataKey="transactions" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Role Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glow-card">
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
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
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
                {roleDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge variant="outline">{item.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Grain Distribution Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glow-card">
          <CardHeader>
            <CardTitle>Monthly Distribution Progress</CardTitle>
            <CardDescription>
              Current month's distribution against targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {grainDistribution.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.distributed} / {item.target} kg
                    </div>
                  </div>
                  <Progress 
                    value={(item.distributed / item.target) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Distributed: {item.distributed} kg</span>
                    <span>{((item.distributed / item.target) * 100).toFixed(1)}% of target</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Health Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              System Health Status
            </CardTitle>
            <CardDescription>
              Real-time system monitoring and health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Database', status: 'Healthy', uptime: '99.9%', color: 'bg-green-500' },
                { label: 'Blockchain Network', status: 'Online', uptime: '99.8%', color: 'bg-blue-500' },
                { label: 'API Services', status: 'Operational', uptime: '99.7%', color: 'bg-purple-500' },
              ].map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center space-y-3"
                >
                  <div className={`w-4 h-4 ${service.color} rounded-full mx-auto animate-pulse`} />
                  <div>
                    <p className="font-medium">{service.label}</p>
                    <p className="text-sm text-muted-foreground">{service.status}</p>
                    <Badge variant="outline" className="mt-1">
                      {service.uptime} uptime
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlatformAnalytics;