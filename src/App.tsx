import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

// Admin Pages
import UserManagement from "./pages/admin/UserManagement";
import WalletBlockchain from "./pages/admin/WalletBlockchain";
import QRCodeGeneration from "./pages/admin/QRCodeGeneration";
import PlatformAnalytics from "./pages/admin/PlatformAnalytics";
import ActivityFeed from "./pages/admin/ActivityFeed";

// Distribution Center Pages
import NewDistribution from "./pages/distribution/NewDistribution";
import QRScanner from "./pages/distribution/QRScanner";
import InventoryBalance from "./pages/distribution/InventoryBalance";
import TransactionHistory from "./pages/distribution/TransactionHistory";
import PerformanceOverview from "./pages/distribution/PerformanceOverview";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  const defaultPath = user.role === 'admin' ? '/dashboard/users' : '/dashboard/distribution';
  return <Navigate to={defaultPath} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardRedirect />} />
              
              {/* Admin Routes */}
              <Route path="users" element={<UserManagement />} />
              <Route path="wallet" element={<WalletBlockchain />} />
              <Route path="qr-codes" element={<QRCodeGeneration />} />
              <Route path="analytics" element={<PlatformAnalytics />} />
              <Route path="activity" element={<ActivityFeed />} />
              
              {/* Distribution Center Routes */}
              <Route path="distribution" element={<NewDistribution />} />
              <Route path="scanner" element={<QRScanner />} />
              <Route path="inventory" element={<InventoryBalance />} />
              <Route path="transactions" element={<TransactionHistory />} />
              <Route path="performance" element={<PerformanceOverview />} />
            </Route>
            
            <Route path="/" index element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;