import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingDown, TrendingUp, AlertTriangle, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  totalCapacity: number;
  unit: string;
  reorderLevel: number;
  lastRefill: string;
  expiryDate?: string;
  status: 'healthy' | 'low' | 'critical' | 'out-of-stock';
  pricePerUnit: number;
  supplier: string;
}

const inventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Rice',
    currentStock: 450,
    totalCapacity: 1000,
    unit: 'kg',
    reorderLevel: 200,
    lastRefill: '2024-01-15',
    expiryDate: '2024-06-15',
    status: 'healthy',
    pricePerUnit: 45,
    supplier: 'Punjab Grain Suppliers'
  },
  {
    id: '2',
    name: 'Wheat',
    currentStock: 180,
    totalCapacity: 800,
    unit: 'kg',
    reorderLevel: 200,
    lastRefill: '2024-01-10',
    expiryDate: '2024-07-10',
    status: 'low',
    pricePerUnit: 35,
    supplier: 'Haryana Wheat Co.'
  },
  {
    id: '3',
    name: 'Pulses (Dal)',
    currentStock: 80,
    totalCapacity: 500,
    unit: 'kg',
    reorderLevel: 100,
    lastRefill: '2024-01-05',
    expiryDate: '2024-05-05',
    status: 'critical',
    pricePerUnit: 120,
    supplier: 'Maharashtra Pulse Ltd.'
  },
  {
    id: '4',
    name: 'Sugar',
    currentStock: 0,
    totalCapacity: 300,
    unit: 'kg',
    reorderLevel: 50,
    lastRefill: '2023-12-20',
    expiryDate: '2025-12-20',
    status: 'out-of-stock',
    pricePerUnit: 55,
    supplier: 'UP Sugar Mills'
  },
  {
    id: '5',
    name: 'Cooking Oil',
    currentStock: 120,
    totalCapacity: 200,
    unit: 'liters',
    reorderLevel: 40,
    lastRefill: '2024-01-18',
    expiryDate: '2024-08-18',
    status: 'healthy',
    pricePerUnit: 150,
    supplier: 'Delhi Oil Industries'
  },
];

const InventoryBalance = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData);
  const [isRefillDialogOpen, setIsRefillDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [refillAmount, setRefillAmount] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-success text-success-foreground';
      case 'low':
        return 'bg-warning text-warning-foreground';
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'out-of-stock':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStockPercentage = (item: InventoryItem) => {
    return (item.currentStock / item.totalCapacity) * 100;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 50) return 'bg-success';
    if (percentage > 20) return 'bg-warning';
    return 'bg-destructive';
  };

  const handleRefillRequest = () => {
    if (selectedItem && refillAmount) {
      const updatedInventory = inventory.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              currentStock: Math.min(
                item.currentStock + parseInt(refillAmount),
                item.totalCapacity
              ),
              lastRefill: new Date().toISOString().split('T')[0],
              status: 'healthy' as const
            }
          : item
      );
      setInventory(updatedInventory);
      setIsRefillDialogOpen(false);
      setSelectedItem(null);
      setRefillAmount('');
    }
  };

  const lowStockItems = inventory.filter(item => 
    item.status === 'low' || item.status === 'critical' || item.status === 'out-of-stock'
  );

  const totalValue = inventory.reduce((sum, item) => 
    sum + (item.currentStock * item.pricePerUnit), 0
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Inventory Balance Viewer</h1>
          <p className="text-muted-foreground">Monitor grain stock levels and manage inventory</p>
        </div>
        
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </motion.div>

      {/* Stock Alerts */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Stock Alert:</strong> {lowStockItems.length} item(s) require attention - 
              {lowStockItems.map(item => ` ${item.name}`).join(',')}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Items',
            value: inventory.length.toString(),
            icon: Package,
            color: 'text-primary'
          },
          {
            title: 'Low Stock',
            value: lowStockItems.length.toString(),
            icon: TrendingDown,
            color: 'text-destructive'
          },
          {
            title: 'Healthy Stock',
            value: inventory.filter(i => i.status === 'healthy').length.toString(),
            icon: TrendingUp,
            color: 'text-success'
          },
          {
            title: 'Total Value',
            value: `₹${totalValue.toLocaleString()}`,
            icon: Package,
            color: 'text-primary'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="glow-card group hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  Supplier: {item.supplier}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stock Level */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Stock</span>
                    <span className="font-medium">
                      {item.currentStock} / {item.totalCapacity} {item.unit}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={getStockPercentage(item)} 
                      className="h-3"
                    />
                    {item.currentStock <= item.reorderLevel && (
                      <div className="absolute right-0 top-0 w-1 h-3 bg-destructive rounded-r" />
                    )}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Reorder Level: {item.reorderLevel} {item.unit}</span>
                    <span>{getStockPercentage(item).toFixed(1)}% Full</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Refill:</span>
                    <span>{item.lastRefill}</span>
                  </div>
                  {item.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span>{item.expiryDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price/Unit:</span>
                    <span>₹{item.pricePerUnit}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span>₹{(item.currentStock * item.pricePerUnit).toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <Dialog open={isRefillDialogOpen && selectedItem?.id === item.id} 
                          onOpenChange={(open) => {
                            setIsRefillDialogOpen(open);
                            if (!open) {
                              setSelectedItem(null);
                              setRefillAmount('');
                            }
                          }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsRefillDialogOpen(true);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Request Refill
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Stock Refill</DialogTitle>
                        <DialogDescription>
                          Request additional stock for {item.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Current Stock</Label>
                          <div className="text-sm text-muted-foreground">
                            {item.currentStock} {item.unit} / {item.totalCapacity} {item.unit}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="refill-amount">Refill Amount ({item.unit})</Label>
                          <Input
                            id="refill-amount"
                            type="number"
                            placeholder="Enter amount to refill"
                            value={refillAmount}
                            onChange={(e) => setRefillAmount(e.target.value)}
                            max={item.totalCapacity - item.currentStock}
                          />
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Available capacity: {item.totalCapacity - item.currentStock} {item.unit}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button
                          onClick={handleRefillRequest}
                          disabled={!refillAmount || parseInt(refillAmount) <= 0}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          Submit Request
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InventoryBalance;