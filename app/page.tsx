/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Book,
  LayoutTemplate,
  Search,
  Settings,
  Users,
  Wrench,
  Upload,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function Home() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    setVersion(process.env.VER || "undefined");
  }, []);
  // Dashboard cards data
  const dashboardCards = [
    {
      title: "Trains",
      icon: Search,
      description: "Search for available trains",
      href: "/search",
      color: "bg-gradient-to-br from-blue-900 to-indigo-900",
      iconColor: "text-blue-1000",
    },
    {
      title: "Bookings",
      icon: Book,
      description: "View and manage your bookings",
      href: "/bookings",
      color: "bg-gradient-to-br from-purple-900 to-indigo-900",
      iconColor: "text-purple-1000",
    },
    {
      title: "Bulk Upload",
      icon: Upload,
      description: "Upload CSV files to FTP server",
      href: "/upload",
      color: "bg-gradient-to-br from-amber-900 to-orange-900",
      iconColor: "text-amber-1000",
    },
    {
      title: "Settings",
      icon: Settings,
      description: "Configure system settings",
      href: "/settings",
      color: "bg-gradient-to-br from-green-900 to-emerald-900",
      iconColor: "text-green-1000",
    },
  ];

  return (
    <DashboardLayout currentPath="/" buildNumber={version}>
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Hello Albaraa!</h1>
          <p className="text-muted-foreground mt-1">
            How can I help you today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {dashboardCards.map((card, index) => (
            <Link href={card.href} key={index}>
              <Card
                className={`h-full ${card.color} border-none hover:shadow-md transition-shadow cursor-pointer`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                    <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    View
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/search">Search for a Train</Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/upload">Upload CSV File</Link>
                </Button>
                <Button variant="outline" className="justify-start">
                  Generate Report
                </Button>
                <Button variant="outline" className="justify-start">
                  View Schedule
                </Button>
                <Button variant="outline" className="justify-start">
                  Manage Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
