import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Settings, Save, RotateCcw, User, Building2, QrCode, BarChart3, Package, History } from "lucide-react";
import toast from "react-hot-toast";

const mockUsers = [
  { 
    id: 1, 
    name: "John Doe", 
    role: "citizen", 
    address: "0x1F4B7E6A9C3D8E2F",
    permissions: {
      qrGeneration: false,
      analytics: false,
      userManagement: false,
      distributionLog: true,
      inventory: false,
      history: true
    }
  },
  { 
    id: 2, 
    name: "Distribution Center A", 
    role: "center", 
    address: "0x8A5A4B3C92D8E1F7",
    permissions: {
      qrGeneration: true,
      analytics: true,
      userManagement: false,
      distributionLog: true,
      inventory: true,
      history: true
    }
  },
  { 
    id: 3, 
    name: "Admin User", 
    role: "admin", 
    address: "0x742d35Cc6862C4C4",
    permissions: {
      qrGeneration: true,
      analytics: true,
      userManagement: true,
      distributionLog: true,
      inventory: true,
      history: true
    }
  },
  { 
    id: 4, 
    name: "Distribution Center B", 
    role: "center", 
    address: "0x9E7C6B4A1D8F2E9C",
    permissions: {
      qrGeneration: false,
      analytics: false,
      userManagement: false,
      distributionLog: true,
      inventory: true,
      history: false
    }
  }
];

const permissionTemplates = {
  admin: {
    qrGeneration: true,
    analytics: true,
    userManagement: true,
    distributionLog: true,
    inventory: true,
    history: true
  },
  center: {
    qrGeneration: true,
    analytics: true,
    userManagement: false,
    distributionLog: true,
    inventory: true,
    history: true
  },
  citizen: {
    qrGeneration: false,
    analytics: false,
    userManagement: false,
    distributionLog: false,
    inventory: false,
    history: true
  }
};

const permissionLabels = {
  qrGeneration: { label: "QR Generation", icon: QrCode, description: "Generate and manage QR codes" },
  analytics: { label: "Analytics Access", icon: BarChart3, description: "View system analytics and reports" },
  userManagement: { label: "User Management", icon: Shield, description: "Create, edit, and delete users" },
  distributionLog: { label: "Distribution Logging", icon: Package, description: "Log food distribution transactions" },
  inventory: { label: "Inventory Access", icon: Package, description: "View and manage inventory levels" },
  history: { label: "Transaction History", icon: History, description: "Access transaction history and records" }
};

const getRoleIcon = (role) => {
  switch (role) {
    case 'admin': return <Shield className="h-4 w-4" />;
    case 'center': return <Building2 className="h-4 w-4" />;
    default: return <User className="h-4 w-4" />;
  }
};

const getRoleColor = (role) => {
  switch (role) {
    case 'admin': return 'bg-primary text-primary-foreground';
    case 'center': return 'bg-secondary text-secondary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function AdminAccess() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const updatePermission = (userId, permission, value) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, permissions: { ...user.permissions, [permission]: value } }
          : user
      )
    );
    setHasChanges(true);
  };

  const applyTemplate = (userId, template) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, permissions: { ...permissionTemplates[template] } }
          : user
      )
    );
    setHasChanges(true);
    toast.success(`${template} template applied successfully`);
  };

  const saveChanges = () => {
    // Mock save operation
    setHasChanges(false);
    toast.success("Permission changes saved successfully");
  };

  const revertChanges = () => {
    setUsers(mockUsers);
    setHasChanges(false);
    toast.success("Changes reverted to last saved state");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Role-Based Access Control</h1>
          <p className="text-muted-foreground">Manage user permissions and feature access across the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={revertChanges} disabled={!hasChanges}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Revert
          </Button>
          <Button variant="gradient" onClick={saveChanges} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {hasChanges && (
        <Card className="shadow-card border-accent/50 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Unsaved Changes</span>
              <span className="text-sm text-muted-foreground">
                You have modified permissions. Remember to save your changes.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permission Templates */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Permission Templates</CardTitle>
          <CardDescription>
            Pre-configured permission sets for different user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(permissionTemplates).map(([template, permissions]) => (
              <Card key={template} className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 capitalize">
                    {getRoleIcon(template)}
                    {template}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(permissions).map(([permission, enabled]) => (
                    <div key={permission} className="flex items-center justify-between text-sm">
                      <span>{permissionLabels[permission].label}</span>
                      <Badge variant={enabled ? "success" : "secondary"}>
                        {enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Permissions Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>User Permission Matrix</CardTitle>
          <CardDescription>
            Individual permission settings for all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead className="w-[100px]">Role</TableHead>
                  <TableHead className="w-[150px]">Template</TableHead>
                  {Object.entries(permissionLabels).map(([key, { label, icon: Icon }]) => (
                    <TableHead key={key} className="text-center min-w-[120px]">
                      <div className="flex items-center justify-center gap-1">
                        <Icon className="h-4 w-4" />
                        <span className="hidden lg:inline">{label}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{user.address}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleColor(user.role)}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(user.role)}
                          {user.role}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select onValueChange={(template) => applyTemplate(user.id, template)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Apply template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="citizen">Citizen</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    {Object.keys(permissionLabels).map((permission) => (
                      <TableCell key={permission} className="text-center">
                        <Switch
                          checked={user.permissions[permission]}
                          onCheckedChange={(checked) => updatePermission(user.id, permission, checked)}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Change Log */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Permission Changes</CardTitle>
          <CardDescription>
            Audit trail of permission modifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: "Distribution Center A", change: "Analytics access granted", time: "2 hours ago", admin: "Admin User" },
              { user: "John Doe", change: "QR generation permission revoked", time: "1 day ago", admin: "Admin User" },
              { user: "Distribution Center B", change: "Inventory access granted", time: "2 days ago", admin: "Admin User" },
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{log.user}</p>
                  <p className="text-sm text-muted-foreground">{log.change}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>by {log.admin}</p>
                  <p>{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}