import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Building2, Wheat, Users, BarChart3, QrCode } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-hero shadow-glow mb-4">
              <Wheat className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
            GrainChain PDS
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Blockchain-powered Public Distribution System ensuring transparent and efficient food grain distribution with real-time tracking and accountability.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-elevated hover:shadow-glow transition-all duration-300 border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">Administrator</CardTitle>
              <CardDescription className="text-muted-foreground">
                Full system control with user management, analytics, and oversight capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>User Management & Role Assignment</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span>System Analytics & Reporting</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <QrCode className="h-4 w-4 text-primary" />
                  <span>QR Code Generation & Identity Management</span>
                </div>
              </div>
              <Button variant="gradient" size="lg" className="w-full" asChild>
                <Link to="/admin/users">Access Admin Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-glow transition-all duration-300 border-secondary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-xl w-fit">
                <Building2 className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl text-secondary">Distribution Center</CardTitle>
              <CardDescription className="text-muted-foreground">
                Frontline operations for food distribution with scanning and inventory management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <QrCode className="h-4 w-4 text-secondary" />
                  <span>QR Code Scanning & Verification</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Wheat className="h-4 w-4 text-secondary" />
                  <span>Inventory Management & Distribution Logging</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BarChart3 className="h-4 w-4 text-secondary" />
                  <span>Performance Tracking & Transaction History</span>
                </div>
              </div>
              <Button variant="secondary" size="lg" className="w-full" asChild>
                <Link to="/distribution/log">Access Distribution Center</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Powered by blockchain technology • MetaMask integration • Real-time analytics
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
