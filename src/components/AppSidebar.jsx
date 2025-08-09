import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Users, Wallet, QrCode, BarChart3, Activity, Shield,
  Package, ScanLine, Package2, History, CreditCard, TrendingUp,
  ChevronDown, ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const adminItems = [
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Wallet Connection", url: "/admin/wallet", icon: Wallet },
  { title: "QR Generation", url: "/admin/qr", icon: QrCode },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Activity Feed", url: "/admin/activity", icon: Activity },
  { title: "Access Control", url: "/admin/access", icon: Shield },
];

const distributionItems = [
  { title: "Log Distribution", url: "/distribution/log", icon: Package },
  { title: "QR Scanner", url: "/distribution/scanner", icon: ScanLine },
  { title: "Inventory", url: "/distribution/inventory", icon: Package2 },
  { title: "Transaction History", url: "/distribution/history", icon: History },
  { title: "Wallet Status", url: "/distribution/wallet", icon: CreditCard },
  { title: "Performance", url: "/distribution/performance", icon: TrendingUp },
];

export function AppSidebar({ userRole }) {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = userRole === 'admin' ? adminItems : distributionItems;
  const isExpanded = items.some((i) => currentPath === i.url);

  const getNavCls = ({ isActive }) =>
    isActive 
      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-glow" 
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} bg-sidebar border-r border-sidebar-border`}
      collapsible
    >
      <SidebarContent className="bg-sidebar">
        <SidebarGroup open={isExpanded}>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium">
            {userRole === 'admin' ? 'Administration' : 'Distribution Center'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {userRole === 'admin' ? 'A' : 'D'}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">
                  {userRole === 'admin' ? 'Administrator' : 'Distribution Center'}
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  0x...1234
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}