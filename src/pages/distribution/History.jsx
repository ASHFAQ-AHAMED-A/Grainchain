import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Download, ExternalLink, Filter, FileText } from "lucide-react";

const transactionHistory = [
  {
    id: 1,
    txHash: "0x742d35Cc6862C4C4567890abcdef1234567890ab",
    beneficiary: "John Doe",
    beneficiaryAddress: "0x1F4B7E6A9C3D8E2F",
    grainType: "Rice",
    quantity: 10,
    unit: "kg",
    date: "2024-01-15",
    time: "14:30:25",
    status: "confirmed",
    gasUsed: "0.0023 ETH",
    blockNumber: 12345678
  },
  {
    id: 2,
    txHash: "0x8765432109abcdef1234567890abcdef09876543",
    beneficiary: "Jane Smith",
    beneficiaryAddress: "0x2G5C8F7B0E4F9A3G",
    grainType: "Wheat",
    quantity: 8,
    unit: "kg",
    date: "2024-01-15",
    time: "13:45:12",
    status: "confirmed",
    gasUsed: "0.0021 ETH",
    blockNumber: 12345677
  },
  {
    id: 3,
    txHash: "0x1234567890abcdef9876543210fedcba12345678",
    beneficiary: "Bob Johnson",
    beneficiaryAddress: "0x3H6D9G8C1F5H0B4H",
    grainType: "Dal",
    quantity: 2,
    unit: "kg",
    date: "2024-01-15",
    time: "12:20:08",
    status: "pending",
    gasUsed: "0.0025 ETH",
    blockNumber: null
  },
  {
    id: 4,
    txHash: "0x987654321fedcba012345678abcdef9876543210",
    beneficiary: "Alice Brown",
    beneficiaryAddress: "0x4I7E0H9D2G6I1C5I",
    grainType: "Cooking Oil",
    quantity: 1,
    unit: "liters",
    date: "2024-01-14",
    time: "16:15:45",
    status: "confirmed",
    gasUsed: "0.0020 ETH",
    blockNumber: 12345650
  },
  {
    id: 5,
    txHash: "0xfedcba9876543210abcdef123456789876543210",
    beneficiary: "Charlie Wilson",
    beneficiaryAddress: "0x5J8F1I0E3H7J2D6J",
    grainType: "Sugar",
    quantity: 5,
    unit: "kg",
    date: "2024-01-14",
    time: "15:30:22",
    status: "failed",
    gasUsed: "0.0018 ETH",
    blockNumber: null
  },
  {
    id: 6,
    txHash: "0xabcdef123456789fedcba9876543210abcdef123",
    beneficiary: "Diana Davis",
    beneficiaryAddress: "0x6K9G2J1F4I8K3E7K",
    grainType: "Rice",
    quantity: 15,
    unit: "kg",
    date: "2024-01-14",
    time: "14:45:17",
    status: "confirmed",
    gasUsed: "0.0024 ETH",
    blockNumber: 12345648
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed': return 'success';
    case 'pending': return 'warning';
    case 'failed': return 'destructive';
    default: return 'secondary';
  }
};

export default function DistributionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [grainFilter, setGrainFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredTransactions = transactionHistory.filter(tx => {
    const matchesSearch = 
      tx.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.beneficiaryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrain = grainFilter === "all" || tx.grainType === grainFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    
    return matchesSearch && matchesGrain && matchesStatus;
  });

  const openInExplorer = (txHash) => {
    const explorerUrl = `https://mumbai.polygonscan.com/tx/${txHash}`;
    window.open(explorerUrl, '_blank');
  };

  const exportCSV = () => {
    const headers = ['Transaction Hash', 'Beneficiary', 'Grain Type', 'Quantity', 'Date', 'Status'];
    const csvData = filteredTransactions.map(tx => [
      tx.txHash,
      tx.beneficiary,
      tx.grainType,
      `${tx.quantity} ${tx.unit}`,
      `${tx.date} ${tx.time}`,
      tx.status
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `distribution-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalTransactions = filteredTransactions.length;
  const confirmedTx = filteredTransactions.filter(tx => tx.status === 'confirmed').length;
  const pendingTx = filteredTransactions.filter(tx => tx.status === 'pending').length;
  const failedTx = filteredTransactions.filter(tx => tx.status === 'failed').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">Complete log of food distribution transactions with blockchain verification</p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              In selected period
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <Badge variant="success" className="h-4">✓</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{confirmedTx}</div>
            <p className="text-xs text-muted-foreground">
              Successfully processed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Badge variant="warning" className="h-4">⏳</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingTx}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <Badge variant="destructive" className="h-4">✕</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failedTx}</div>
            <p className="text-xs text-muted-foreground">
              Transaction errors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Transaction Filters
          </CardTitle>
          <CardDescription>
            Filter transactions by beneficiary, grain type, status, or date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-max absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={grainFilter} onValueChange={setGrainFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by grain type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grain Types</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
                <SelectItem value="Wheat">Wheat</SelectItem>
                <SelectItem value="Dal">Dal (Pulses)</SelectItem>
                <SelectItem value="Cooking Oil">Cooking Oil</SelectItem>
                <SelectItem value="Sugar">Sugar</SelectItem>
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

      {/* Transaction Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Transaction Records</CardTitle>
          <CardDescription>
            Detailed view of all distribution transactions with blockchain links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Beneficiary</TableHead>
                  <TableHead>Distribution</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gas Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div>
                        <p className="font-mono text-sm">{tx.txHash.slice(0, 10)}...{tx.txHash.slice(-6)}</p>
                        {tx.blockNumber && (
                          <p className="text-xs text-muted-foreground">Block #{tx.blockNumber}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{tx.beneficiary}</p>
                        <p className="text-xs text-muted-foreground font-mono">{tx.beneficiaryAddress}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{tx.quantity} {tx.unit}</p>
                        <p className="text-xs text-muted-foreground">{tx.grainType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{tx.date}</p>
                        <p className="text-xs text-muted-foreground">{tx.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-mono">{tx.gasUsed}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openInExplorer(tx.txHash)}
                        disabled={!tx.blockNumber}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No transactions match your current filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Distribution Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Distribution Summary</CardTitle>
          <CardDescription>
            Aggregate statistics for the filtered time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Total Distributed by Grain Type</h4>
              {Object.entries(
                filteredTransactions
                  .filter(tx => tx.status === 'confirmed')
                  .reduce((acc, tx) => {
                    acc[tx.grainType] = (acc[tx.grainType] || 0) + tx.quantity;
                    return acc;
                  }, {})
              ).map(([grain, total]) => (
                <div key={grain} className="flex justify-between text-sm">
                  <span>{grain}</span>
                  <span className="font-medium">{total} kg/L</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Top Beneficiaries</h4>
              {Object.entries(
                filteredTransactions
                  .filter(tx => tx.status === 'confirmed')
                  .reduce((acc, tx) => {
                    acc[tx.beneficiary] = (acc[tx.beneficiary] || 0) + 1;
                    return acc;
                  }, {})
              )
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([beneficiary, count]) => (
                <div key={beneficiary} className="flex justify-between text-sm">
                  <span>{beneficiary}</span>
                  <span className="font-medium">{count} transactions</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Success Rate</span>
                  <span className="font-medium text-success">
                    {totalTransactions > 0 ? Math.round((confirmedTx / totalTransactions) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Gas Cost</span>
                  <span className="font-medium">0.0022 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Gas Used</span>
                  <span className="font-medium">
                    {(filteredTransactions.length * 0.0022).toFixed(4)} ETH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}