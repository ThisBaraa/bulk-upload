import { NextResponse } from "next/server";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://test-auth.worldticket.net/auth/realms/master/protocol/openid-connect/token";
// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "mubasher";
// const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET || "0f41ae3a-9147-4182-bb62-721868399080";
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

// export async function POST() {
//     try {
//         console.log("🔍 Sending request to:", API_URL);

//         const response = await axios.post(
//             API_URL,
//             new URLSearchParams({
//                 client_id: CLIENT_ID,
//                 client_secret: CLIENT_SECRET,
//                 grant_type: "password",
//                 username: "MUBASHER",
//                 password: "MUBASHER2024",
//                 scope: "openid",
//             }),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );

//         console.log("✅ API Response:", response.data);
//         return NextResponse.json(response.data);
//     } catch (error: any) {
//         console.error("❌ API Request Failed:", error?.response?.data || error?.message);

//         return NextResponse.json(
//             { error: "Authentication failed", details: error?.message },
//             { status: 500 }
//         );
//     }
// }

export async function POST() {
    try {
        const fullUrl = `${BASE_URL}/auth`; // ❗ Replace with the correct endpoint

        console.log("🔍 API Request:", fullUrl);
        console.log("🔑 Using API Key:", API_KEY);

        const response = await axios.post(
            fullUrl,
            {}, // 🔹 If the API requires a body, add it here
            {
                headers: {
                    "x-api-key": API_KEY,
                    "Content-Type": "application/json",
                    "local-name" : "kuwaitiah",
                },
            }
        );

        console.log("✅ API Response:", response.data);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("❌ API Request Failed:", error?.response?.data || error?.message);
        return NextResponse.json({ error: "API request failed", details: error?.message }, { status: 500 });
    }
}

const API_KEY = process.env.API_KEY || "";
const BASE_URL = process.env.BASE_URL || "";
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET || "";
const USERNAME = process.env.NEXT_PUBLIC_USERNAME || "";
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD || "";

// export async function POST() {
//     try {
//         console.log("🔍 Requesting JWT Token...");

//         const response = await axios.post(
//             AUTH_URL,
//             new URLSearchParams({
//                 grant_type: "password",
//                 client_id: CLIENT_ID,
//                 client_secret: CLIENT_SECRET,
//                 username: USERNAME,
//                 password: PASSWORD,
//             }),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );

//         console.log("✅ JWT Token received:", response.data.access_token);

//         return NextResponse.json(response.data);
//     } catch (error: any) {
//         console.error("❌ Authentication Failed:", error.response?.data || error.message);
//         return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
//     }
// }