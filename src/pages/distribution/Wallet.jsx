import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Wifi, WifiOff, AlertTriangle, CheckCircle, ExternalLink, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

export default function DistributionWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setConnectionError("MetaMask not detected. Please install MetaMask extension.");
      toast.error("MetaMask not detected. Please install MetaMask.");
      return;
    }

    setIsLoading(true);
    setConnectionError("");
    
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
      let errorMessage = "Failed to connect wallet";
      
      if (error.code === 4001) {
        errorMessage = "User denied connection request";
      } else if (error.code === -32002) {
        errorMessage = "Connection request already pending";
      }
      
      setConnectionError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount("");
    setNetwork("");
    setBalance("0");
    setConnectionError("");
    toast.success("Wallet disconnected");
  };

  const getNetworkName = (chainId) => {
    const networks = {
      '0x1': 'Ethereum Mainnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Polygon Mumbai',
      '0x5': 'Goerli Testnet',
      '0xaa36a7': 'Sepolia Testnet'
    };
    return networks[chainId] || `Unknown Network (${chainId})`;
  };

  const isCorrectNetwork = () => {
    return network.includes("Mumbai") || network.includes("Polygon");
  };

  const switchToMumbai = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // Polygon Mumbai
      });
      setNetwork("Polygon Mumbai");
      toast.success("Switched to Polygon Mumbai network");
    } catch (error) {
      if (error.code === 4902) {
        // Network not added to MetaMask
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x13881',
              chainName: 'Polygon Mumbai',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
              blockExplorerUrls: ['https://mumbai.polygonscan.com/']
            }]
          });
          toast.success("Mumbai network added and connected");
        } catch (addError) {
          toast.error("Failed to add Mumbai network");
        }
      } else {
        toast.error("Failed to switch network: " + error.message);
      }
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
        window.location.reload(); // Recommended by MetaMask
      });

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            window.ethereum.request({ method: 'eth_chainId' })
              .then(chainId => setNetwork(getNetworkName(chainId)));
          }
        });
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">MetaMask Wallet Integration</h1>
        <p className="text-muted-foreground">Connect and manage your wallet for blockchain transactions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Wallet Connection
            </CardTitle>
            <CardDescription>
              Connect your MetaMask wallet to enable distribution logging
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
                  {isConnected ? "Wallet Connected" : "Wallet Disconnected"}
                </span>
              </div>
              <Badge variant={isConnected ? "success" : "destructive"}>
                {isConnected ? "Online" : "Offline"}
              </Badge>
            </div>

            {connectionError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Connection Error</span>
                </div>
                <p className="mt-1">{connectionError}</p>
              </div>
            )}

            {isConnected ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Wallet Address</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                      {account}
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://mumbai.polygonscan.com/address/${account}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Network</label>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{network}</span>
                      {!isCorrectNetwork() && (
                        <Badge variant="warning" className="text-xs">
                          Wrong Network
                        </Badge>
                      )}
                    </div>
                    {!isCorrectNetwork() && (
                      <Button variant="outline" size="sm" onClick={switchToMumbai}>
                        Switch to Mumbai
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Balance</label>
                  <div className="text-lg font-semibold">{balance} {network.includes("Polygon") ? "MATIC" : "ETH"}</div>
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
                {isLoading ? "Connecting..." : "Connect MetaMask Wallet"}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Connection Status
            </CardTitle>
            <CardDescription>
              Real-time status of wallet and network connection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">MetaMask Extension</span>
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${window.ethereum ? 'status-online' : 'status-offline'}`}></div>
                  <span className="text-sm">{window.ethereum ? "Detected" : "Not Found"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Wallet Connection</span>
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${isConnected ? 'status-online' : 'status-offline'}`}></div>
                  <span className="text-sm">{isConnected ? "Connected" : "Disconnected"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Network Compatibility</span>
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${isConnected && isCorrectNetwork() ? 'status-online' : 'status-offline'}`}></div>
                  <span className="text-sm">
                    {isConnected ? (isCorrectNetwork() ? "Compatible" : "Incompatible") : "Unknown"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Transaction Capability</span>
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${isConnected && isCorrectNetwork() ? 'status-online' : 'status-offline'}`}></div>
                  <span className="text-sm">
                    {isConnected && isCorrectNetwork() ? "Ready" : "Not Ready"}
                  </span>
                </div>
              </div>
            </div>

            {!isCorrectNetwork() && isConnected && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Network Warning</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You're connected to {network}. Please switch to Polygon Mumbai for optimal compatibility with the GrainChain system.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Wallet Activity</CardTitle>
          <CardDescription>
            Latest transactions and wallet interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isConnected ? [
              { action: "Food Distribution", amount: "10kg Rice", time: "2 minutes ago", status: "confirmed", gas: "0.0023 MATIC" },
              { action: "Food Distribution", amount: "8kg Wheat", time: "1 hour ago", status: "confirmed", gas: "0.0021 MATIC" },
              { action: "Wallet Connected", amount: "Session Started", time: "2 hours ago", status: "success", gas: "0 MATIC" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.amount}</p>
                </div>
                <div className="text-right">
                  <Badge variant={activity.status === 'confirmed' || activity.status === 'success' ? 'success' : 'warning'}>
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  <p className="text-xs text-muted-foreground">Gas: {activity.gas}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <Wallet className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Connect your wallet to view activity</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}