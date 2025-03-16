/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";

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
                    "local-name" : "elm",
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
