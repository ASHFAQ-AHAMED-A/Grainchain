import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Search, Filter, Download, ExternalLink, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Transaction {
  id: string;
  txHash: string;
  beneficiaryId: string;
  beneficiaryName: string;
  grainType: string;
  quantity: number;
  unit: string;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'failed';
  blockNumber: number;
  gasUsed: string;
  distributorId: string;
  distributorName: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    txHash: '0x1234567890abcdef1234567890abcdef12345678',
    beneficiaryId: 'BEN001234',
    beneficiaryName: 'Rajesh Kumar',
    grainType: 'Rice',
    quantity: 10,
    unit: 'kg',
    timestamp: '2024-01-20T14:30:00Z',
    status: 'confirmed',
    blockNumber: 18234567,
    gasUsed: '21000',
    distributorId: 'CTR001',
    distributorName: 'Distribution Center A'
  },
  {
    id: '2',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
    beneficiaryId: 'BEN001235',
    beneficiaryName: 'Priya Sharma',
    grainType: 'Wheat',
    quantity: 15,
    unit: 'kg',
    timestamp: '2024-01-20T13:45:00Z',
    status: 'confirmed',
    blockNumber: 18234556,
    gasUsed: '22500',
    distributorId: 'CTR001',
    distributorName: 'Distribution Center A'
  },
  {
    id: '3',
    txHash: '0x9876543210fedcba9876543210fedcba98765432',
    beneficiaryId: 'BEN001236',
    beneficiaryName: 'Amit Singh',
    grainType: 'Pulses',
    quantity: 5,
    unit: 'kg',
    timestamp: '2024-01-20T12:15:00Z',
    status: 'pending',
    blockNumber: 0,
    gasUsed: '0',
    distributorId: 'CTR002',
    distributorName: 'Distribution Center B'
  },
  {
    id: '4',
    txHash: '0xfedcba9876543210fedcba9876543210fedcba98',
    beneficiaryId: 'BEN001237',
    beneficiaryName: 'Sunita Devi',
    grainType: 'Sugar',
    quantity: 2,
    unit: 'kg',
    timestamp: '2024-01-20T11:30:00Z',
    status: 'confirmed',
    blockNumber: 18234520,
    gasUsed: '25000',
    distributorId: 'CTR001',
    distributorName: 'Distribution Center A'
  },
  {
    id: '5',
    txHash: '0x1111222233334444555566667777888899990000',
    beneficiaryId: 'BEN001238',
    beneficiaryName: 'Mohammad Ali',
    grainType: 'Oil',
    quantity: 1,
    unit: 'liters',
    timestamp: '2024-01-20T10:45:00Z',
    status: 'failed',
    blockNumber: 0,
    gasUsed: '0',
    distributorId: 'CTR002',
    distributorName: 'Distribution Center B'
  },
];

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterGrain, setFilterGrain] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.beneficiaryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.txHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    const matchesGrain = filterGrain === 'all' || tx.grainType === filterGrain;
    return matchesSearch && matchesStatus && matchesGrain;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatTxHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const exportToCSV = () => {
    const headers = ['Transaction Hash', 'Beneficiary', 'Grain Type', 'Quantity', 'Status', 'Timestamp'];
    const csvData = filteredTransactions.map(tx => [
      tx.txHash,
      `${tx.beneficiaryName} (${tx.beneficiaryId})`,
      tx.grainType,
      `${tx.quantity} ${tx.unit}`,
      tx.status,
      formatTimestamp(tx.timestamp)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transaction_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const grainTypes = [...new Set(transactions.map(tx => tx.grainType))];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Transaction History Log</h1>
          <p className="text-muted-foreground">View all distribution transactions and blockchain records</p>
        </div>
        
        <Button onClick={exportToCSV} className="bg-gradient-primary hover:opacity-90 glow-primary">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Transactions', value: transactions.length, status: 'all' },
          { label: 'Confirmed', value: transactions.filter(tx => tx.status === 'confirmed').length, status: 'confirmed' },
          { label: 'Pending', value: transactions.filter(tx => tx.status === 'pending').length, status: 'pending' },
          { label: 'Failed', value: transactions.filter(tx => tx.status === 'failed').length, status: 'failed' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glow-card cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setFilterStatus(stat.status)}>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by beneficiary name, ID, or transaction hash..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterGrain} onValueChange={setFilterGrain}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Grain Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grains</SelectItem>
                  {grainTypes.map(grain => (
                    <SelectItem key={grain} value={grain}>{grain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transaction Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Transaction Records
            </CardTitle>
            <CardDescription>
              Filterd results: {filteredTransactions.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Beneficiary</TableHead>
                    <TableHead>Distribution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((tx, index) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                            {formatTxHash(tx.txHash)}
                          </code>
                          <div className="text-xs text-muted-foreground">
                            Gas: {tx.gasUsed}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {tx.beneficiaryName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{tx.beneficiaryName}</div>
                            <div className="text-xs text-muted-foreground">{tx.beneficiaryId}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium">{tx.quantity} {tx.unit} {tx.grainType}</div>
                          <div className="text-xs text-muted-foreground">
                            by {tx.distributorName}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={getStatusColor(tx.status)}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm">
                          {formatTimestamp(tx.timestamp)}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {tx.blockNumber > 0 ? (
                          <div className="text-sm font-mono">
                            #{tx.blockNumber}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Pending</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://etherscan.io/tx/${tx.txHash}`, '_blank')}
                            disabled={tx.status !== 'confirmed'}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 space-y-4">
                <History className="w-16 h-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-medium">No Transactions Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{' '}
                  {filteredTransactions.length} transactions
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className="w-8 h-8 p-0"
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TransactionHistory;