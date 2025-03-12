"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default function TemplatesPage() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    setVersion(process.env.VER || "undefined");
  }, []);

  return (
    <DashboardLayout currentPath="/templates" versionNumber={version}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground mt-1">Manage your available templates</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a placeholder for the Templates page content.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 