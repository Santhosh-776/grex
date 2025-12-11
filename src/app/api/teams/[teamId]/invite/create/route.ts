import { NextRequest, NextResponse } from "next/server";
import { teamRequestSchema } from "@/schemas/team";
import { generateInviteLink } from "@/services/teamServices";

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ teamId: string }> }
) {
    try {
        const { teamId } = await context.params;

        const parsed = teamRequestSchema.safeParse({ teamId });
        if (!parsed.success) {
            return NextResponse.json(
                { success: false, data: "Invalid teamId" },
                { status: 400 }
            );
        }

        // Generate link
        const inviteLink = await generateInviteLink(teamId);

        return NextResponse.json(
            { success: true, data: inviteLink },
            { status: 200 }
        );
    } catch (err) {
        console.error("Invite API Error:", err);
        return NextResponse.json(
            { success: false, data: "Failed to generate invite link" },
            { status: 500 }
        );
    }
}
