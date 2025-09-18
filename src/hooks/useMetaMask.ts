import { useState, useEffect } from 'react';

interface MetaMaskState {
  isConnected: boolean;
  account: string | null;
  isInstalled: boolean;
  chainId: string | null;
  balance: string | null;
}

export const useMetaMask = () => {
  const [state, setState] = useState<MetaMaskState>({
    isConnected: false,
    account: null,
    isInstalled: false,
    chainId: null,
    balance: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window.ethereum !== 'undefined') {
        setState(prev => ({ ...prev, isInstalled: true }));
        checkConnection();
      }
    };

    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        if (accounts.length > 0) {
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          });
          
          setState({
            isConnected: true,
            account: accounts[0],
            isInstalled: true,
            chainId,
            balance: (parseInt(balance, 16) / 1e18).toFixed(4)
          });
        }
      } catch (err) {
        console.error('Error checking MetaMask connection:', err);
      }
    };

    checkMetaMask();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setState(prev => ({ ...prev, isConnected: false, account: null, balance: null }));
        } else {
          setState(prev => ({ ...prev, account: accounts[0] }));
          updateBalance(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setState(prev => ({ ...prev, chainId }));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const updateBalance = async (account: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest']
      });
      setState(prev => ({ ...prev, balance: (parseInt(balance, 16) / 1e18).toFixed(4) }));
    } catch (err) {
      console.error('Error getting balance:', err);
    }
  };

  const connect = async () => {
    if (!state.isInstalled) {
      setError('MetaMask is not installed');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });

      setState({
        isConnected: true,
        account: accounts[0],
        isInstalled: true,
        chainId,
        balance: (parseInt(balance, 16) / 1e18).toFixed(4)
      });

      return accounts[0];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setState({
      isConnected: false,
      account: null,
      isInstalled: state.isInstalled,
      chainId: null,
      balance: null
    });
  };

  const switchNetwork = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (err) {
      setError('Failed to switch network');
      throw err;
    }
  };

  return {
    ...state,
    connect,
    disconnect,
    switchNetwork,
    isLoading,
    error,
    formatAddress: (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`
  };
};