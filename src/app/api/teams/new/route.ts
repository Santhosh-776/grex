import { NextRequest, NextResponse } from "next/server";
import { createTeam } from "@/services/teamServices";

export async function POST(request: NextRequest) {
    try {
        const teamData = await request.json();

        console.log("Received team data:", teamData);

        // Validate required fields
        if (!teamData.name || !teamData.createdBy) {
            return NextResponse.json(
                { error: "Name and createdBy are required" },
                { status: 400 }
            );
        }

        const newTeam = await createTeam(teamData);

        return NextResponse.json(
            {
                success: true,
                team: newTeam,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json(
            { error: "Failed to create team" },
            { status: 500 }
        );
    }
}
