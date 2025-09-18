import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, Wallet, Mail, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useMetaMask } from '@/hooks/useMetaMask';

const Login = () => {
  const { login, loginWithMetaMask, isAuthenticated, isLoading, error } = useAuth();
  const { connect: connectWallet, isInstalled: isMetaMaskInstalled } = useMetaMask();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'metamask'>('email');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      // Error is handled by context
    }
  };

  const handleMetaMaskLogin = async () => {
    try {
      await loginWithMetaMask();
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,theme(colors.primary/10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.blockchain.purple/5),transparent_70%)]" />
      </div>
      
      {/* Floating particles animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{ 
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glow-card border-primary/20 bg-card/80 backdrop-blur-lg">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-glow"
            >
              <Zap className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GrainChain PDS
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Secure Blockchain Distribution System
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Login method selector */}
            <div className="flex space-x-2 p-1 bg-muted/50 rounded-lg">
              <Button
                variant={loginMethod === 'email' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 transition-all"
                onClick={() => setLoginMethod('email')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant={loginMethod === 'metamask' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 transition-all"
                onClick={() => setLoginMethod('metamask')}
                disabled={!isMetaMaskInstalled}
              >
                <Wallet className="w-4 h-4 mr-2" />
                MetaMask
              </Button>
            </div>

            {loginMethod === 'email' ? (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleEmailLogin}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@grainchain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 transition-smooth focus:glow-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="demo123"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 transition-smooth focus:glow-primary"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-smooth glow-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Connect your MetaMask wallet to access the platform
                  </p>
                  
                  {!isMetaMaskInstalled ? (
                    <Alert>
                      <AlertDescription>
                        MetaMask is not installed. Please install MetaMask to continue.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleMetaMaskLogin}
                        className="w-full bg-gradient-primary hover:opacity-90 transition-smooth glow-primary"
                        disabled={isLoading}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        {isLoading ? 'Connecting...' : 'Connect MetaMask'}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="text-center text-sm text-muted-foreground">
              <p>Demo Credentials:</p>
              <p>Email: admin@grainchain.com | center@grainchain.com</p>
              <p>Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;