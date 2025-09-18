import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'distribution-center';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  walletAddress?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithMetaMask: () => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@grainchain.com',
    role: 'admin',
    name: 'System Administrator'
  },
  {
    id: '2',
    email: 'center@grainchain.com',
    role: 'distribution-center',
    name: 'Distribution Center Manager'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('grainchain_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      if (!foundUser || password !== 'demo123') {
        throw new Error('Invalid credentials');
      }

      setUser(foundUser);
      localStorage.setItem('grainchain_user', JSON.stringify(foundUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async (): Promise<string | null> => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      return accounts[0];
    } catch (err) {
      throw new Error('Failed to connect wallet');
    }
  };

  const loginWithMetaMask = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const walletAddress = await connectWallet();
      
      // For demo, create a user based on wallet address
      const mockUser: User = {
        id: walletAddress.slice(-6),
        email: `${walletAddress.slice(0, 6)}@wallet.eth`,
        role: walletAddress.toLowerCase().includes('admin') ? 'admin' : 'distribution-center',
        name: 'Wallet User',
        walletAddress
      };

      setUser(mockUser);
      localStorage.setItem('grainchain_user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'MetaMask login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grainchain_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithMetaMask,
        logout,
        connectWallet,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}