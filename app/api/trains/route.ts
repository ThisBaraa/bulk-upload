import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "";
const API_KEY = process.env.API_KEY || "";

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
        });

        console.log("✅ Low Fare Search Response:", response.data);
        return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("❌ Low Fare Search Failed:", error.response?.data || error.message);
        return NextResponse.json(
            { error: "Low Fare Search request failed", details: error?.message },
            { status: 500 }
        );
    }
}
