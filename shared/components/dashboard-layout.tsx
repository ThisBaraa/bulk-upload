/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/shared/utils"
import {
    LayoutDashboard,
    Search,
    LayoutTemplate,
    LucideIcon
} from "lucide-react";
import { Footer } from "./footer";

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

    return (
        <>
        <div className="flex h-screen overflow-hidden relative">
            {/* Sidebar */}
            <aside className="w-64 border-r h-full flex flex-col">
                {/* Logo */}
                <div className="p-4 border-b flex justify-center items-center">
                    <Image 
                        src="/sar-logo.png" 
                        alt="SAR Logo" 
                        width={120} 
                        height={40} 
                        className="object-contain"
                    />
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

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto flex flex-col min-h-screen">
                <main className="flex-1 p-6 pb-6">
                    {children}
                </main>
                <Footer />
            </div>
            
            {/* Version indicator (fixed at bottom right) */}
            {/* {buildNumber && (
                <div className="absolute bottom-2 right-4">
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                        {buildNumber}
                    </span>
                </div>
            )} */}
        </div>
        </>
    );
} 