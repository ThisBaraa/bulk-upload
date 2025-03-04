import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.API_KEY || "";
const BASE_URL = process.env.BASE_URL || "";

export async function GET() {
    try {
        const fullUrl = `${BASE_URL}/schedule/routes?sales_channel=OTA`;

        console.log("🔍 Fetching Routes from:", fullUrl);
        console.log("🔑 Using API Key:", API_KEY);

        const response = await axios.get(fullUrl, {
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
            },
        });

        console.log("✅ Routes Data:", response.data);

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("❌ Fetching Routes Failed:", error.response?.data || error.message);

        return NextResponse.json(
            { error: "Failed to fetch routes", details: error?.message },
            { status: 500 }
        );
    }
}
