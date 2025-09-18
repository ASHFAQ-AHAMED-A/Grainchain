import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Users, 
  Wallet, 
  QrCode, 
  BarChart3, 
  Activity, 
  Shield,
  Package,
  ScanLine,
  Archive,
  History,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserRole } from '@/contexts/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userRole: UserRole;
}

const adminMenuItems = [
  { icon: Users, label: 'User Management', path: '/dashboard/users' },
  { icon: Wallet, label: 'Wallet & Blockchain', path: '/dashboard/wallet' },
  { icon: QrCode, label: 'QR Code Generation', path: '/dashboard/qr-codes' },
  { icon: BarChart3, label: 'Platform Analytics', path: '/dashboard/analytics' },
  { icon: Activity, label: 'Activity Feed', path: '/dashboard/activity' },
];

const distributionMenuItems = [
  { icon: Package, label: 'New Distribution', path: '/dashboard/distribution' },
  { icon: ScanLine, label: 'QR Scanner', path: '/dashboard/scanner' },
  { icon: Archive, label: 'Inventory Balance', path: '/dashboard/inventory' },
  { icon: History, label: 'Transaction History', path: '/dashboard/transactions' },
  { icon: Wallet, label: 'Wallet Status', path: '/dashboard/wallet' },
  { icon: TrendingUp, label: 'Performance Overview', path: '/dashboard/performance' },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse, userRole }) => {
  const location = useLocation();
  const menuItems = userRole === 'admin' ? adminMenuItems : distributionMenuItems;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-card border-r border-border glow-card relative flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center animate-glow">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">GrainChain PDS</h2>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole.replace('-', ' ')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="ml-auto p-2 hover:bg-muted/50 transition-smooth"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg glow-primary"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-all",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-0 w-1 h-8 bg-primary rounded-l-full"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-muted-foreground text-center"
            >
              <p>GrainChain PDS v1.0</p>
              <p>Blockchain Distribution</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Sidebar;