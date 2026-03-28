import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const response = await axiosInstance.post("/teams", body, {
            headers: { cookie: req.headers.get("cookie") || "" },
        });
        return NextResponse.json(response.data, { status: 201 });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || "Failed to create team";
            return NextResponse.json({ message }, { status });
        }
        return NextResponse.json(
            { message: "Failed to create team" },
            { status: 500 },
        );
    }
}
