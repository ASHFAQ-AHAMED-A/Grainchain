import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "react-hot-toast";
import { Shield, Building2 } from "lucide-react";

export default function Layout({ children, userRole }) {
  return (
    <SidebarProvider collapsedWidth={56}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      
      <header className="h-16 flex items-center justify-between px-4 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-sidebar-foreground hover:text-sidebar-primary-foreground" />
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              {userRole === 'admin' ? (
                <Shield className="h-5 w-5 text-primary" />
              ) : (
                <Building2 className="h-5 w-5 text-secondary" />
              )}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">
                GrainChain PDS
              </h1>
              <p className="text-sm text-sidebar-foreground/70">
                {userRole === 'admin' ? 'Administrative Dashboard' : 'Distribution Center'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="status-indicator status-online"></div>
          <span className="text-sm text-sidebar-foreground/70">System Online</span>
        </div>
      </header>

      <div className="flex min-h-screen w-full">
        <AppSidebar userRole={userRole} />
        <main className="flex-1 bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}