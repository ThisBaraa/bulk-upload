import axios from "axios";

const API_URL =
    "https://test-auth.worldticket.net/auth/realms/master/protocol/openid-connect/token"; // Replace with actual token endpoint

// Define the expected structure of the API response
interface AuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
}

console.log("API URL:", API_URL);

export const authenticate = async (): Promise<string | null> => {
    try {
        const response = await axios.post<AuthResponse>(
            API_URL,
            new URLSearchParams({
                client_id: "mubasher",
                client_secret: "0f41ae3a-9147-4182-bb62-721868399080",
                grant_type: "password",
                username: "MUBASHER",
                password: "MUBASHER2024",
                scope: "openid",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: false, // Try disabling credentials
            }
        );

        const { access_token } = response.data;

        // Store the token securely (avoid localStorage for security-sensitive data)
        if (typeof window !== "undefined") {
            sessionStorage.setItem("access_token", access_token);
        }

        return access_token;
    } catch (error) {
        console.error("Authentication failed:", error);
        return null;
    }
};
