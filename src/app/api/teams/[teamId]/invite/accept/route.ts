import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const response = await axiosInstance.post(
            "/teams/invite/accept",
            body,
            {
                headers: { cookie: req.headers.get("cookie") || "" },
            },
        );
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || "Error while joining team";
            return NextResponse.json({ message }, { status });
        }
        return NextResponse.json(
            { message: "Error while joining team" },
            { status: 500 },
        );
    }
}
