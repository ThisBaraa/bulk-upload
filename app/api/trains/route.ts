import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "";
const API_KEY = process.env.API_KEY || "";

export const maxDuration = 60; // Set max duration to 60 seconds for Vercel

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("🔍 Request Sent to API:", JSON.stringify(body, null, 2));

        const fullUrl = `${BASE_URL}/ota/v2015b/OTA`;

        const response = await axios.post(fullUrl, body, {
            headers: {
                "x-api-key": API_KEY,
                "local-name": "OTA_AirLowFareSearchRQ",
                "Content-Type": "application/json",
            },
            timeout: 55000, // 55 second timeout for axios
        });

        console.log("✅ Low Fare Search Response:", response.data);
        return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("❌ Low Fare Search Failed:", error.response?.data || error.message);
        
        // Check if it's a timeout error
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            return NextResponse.json(
                { error: "The request to the train service timed out. Please try again later." },
                { status: 504 }
            );
        }
        
        return NextResponse.json(
            { error: "Low Fare Search request failed", details: error?.message },
            { status: 500 }
        );
    }
}
