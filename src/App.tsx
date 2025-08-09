import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminUsers from "./pages/admin/Users";
import AdminWallet from "./pages/admin/Wallet";
import AdminQR from "./pages/admin/QR";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminActivity from "./pages/admin/Activity";
import AdminAccess from "./pages/admin/Access";

// Distribution Pages  
import DistributionLog from "./pages/distribution/Log";
import DistributionScanner from "./pages/distribution/Scanner";
import DistributionInventory from "./pages/distribution/Inventory";
import DistributionHistory from "./pages/distribution/History";
import DistributionWallet from "./pages/distribution/Wallet";
import DistributionPerformance from "./pages/distribution/Performance";

import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin/users" element={<Layout userRole="admin"><AdminUsers /></Layout>} />
          <Route path="/admin/wallet" element={<Layout userRole="admin"><AdminWallet /></Layout>} />
          <Route path="/admin/qr" element={<Layout userRole="admin"><AdminQR /></Layout>} />
          <Route path="/admin/analytics" element={<Layout userRole="admin"><AdminAnalytics /></Layout>} />
          <Route path="/admin/activity" element={<Layout userRole="admin"><AdminActivity /></Layout>} />
          <Route path="/admin/access" element={<Layout userRole="admin"><AdminAccess /></Layout>} />
          
          {/* Distribution Routes */}
          <Route path="/distribution/log" element={<Layout userRole="distribution"><DistributionLog /></Layout>} />
          <Route path="/distribution/scanner" element={<Layout userRole="distribution"><DistributionScanner /></Layout>} />
          <Route path="/distribution/inventory" element={<Layout userRole="distribution"><DistributionInventory /></Layout>} />
          <Route path="/distribution/history" element={<Layout userRole="distribution"><DistributionHistory /></Layout>} />
          <Route path="/distribution/wallet" element={<Layout userRole="distribution"><DistributionWallet /></Layout>} />
          <Route path="/distribution/performance" element={<Layout userRole="distribution"><DistributionPerformance /></Layout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
