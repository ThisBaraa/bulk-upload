"use client";


import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

export default function BoookingPage() {

    return (
        <DashboardLayout currentPath="/book">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Bookings</h1>
                    <p className="text-muted-foreground mt-1">Manage your bookings</p>
                </div>

                <Input type="file" />

                

                <Card>
                    <CardHeader>
                        <CardTitle>Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>This is a placeholder for the Bookings page content.</p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
} 