import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ teamId: string }> }
) {
    try {
        const { teamId } = await context.params;
        const response = await axiosInstance.delete(`/teams/${teamId}`, {
            headers: { cookie: req.headers.get("cookie") || "" },
        });
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || "Failed to delete team";
            return NextResponse.json({ message }, { status });
        }
        return NextResponse.json({ message: "Failed to delete team" }, { status: 500 });
    }
}
