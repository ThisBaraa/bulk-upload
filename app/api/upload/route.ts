import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import * as ftp from "basic-ftp";
import { v4 as uuidv4 } from "uuid";

// FTP server configuration
const FTP_CONFIG = {
  host: process.env.FTP_HOST || "45.9.191.170",
  port: parseInt(process.env.FTP_PORT || "21"),
  user: process.env.FTP_USER || "jasper",
  password: process.env.FTP_PASSWORD || "yH5yNDC3FJd47SCt",
  remoteDir: process.env.FTP_REMOTE_DIR || "/uploads"
};

// Temporary upload directory
const UPLOAD_DIR = join(process.cwd(), "temp-uploads");

export async function POST(request: NextRequest) {
  try {
    // Create upload directory if it doesn't exist
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (err) {
      console.error("Error creating upload directory:", err);
    }

    // Get file from form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Validate file
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith(".csv")) {
      return NextResponse.json(
        { error: "Only CSV files are allowed" },
        { status: 400 }
      );
    }

    // Generate unique filename to prevent collisions
    const fileExt = file.name.split(".").pop();
    const uniqueFilename = `${uuidv4()}.${fileExt}`;
    const originalFilename = file.name;
    
    // Save file locally
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const localFilePath = join(UPLOAD_DIR, uniqueFilename);
    
    await writeFile(localFilePath, buffer);
    console.log(`File saved locally at ${localFilePath}`);

    // Upload to FTP server
    const client = new ftp.Client();
    client.ftp.verbose = process.env.NODE_ENV === "development";
    
    try {
      await client.access({
        host: FTP_CONFIG.host,
        port: FTP_CONFIG.port,
        user: FTP_CONFIG.user,
        password: FTP_CONFIG.password,
        secure: false
      });
      
      console.log("Connected to FTP server");
      
      // Ensure remote directory exists
      try {
        await client.ensureDir(FTP_CONFIG.remoteDir);
      } catch (err) {
        console.error("Error ensuring remote directory exists:", err);
        // Try to create it
        await client.send(`MKD ${FTP_CONFIG.remoteDir}`);
        await client.cd(FTP_CONFIG.remoteDir);
      }
      
      // Upload file
      console.log(`Uploading ${localFilePath} to ${FTP_CONFIG.remoteDir}/${originalFilename}`);
      await client.uploadFrom(localFilePath, `${originalFilename}`);
      
      console.log("File uploaded successfully");
      
      return NextResponse.json({
        success: true,
        message: "File uploaded successfully",
        filename: originalFilename
      });
    } catch (ftpError: unknown) {
      console.error('FTP error:', ftpError);
      return NextResponse.json(
        { error: `FTP error: ${ftpError instanceof Error ? ftpError.message : 'Unknown FTP error'}` },
        { status: 500 }
      );
    } finally {
      client.close();
    }
  } catch (error: unknown) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 