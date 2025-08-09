import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, TrendingDown, TrendingUp, AlertTriangle, RefreshCw, ShoppingCart } from "lucide-react";

const inventoryData = [
  {
    id: 1,
    name: "Rice",
    currentStock: 750,
    maxCapacity: 1000,
    unit: "kg",
    lastRefill: "2024-01-10",
    avgDailyUsage: 25,
    daysRemaining: 30,
    status: "good",
    supplier: "Government Depot A"
  },
  {
    id: 2,
    name: "Wheat",
    currentStock: 200,
    maxCapacity: 800,
    unit: "kg",
    lastRefill: "2024-01-08",
    avgDailyUsage: 30,
    daysRemaining: 7,
    status: "low",
    supplier: "Government Depot B"
  },
  {
    id: 3,
    name: "Dal (Pulses)",
    currentStock: 50,
    maxCapacity: 300,
    unit: "kg",
    lastRefill: "2024-01-05",
    avgDailyUsage: 8,
    daysRemaining: 6,
    status: "critical",
    supplier: "Government Depot A"
  },
  {
    id: 4,
    name: "Cooking Oil",
    currentStock: 120,
    maxCapacity: 200,
    unit: "liters",
    lastRefill: "2024-01-12",
    avgDailyUsage: 5,
    daysRemaining: 24,
    status: "good",
    supplier: "Oil Mills Cooperative"
  },
  {
    id: 5,
    name: "Sugar",
    currentStock: 80,
    maxCapacity: 400,
    unit: "kg",
    lastRefill: "2024-01-06",
    avgDailyUsage: 12,
    daysRemaining: 7,
    status: "low",
    supplier: "Sugar Mills Ltd"
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'good': return 'success';
    case 'low': return 'warning';
    case 'critical': return 'destructive';
    default: return 'secondary';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'good': return <TrendingUp className="h-4 w-4" />;
    case 'low': return <TrendingDown className="h-4 w-4" />;
    case 'critical': return <AlertTriangle className="h-4 w-4" />;
    default: return <Package className="h-4 w-4" />;
  }
};

export default function DistributionInventory() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshInventory = () => {
    setLastUpdated(new Date());
    // Mock refresh action - in real app, would fetch from API
  };

  const requestRestock = (itemName) => {
    // Mock restock request - in real app, would send request to admin
    alert(`Restock request sent for ${itemName}`);
  };

  const totalItems = inventoryData.length;
  const criticalItems = inventoryData.filter(item => item.status === 'critical').length;
  const lowItems = inventoryData.filter(item => item.status === 'low').length;
  const goodItems = inventoryData.filter(item => item.status === 'good').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Balance</h1>
          <p className="text-muted-foreground">Real-time view of food grain stock levels and consumption patterns</p>
        </div>
        <Button variant="outline" onClick={refreshInventory}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Different grain types
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{goodItems}</div>
            <p className="text-xs text-muted-foreground">
              Items with sufficient stock
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{lowItems}</div>
            <p className="text-xs text-muted-foreground">
              Items need restocking soon
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalItems}</div>
            <p className="text-xs text-muted-foreground">
              Items urgently need restock
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryData.map((item) => {
          const stockPercentage = (item.currentStock / item.maxCapacity) * 100;
          
          return (
            <Card key={item.id} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {item.name}
                  </CardTitle>
                  <Badge variant={getStatusColor(item.status)} className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Stock</span>
                    <span className="font-medium">{item.currentStock} {item.unit}</span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 {item.unit}</span>
                    <span>{item.maxCapacity} {item.unit}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Daily Usage</p>
                    <p className="font-medium">{item.avgDailyUsage} {item.unit}/day</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Days Remaining</p>
                    <p className={`font-medium ${
                      item.daysRemaining <= 7 ? 'text-destructive' :
                      item.daysRemaining <= 14 ? 'text-warning' : 'text-success'
                    }`}>
                      {item.daysRemaining} days
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Refill</p>
                    <p className="font-medium">{item.lastRefill}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Supplier</p>
                    <p className="font-medium text-xs">{item.supplier}</p>
                  </div>
                </div>

                {(item.status === 'low' || item.status === 'critical') && (
                  <Button 
                    variant={item.status === 'critical' ? 'destructive' : 'warning'} 
                    size="sm" 
                    className="w-full"
                    onClick={() => requestRestock(item.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Request Restock
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Stock Alerts</CardTitle>
            <CardDescription>
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventoryData
                .filter(item => item.status !== 'good')
                .sort((a, b) => a.daysRemaining - b.daysRemaining)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'critical' ? 'bg-destructive' : 'bg-warning'
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.currentStock} {item.unit} remaining
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.daysRemaining} days</p>
                      <p className="text-xs text-muted-foreground">at current usage</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Inventory system status and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">
                {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Auto Refresh</span>
              <Badge variant="success">Every 5 minutes</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Sync Status</span>
              <div className="flex items-center gap-2">
                <div className="status-indicator status-online"></div>
                <span className="text-sm">Connected</span>
              </div>
            </div>

            <div className="p-3 bg-primary/10 border border-primary/20 rounded text-sm">
              <p className="font-medium mb-1">📊 Usage Forecast</p>
              <p className="text-muted-foreground">
                Based on current consumption patterns, you'll need to restock Dal and Wheat within the next week.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}