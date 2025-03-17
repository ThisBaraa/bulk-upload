/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/shared/utils"
import {
    LayoutDashboard,
    Search,
    LayoutTemplate,
    LucideIcon,
    Menu,
    X
} from "lucide-react";
import { Footer } from "./footer";
import { Button } from "./ui/button";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
    return (
        <Link href={href}>
            <div
                className={cn(
                    "flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors",
                    active && "bg-accent/50"
                )}
            >
                <Icon size={20} className={cn("text-muted-foreground", active && "text-primary")} />
                <span className={cn("text-muted-foreground", active && "text-primary font-medium")}>
                    {label}
                </span>
            </div>
        </Link>
    );
};

interface DashboardLayoutProps {
    children: React.ReactNode;
    currentPath?: string;
    buildNumber?: string | null;
}

export function DashboardLayout({ children, currentPath = "/", buildNumber }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const sidebarItems = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            href: "/",
        },
        {
            icon: Search,
            label: "Search for a Train",
            href: "/search",
        },
        {
            icon: LayoutTemplate,
            label: "Templates",
            href: "/templates",
        },
    ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Mobile header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b bg-background">
                <div className="flex items-center">
                    <Image 
                        src="/sar-logo.png" 
                        alt="SAR Logo" 
                        width={80} 
                        height={30} 
                        className="object-contain"
                    />
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="md:hidden"
                >
                    <Menu className={cn(sidebarOpen ? "hidden" : "block")} />
                    <X className={cn(!sidebarOpen ? "hidden" : "block")} />
                </Button>
            </div>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={cn(
                    "border-r flex flex-col bg-background",
                    "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0",
                    "w-64 md:w-64",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    {/* Logo (hidden on mobile) */}
                    <div className="hidden md:flex p-4 border-b justify-center items-center">
                        <Image 
                            src="/sar-logo.png" 
                            alt="SAR Logo" 
                            width={120} 
                            height={40} 
                            className="object-contain"
                        />
                    </div>

                    {/* Close button for mobile */}
                    <div className="md:hidden flex justify-end p-2">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={toggleSidebar}
                            className="ml-auto"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <div className="space-y-1">
                            {sidebarItems.map((item) => (
                                <SidebarItem
                                    key={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                    href={item.href}
                                    active={currentPath === item.href}
                                />
                            ))}
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs font-medium text-black">AB</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Albaraa Bukhari</p>
                                <p className="text-xs text-muted-foreground">Admin</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Dark overlay when mobile menu is open */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                        onClick={toggleSidebar}
                    />
                )}

                {/* Main Content */}
                <div className="flex flex-col flex-1 w-full">
                    <main className="flex-1 p-4 md:p-6 pb-6 overflow-y-auto">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
} 