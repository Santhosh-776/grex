import { NextRequest, NextResponse } from "next/server";
import { getAllTeams } from "@/services/teamServices";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({
            success: false,
            data: "Please log in",
        });
    }

    try {
        const teams = await getAllTeams(userId);
        return NextResponse.json(
            {
                success: true,
                data: teams,
            },
            { status: 201 }
        );
    } catch (err) {
        console.log("Failed to fetch teams");
        NextResponse.json(
            {
                success: false,
                error: "Failed to fetch teams",
            },
            {
                status: 500,
            }
        );
    }
}
