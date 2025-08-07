import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Users,
  Wallet,
  QrCode,
  BarChart3,
  Activity,
  Shield,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "User Management",
    url: "#users",
    icon: Users,
    description: "Manage users and permissions"
  },
  {
    title: "Wallet & Blockchain",
    url: "#wallet",
    icon: Wallet,
    description: "Blockchain connections"
  },
  {
    title: "QR Identity",
    url: "#qr",
    icon: QrCode,
    description: "Generate QR codes"
  },
  {
    title: "Analytics",
    url: "#analytics",
    icon: BarChart3,
    description: "Platform insights"
  },
  {
    title: "Activity Feed",
    url: "#activity",
    icon: Activity,
    description: "Audit logs"
  },
  {
    title: "Access Control",
    url: "#access",
    icon: Shield,
    description: "Role-based permissions"
  },
];

export function AdminSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentHash = location.hash || "#users";

  const isActive = (url) => currentHash === url;

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-card`}
      collapsible
    >
      <SidebarContent className="bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">GC</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-card-foreground">GrainChain</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className={"sr-only"}>
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.title}</div>
                            <div className="text-xs opacity-70">{item.description}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}