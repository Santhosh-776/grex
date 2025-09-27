import { NextResponse, NextRequest } from "next/server";
import { createTeam } from "@/services/teamServices";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newTeam = await createTeam(body);
        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json(
            { error: "Failed to create team" },
            { status: 500 }
        );
    }
}
