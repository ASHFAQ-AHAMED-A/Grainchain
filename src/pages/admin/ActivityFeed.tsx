import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, Search, User, UserPlus, Trash2, Edit, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: 'admin' | 'distribution-center' | 'citizen';
  action: string;
  actionType: 'create' | 'update' | 'delete' | 'blockchain' | 'login' | 'logout';
  details: string;
  ipAddress: string;
  txHash?: string;
}

const mockActivities: ActivityLog[] = [
  {
    id: '1',
    timestamp: '2024-01-20T10:30:00Z',
    user: 'John Admin',
    userRole: 'admin',
    action: 'User Created',
    actionType: 'create',
    details: 'Created new beneficiary: Rajesh Kumar (BEN001234)',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: '2024-01-20T10:25:00Z',
    user: 'Distribution Center A',
    userRole: 'distribution-center',
    action: 'Distribution Transaction',
    actionType: 'blockchain',
    details: 'Distributed 10kg Rice to BEN001233',
    ipAddress: '192.168.1.105',
    txHash: '0x1234...5678'
  },
  {
    id: '3',
    timestamp: '2024-01-20T10:20:00Z',
    user: 'Sarah Manager',
    userRole: 'admin',
    action: 'Permission Updated',
    actionType: 'update',
    details: 'Updated access permissions for Distribution Center B',
    ipAddress: '192.168.1.102'
  },
  {
    id: '4',
    timestamp: '2024-01-20T10:15:00Z',
    user: 'Distribution Center B',
    userRole: 'distribution-center',
    action: 'User Login',
    actionType: 'login',
    details: 'Successful login via MetaMask wallet',
    ipAddress: '192.168.1.110'
  },
  {
    id: '5',
    timestamp: '2024-01-20T10:10:00Z',
    user: 'Mike Johnson',
    userRole: 'citizen',
    action: 'Profile Updated',
    actionType: 'update',
    details: 'Updated profile information and address',
    ipAddress: '192.168.1.150'
  },
  {
    id: '6',
    timestamp: '2024-01-20T10:05:00Z',
    user: 'John Admin',
    userRole: 'admin',
    action: 'User Deleted',
    actionType: 'delete',
    details: 'Deleted inactive user account: OLD001',
    ipAddress: '192.168.1.100'
  }
];

const ActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityLog[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || activity.actionType === filterAction;
    const matchesRole = filterRole === 'all' || activity.userRole === filterRole;
    return matchesSearch && matchesAction && matchesRole;
  });

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'create':
        return <UserPlus className="w-4 h-4" />;
      case 'update':
        return <Edit className="w-4 h-4" />;
      case 'delete':
        return <Trash2 className="w-4 h-4" />;
      case 'blockchain':
        return <Zap className="w-4 h-4" />;
      case 'login':
      case 'logout':
        return <User className="w-4 h-4" />;
      default:
        return <Database className="w-4 h-4" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'create':
        return 'text-success border-success/20 bg-success/10';
      case 'update':
        return 'text-primary border-primary/20 bg-primary/10';
      case 'delete':
        return 'text-destructive border-destructive/20 bg-destructive/10';
      case 'blockchain':
        return 'text-blockchain-purple border-blockchain-purple/20 bg-blockchain-purple/10';
      case 'login':
        return 'text-success border-success/20 bg-success/10';
      case 'logout':
        return 'text-warning border-warning/20 bg-warning/10';
      default:
        return 'text-muted-foreground border-muted/20 bg-muted/10';
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'distribution-center':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Activity Feed</h1>
          <p className="text-muted-foreground">Monitor all system activities and user actions</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="distribution-center">Distribution Center</SelectItem>
                  <SelectItem value="citizen">Citizen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Activity Log
            </CardTitle>
            <CardDescription>
              Recent activities and user actions ({filteredActivities.length} entries)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  {/* Action Icon */}
                  <div className={`p-2 rounded-lg border ${getActionColor(activity.actionType)}`}>
                    {getActionIcon(activity.actionType)}
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{activity.action}</h4>
                        <Badge variant={getRoleBadgeVariant(activity.userRole)} className="text-xs">
                          {activity.userRole.replace('-', ' ')}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.details}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-muted">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {activity.user} • {activity.ipAddress}
                        </span>
                      </div>

                      {activity.txHash && (
                        <Badge variant="outline" className="text-xs font-mono">
                          {activity.txHash}
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredActivities.length === 0 && (
                <div className="text-center py-8 space-y-4">
                  <Activity className="w-16 h-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">No Activities Found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Activities', value: activities.length, icon: Activity, color: 'text-primary' },
            { label: 'User Actions', value: activities.filter(a => a.actionType !== 'blockchain').length, icon: User, color: 'text-success' },
            { label: 'Blockchain Txns', value: activities.filter(a => a.actionType === 'blockchain').length, icon: Zap, color: 'text-blockchain-purple' },
            { label: 'Admin Actions', value: activities.filter(a => a.userRole === 'admin').length, icon: UserPlus, color: 'text-warning' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="glow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityFeed;