import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        await axiosInstance.post(
            "/auth/logout",
            {},
            {
                headers: {
                    Cookie: `auth-token=${authToken}`,
                },
            },
        );

        const response = NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 },
        );
        response.cookies.delete("auth-token");
        return response;
    } catch (error: unknown) {
        const response = NextResponse.json(
            { message: "Logged out" },
            { status: 200 },
        );
        response.cookies.delete("auth-token");
        return response;
    }
}
