import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Zap, AlertCircle, CheckCircle, Copy, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useMetaMask } from '@/hooks/useMetaMask';
import { useAuth } from '@/contexts/AuthContext';

const WalletBlockchain = () => {
  const { user } = useAuth();
  const { 
    isConnected, 
    account, 
    balance, 
    chainId, 
    connect, 
    disconnect, 
    isLoading, 
    error,
    formatAddress 
  } = useMetaMask();
  
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (account) {
      await navigator.clipboard.writeText(account);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const getNetworkName = (chainId: string | null) => {
    if (!chainId) return 'Unknown';
    const networks: { [key: string]: string } = {
      '0x1': 'Ethereum Mainnet',
      '0x3': 'Ropsten Testnet',
      '0x4': 'Rinkeby Testnet',
      '0x5': 'Goerli Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Polygon Mumbai',
    };
    return networks[chainId] || `Network ${chainId}`;
  };

  const isCorrectNetwork = chainId === '0x1' || chainId === '0x5'; // Mainnet or Goerli

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Wallet & Blockchain Connection</h1>
          <p className="text-muted-foreground">Manage blockchain wallet connections and network status</p>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallet Connection Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                MetaMask Wallet
              </CardTitle>
              <CardDescription>
                Connect your MetaMask wallet to interact with the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connection Status</span>
                <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center gap-1">
                  {isConnected ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Connected
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3" />
                      Disconnected
                    </>
                  )}
                </Badge>
              </div>

              {isConnected && account && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Wallet Address</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {formatAddress(account)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyAddress}
                          className="h-8 w-8 p-0"
                        >
                          {isCopied ? (
                            <CheckCircle className="w-3 h-3 text-success" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Balance</span>
                      <span className="font-mono text-sm">{balance} ETH</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={isCorrectNetwork ? "default" : "destructive"}>
                          {getNetworkName(chainId)}
                        </Badge>
                        {!isCorrectNetwork && (
                          <AlertCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="flex gap-2">
                {isConnected ? (
                  <Button
                    variant="outline"
                    onClick={disconnect}
                    className="flex-1"
                  >
                    Disconnect Wallet
                  </Button>
                ) : (
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={connect}
                      disabled={isLoading}
                      className="w-full bg-gradient-primary hover:opacity-90 glow-primary"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect MetaMask
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </div>

              {!isCorrectNetwork && isConnected && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please switch to Ethereum Mainnet or Goerli Testnet for optimal functionality.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Blockchain Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Blockchain Status
              </CardTitle>
              <CardDescription>
                Monitor blockchain network and smart contract status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Network Status</span>
                  <Badge variant="default" className="flex items-center gap-1 animate-pulse-glow">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    Online
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Smart Contract</span>
                  <Badge variant="default">Deployed</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Block</span>
                  <span className="font-mono text-sm">#18,234,567</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Gas Price</span>
                  <span className="font-mono text-sm">25 gwei</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tx Count</span>
                  <span className="font-mono text-sm">1,247</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Etherscan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glow-card">
          <CardHeader>
            <CardTitle>Recent Blockchain Transactions</CardTitle>
            <CardDescription>
              Latest transactions from all distribution centers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { hash: '0x1234...5678', type: 'Distribution', amount: '100 kg Rice', time: '2 minutes ago', status: 'confirmed' },
                { hash: '0xabcd...efgh', type: 'Inventory Update', amount: '500 kg Wheat', time: '15 minutes ago', status: 'confirmed' },
                { hash: '0x9876...5432', type: 'Distribution', amount: '75 kg Pulses', time: '1 hour ago', status: 'pending' },
              ].map((tx, index) => (
                <motion.div
                  key={tx.hash}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${tx.status === 'confirmed' ? 'bg-success' : 'bg-warning animate-pulse'}`} />
                    <div>
                      <div className="font-medium text-sm">{tx.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {tx.hash} • {tx.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{tx.amount}</div>
                    <Badge variant={tx.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                      {tx.status}
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

export default WalletBlockchain;