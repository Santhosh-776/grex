import { NextRequest, NextResponse } from "next/server";
import { deleteMember } from "@/services/teamServices";
import { teamRequestSchema } from "@/schemas/team";

export async function DELETE({
    params,
}: {
    params: { teamId: string; memberId: string };
}) {
    const parsed = teamRequestSchema.safeParse(params);
    if (!parsed.success) {
        return NextResponse.json(
            { message: `Invalid request${parsed}`, success: false },
            { status: 400 }
        );
    }

    const { memberId } = parsed.data;
    console.log(memberId);
    if (!memberId) {
        return NextResponse.json({
            success: false,
        });
    }
    try {
        const data = await deleteMember(memberId);

        return NextResponse.json({ data, success: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "Failed to delete member", success: false },
            { status: 500 }
        );
    }
}
