import { NextRequest, NextResponse } from "next/server";
import * as ftp from "basic-ftp";
import { Readable } from "stream";

// FTP server configuration
const FTP_CONFIG = {
  host: process.env.FTP_HOST || "ftp.worldticket.net",
  port: parseInt(process.env.FTP_PORT || "22"),
  user: process.env.FTP_USER || "sar-mubasher",
  password: process.env.FTP_PASSWORD || "6PuQ8ls02tgeJkVk",
  remoteDir: process.env.FTP_REMOTE_DIR || "/bulk-upload"
};

// Convert Buffer to Readable Stream
function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
} 

export async function POST(request: NextRequest) {
  try {
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

    // Get file buffer and convert to stream
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileStream = bufferToStream(fileBuffer);

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
      
      // Upload file from stream
      await client.uploadFrom(fileStream, file.name);
      
      console.log("File uploaded successfully");
      
      return NextResponse.json({
        success: true,
        message: "File uploaded successfully",
        filename: file.name
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