/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { AlertCircle, FileUp, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { toast } from "sonner";

export default function FileUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setError(null);
        setSuccess(false);

        if (!selectedFile) {
            setFile(null);
            return;
        }

        // Validate file type
        if (!selectedFile.name.endsWith('.csv')) {
            setError('Only CSV files are allowed');
            setFile(null);
            return;
        }

        setFile(selectedFile);
        toast.success(`"${selectedFile.name}" (${(selectedFile.size / 1024).toFixed(2)} KB)`);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to upload file');
            }

            setSuccess(true);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            toast.success("Upload successful", {
                description: "Your CSV file has been transferred to the FTP server.",
            });
        } catch (err: any) {
            setError(err.message || 'An error occurred during upload');
            toast.error(err.message || 'An error occurred during upload');
        } finally {
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setError(null);
        setSuccess(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <DashboardLayout currentPath="/upload">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Bulk Upload</h1>
                    <p className="text-muted-foreground mt-1">Bulk upload your bookings from a CSV file</p>
                </div>
                <div className="container mx-auto px-4 py-8">

                    <Card className="p-6">
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                                    Select CSV File
                                </Label>
                                <Input
                                    ref={fileInputRef}
                                    id="file-upload"
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Only CSV files are accepted. Maximum file size: 10MB.
                                </p>
                            </div>

                            {error && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {success && (
                                <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        File successfully uploaded and transferred to the FTP server.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={handleUpload}
                                    disabled={!file || isUploading}
                                    className="flex items-center"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload to FTP'}
                                    {!isUploading && <FileUp className="ml-2 h-4 w-4" />}
                                </Button>

                                {file && (
                                    <Button
                                        variant="outline"
                                        onClick={handleReset}
                                        disabled={isUploading}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </div>

                            {file && (
                                <div className="text-sm text-gray-600">
                                    Selected file: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
} 