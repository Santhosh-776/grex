import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        const response = await axiosInstance.get("/auth/me", {
            headers: {
                Cookie: `auth-token=${authToken}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const status = (error as any).response?.status || 500;
        const message =
            (error as any).response?.data?.message || "Internal server error";

        const res = NextResponse.json({ message }, { status });

        if (status === 401) {
            res.cookies.delete("auth-token");
        }

        return res;
    }
}
