
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
  Calendar, 
  Home, 
  LineChart, 
  MessageSquare,
  ScrollText, 
  Droplets,
  History,
  Settings,
  Moon,
  Heart
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const location = useLocation()

  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Cycle History",
      url: "/history",
      icon: History,
    },
    {
      title: "Symptoms",
      url: "/symptoms",
      icon: Droplets,
    },
    {
      title: "Mood",
      url: "/mood",
      icon: Moon,
    },
    {
      title: "Health",
      url: "/health",
      icon: Heart,
    },
    {
      title: "Insights",
      url: "/insights",
      icon: LineChart,
    },
    {
      title: "Resources",
      url: "/resources",
      icon: ScrollText,
    },
    {
      title: "Ask PeriodPal",
      url: "/chat",
      icon: MessageSquare,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <Link to="/" className="flex items-center space-x-2">
          <Droplets className="h-6 w-6 text-periodpal-primary" />
          <span className="text-xl font-display font-semibold text-periodpal-primary">PeriodPal</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" asChild className="w-full">
          <Link to="/settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="lg:hidden flex justify-end mb-4">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
