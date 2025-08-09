import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Filter, Calendar, User, Plus, Edit, Trash2, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const activities = [
  {
    id: 1,
    action: "User Created",
    user: "John Doe",
    userAddress: "0x1F4B7E6A9C3D8E2F",
    details: "New citizen registered in North region",
    timestamp: "2024-01-15 14:30:25",
    txHash: "0x742d35Cc6862C4C4567890abcdef",
    status: "confirmed",
    type: "create"
  },
  {
    id: 2,
    action: "QR Code Generated",
    user: "Distribution Center A",
    userAddress: "0x8A5A4B3C92D8E1F7",
    details: "Identity QR code generated for citizen verification",
    timestamp: "2024-01-15 13:45:12",
    txHash: "0x8765432109abcdef1234567890",
    status: "confirmed",
    type: "generate"
  },
  {
    id: 3,
    action: "Role Assignment",
    user: "Admin User",
    userAddress: "0x742d35Cc6862C4C4",
    details: "Distribution Center role assigned to new user",
    timestamp: "2024-01-15 12:20:08",
    txHash: "0x1234567890abcdef98765432",
    status: "pending",
    type: "edit"
  },
  {
    id: 4,
    action: "User Updated",
    user: "Jane Smith",
    userAddress: "0x2G5C8F7B0E4F9A3G",
    details: "User profile information updated",
    timestamp: "2024-01-15 11:15:45",
    txHash: "0x987654321fedcba012345678",
    status: "confirmed",
    type: "edit"
  },
  {
    id: 5,
    action: "User Deleted",
    user: "Former User",
    userAddress: "0x9876543210abcdef",
    details: "Inactive user account removed from system",
    timestamp: "2024-01-15 10:30:22",
    txHash: "0xfedcba9876543210abcdef12",
    status: "confirmed",
    type: "delete"
  },
  {
    id: 6,
    action: "Distribution Logged",
    user: "Distribution Center B",
    userAddress: "0x456789abcdef1234",
    details: "25kg Rice distributed to beneficiary",
    timestamp: "2024-01-15 09:45:17",
    txHash: "0xabcdef123456789fedcba987",
    status: "confirmed",
    type: "distribution"
  },
  {
    id: 7,
    action: "Access Control Updated",
    user: "Admin User",
    userAddress: "0x742d35Cc6862C4C4",
    details: "QR generation permission granted to new center",
    timestamp: "2024-01-15 08:20:55",
    txHash: "0x321fedcba987654321abcdef",
    status: "failed",
    type: "edit"
  }
];

const getActionIcon = (type) => {
  switch (type) {
    case 'create': return <Plus className="h-4 w-4" />;
    case 'edit': return <Edit className="h-4 w-4" />;
    case 'delete': return <Trash2 className="h-4 w-4" />;
    case 'generate': return <CheckCircle className="h-4 w-4" />;
    default: return <User className="h-4 w-4" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed': return 'success';
    case 'pending': return 'warning';
    case 'failed': return 'destructive';
    default: return 'secondary';
  }
};

const getActionColor = (type) => {
  switch (type) {
    case 'create': return 'text-success';
    case 'edit': return 'text-primary';
    case 'delete': return 'text-destructive';
    case 'generate': return 'text-secondary';
    default: return 'text-muted-foreground';
  }
};

export default function AdminActivity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.userAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === "all" || activity.type === actionFilter;
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const openInExplorer = (txHash) => {
    // Mock blockchain explorer URL
    const explorerUrl = `https://mumbai.polygonscan.com/tx/${txHash}`;
    window.open(explorerUrl, '_blank');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity Feed</h1>
        <p className="text-muted-foreground">Comprehensive audit log of all system activities and blockchain transactions</p>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Activity Filters
          </CardTitle>
          <CardDescription>
            Filter activities by type, status, user, or date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">User Creation</SelectItem>
                <SelectItem value="edit">Updates & Edits</SelectItem>
                <SelectItem value="delete">Deletions</SelectItem>
                <SelectItem value="generate">QR Generation</SelectItem>
                <SelectItem value="distribution">Distributions</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{filteredActivities.length}</div>
            <p className="text-sm text-muted-foreground">In selected period</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {filteredActivities.filter(a => a.status === 'confirmed').length}
            </div>
            <p className="text-sm text-muted-foreground">Successful transactions</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">
              {filteredActivities.filter(a => a.status === 'pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {filteredActivities.filter(a => a.status === 'failed').length}
            </div>
            <p className="text-sm text-muted-foreground">Failed transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            Chronological log of all system activities with blockchain verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-full bg-background shadow-sm ${getActionColor(activity.type)}`}>
                  {getActionIcon(activity.type)}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    <Badge variant={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{activity.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{activity.txHash.slice(0, 10)}...</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => openInExplorer(activity.txHash)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs font-mono text-muted-foreground">
                    User Address: {activity.userAddress}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No activities match your current filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}