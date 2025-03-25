/* eslint-disable react/no-unescaped-entities */
'use client';

import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { Card } from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

export default function ChangelogPage() {
    return (
        <DashboardLayout currentPath="/changelog">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Changelog</h1>
                    <p className="text-muted-foreground mt-1">
                        Track changes and updates to the application
                    </p>
                </div>

                <Card className="p-6">
                    <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-8">
                            {/* Version 0.13.0 */}
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold">[0.13.0] - 2025-03-18</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-green-600 mb-2">Added</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>New bulk CSV upload feature with FTP server integration</li>
                                            <li>Dedicated upload page with file selection and validation</li>
                                            <li>Real-time feedback during upload process with toast notifications</li>
                                            <li>Secure file transfer to configured FTP server</li>
                                            <li>File type validation to ensure only CSV files are processed</li>
                                            <li>Unique filename generation to prevent file collisions on the server</li>
                                            <li>Error handling with user-friendly error messages</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-blue-600 mb-2">Changed</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Updated navigation sidebar to include new Bulk Upload option</li>
                                            <li>Added Bulk Upload card to dashboard for quick access</li>
                                            <li>Enhanced Quick Actions section with Upload CSV File button</li>
                                            <li>Improved overall application navigation structure</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-red-600 mb-2">Fixed</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Proper error handling for FTP connection failures</li>
                                            <li>Added type safety throughout the upload process</li>
                                            <li>Ensured consistent UI feedback during the entire upload workflow</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Version 0.12.0 */}
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold">[0.12.0] - 2025-03-17</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-green-600 mb-2">Added</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Fully responsive mobile design with hamburger menu and slide-out navigation</li>
                                            <li>Sticky footer that's always visible on mobile devices</li>
                                            <li>Mobile-optimized card layouts with appropriate spacing</li>
                                            <li>Conditional rendering for business class seats based on availability</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-blue-600 mb-2">Changed</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Redesigned dashboard layout for better mobile compatibility</li>
                                            <li>Improved form layout for better touch interaction on small screens</li>
                                            <li>Enhanced train card UI to stack vertically on mobile devices</li>
                                            <li>Adjusted spacing and typography for better mobile readability</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-red-600 mb-2">Fixed</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Fixed footer visibility issues on mobile devices</li>
                                            <li>Corrected conditional rendering in train cards</li>
                                            <li>Improved dark mode support for various UI elements</li>
                                            <li>Enhanced skeleton loaders for better mobile appearance</li>
                                            <li>Optimized layout to prevent overflow issues on small screens</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Version 0.11.0 */}
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold">[0.11.0] - 2025-03-16</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-green-600 mb-2">Added</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Enhanced train card display with improved visual design</li>
                                            <li>Redesigned seat availability display with colored indicators</li>
                                            <li>Added skeleton loading states that match the card design</li>
                                            <li>Implemented loading placeholders during data fetching</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-blue-600 mb-2">Changed</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Improved train search results layout with 60-40 split design</li>
                                            <li>Enhanced visual hierarchy for time and station information</li>
                                            <li>Updated the seat availability section with better organization</li>
                                            <li>Optimized the UI for better readability and user experience</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-purple-600 mb-2">Improved</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Better visual separation between train information and seat availability</li>
                                            <li>Enhanced typography with improved font sizes and weights</li>
                                            <li>Added subtle animations and hover effects for interactive elements</li>
                                            <li>Improved dark mode compatibility throughout the application</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </Card>
                <Card className="p-6">
                    <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-8">
                            {/* Version 0.12.0 */}
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold">[0.12.0] - 2025-03-17</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-green-600 mb-2">Added</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Fully responsive mobile design with hamburger menu and slide-out navigation</li>
                                            <li>Sticky footer that's always visible on mobile devices</li>
                                            <li>Mobile-optimized card layouts with appropriate spacing</li>
                                            <li>Conditional rendering for business class seats based on availability</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-blue-600 mb-2">Changed</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Redesigned dashboard layout for better mobile compatibility</li>
                                            <li>Improved form layout for better touch interaction on small screens</li>
                                            <li>Enhanced train card UI to stack vertically on mobile devices</li>
                                            <li>Adjusted spacing and typography for better mobile readability</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-red-600 mb-2">Fixed</h3>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Fixed footer visibility issues on mobile devices</li>
                                            <li>Corrected conditional rendering in train cards</li>
                                            <li>Improved dark mode support for various UI elements</li>
                                            <li>Enhanced skeleton loaders for better mobile appearance</li>
                                            <li>Optimized layout to prevent overflow issues on small screens</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </Card>
            </div>
        </DashboardLayout>
    );
} 