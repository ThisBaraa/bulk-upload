import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://test-auth.worldticket.net/auth/realms/master/protocol/openid-connect/token";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "mubasher";
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET || "0f41ae3a-9147-4182-bb62-721868399080";

export async function POST() {
    try {
        console.log("🔍 Sending request to:", API_URL);

        const response = await axios.post(
            API_URL,
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "password",
                username: "MUBASHER",
                password: "MUBASHER2024",
                scope: "openid",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        console.log("✅ API Response:", response.data);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("❌ API Request Failed:", error?.response?.data || error?.message);

        return NextResponse.json(
            { error: "Authentication failed", details: error?.message },
            { status: 500 }
        );
    }
}
