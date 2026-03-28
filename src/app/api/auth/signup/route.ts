import { NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await axiosInstance.post(`/auth/signup`, body);

        return NextResponse.json(res.data, { status: res.status });
    } catch (error: unknown) {
        console.error(
            "Signup proxy error:",
            (error as any)?.message ?? error,
            (error as any)?.response?.data,
        );

        const status = (error as any)?.response?.status || 500;
        const data = (error as any)?.response?.data || {
            message: (error as any)?.message || "Internal Server Error",
        };

        return NextResponse.json(data, { status });
    }
}
