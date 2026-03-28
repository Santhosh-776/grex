import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ teamId: string; memberId: string }> }
) {
    try {
        const { teamId, memberId } = await context.params;
        const body = await req.json();
        const response = await axiosInstance.patch(
            `/teams/${teamId}/members/${memberId}/role`,
            body,
            { headers: { cookie: req.headers.get("cookie") || "" } }
        );
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || "Failed to update member role";
            return NextResponse.json({ message }, { status });
        }
        return NextResponse.json({ message: "Failed to update member role" }, { status: 500 });
    }
}
