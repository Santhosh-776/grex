import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ teamId: string }> },
) {
    try {
        const { teamId } = await context.params;
        const response = await axiosInstance.post(
            `/teams/${teamId}/invite`,
            {},
            {
                headers: { cookie: req.headers.get("cookie") || "" },
            },
        );
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message ||
                "Failed to generate invite link";
            return NextResponse.json({ message }, { status });
        }
        return NextResponse.json(
            { message: "Failed to generate invite link" },
            { status: 500 },
        );
    }
}
