import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Wifi, WifiOff, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected. Please install MetaMask.");
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // Get network info
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setNetwork(getNetworkName(chainId));
        
        // Get balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        setBalance((parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4));
        
        toast.success("Wallet connected successfully!");
      }
    } catch (error) {
      toast.error("Failed to connect wallet: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount("");
    setNetwork("");
    setBalance("0");
    toast.success("Wallet disconnected");
  };

  const getNetworkName = (chainId) => {
    const networks = {
      '0x1': 'Ethereum Mainnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Polygon Mumbai',
      '0x5': 'Goerli Testnet'
    };
    return networks[chainId] || `Unknown (${chainId})`;
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // Polygon Mumbai
      });
      toast.success("Network switched to Polygon Mumbai");
    } catch (error) {
      toast.error("Failed to switch network: " + error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        setNetwork(getNetworkName(chainId));
      });
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wallet & Blockchain Connection</h1>
        <p className="text-muted-foreground">Manage MetaMask connection and blockchain network settings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              MetaMask Connection
            </CardTitle>
            <CardDescription>
              Connect your MetaMask wallet to interact with the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {isConnected ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <WifiOff className="h-5 w-5 text-destructive" />
                )}
                <span className="font-medium">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <Badge variant={isConnected ? "success" : "destructive"}>
                {isConnected ? "Online" : "Offline"}
              </Badge>
            </div>

            {isConnected ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Wallet Address</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                      {account}
                    </code>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Network</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">{network}</span>
                    {!network.includes("Mumbai") && (
                      <Button variant="outline" size="sm" onClick={switchNetwork}>
                        Switch to Mumbai
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Balance</label>
                  <div className="text-lg font-semibold">{balance} ETH</div>
                </div>

                <Button variant="destructive" onClick={disconnectWallet} className="w-full">
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <Button 
                variant="gradient" 
                onClick={connectWallet} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Connecting..." : "Connect MetaMask"}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Network Status
            </CardTitle>
            <CardDescription>
              Blockchain network health and contract status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Blockchain Network</span>
                <div className="flex items-center gap-2">
                  <div className="status-indicator status-online"></div>
                  <span className="text-sm">Connected</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Smart Contract</span>
                <div className="flex items-center gap-2">
                  <div className="status-indicator status-online"></div>
                  <span className="text-sm">Deployed</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Transaction Pool</span>
                <div className="flex items-center gap-2">
                  <div className="status-indicator status-processing"></div>
                  <span className="text-sm">Processing</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">IPFS Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="status-indicator status-online"></div>
                  <span className="text-sm">Operational</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Network Recommendation</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For optimal performance, ensure you're connected to Polygon Mumbai testnet.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Blockchain Activity</CardTitle>
          <CardDescription>
            Latest transactions and network events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: "User Registration", hash: "0x1234...5678", time: "2 minutes ago", status: "confirmed" },
              { type: "QR Code Generated", hash: "0x8765...4321", time: "5 minutes ago", status: "confirmed" },
              { type: "Role Assignment", hash: "0x9876...1234", time: "8 minutes ago", status: "pending" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{activity.type}</p>
                  <p className="text-xs text-muted-foreground font-mono">{activity.hash}</p>
                </div>
                <div className="text-right">
                  <Badge variant={activity.status === 'confirmed' ? 'success' : 'warning'}>
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}