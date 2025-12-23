import { teamRequestSchema } from "@/schemas/team";
import { AcceptInviteLink } from "@/services/teamServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = teamRequestSchema.safeParse(body);
        if (!parsed.success) {
            console.log("Invalid LInk");
            return NextResponse.json(
                {
                    data: "Invalid link",
                    success: false,
                },
                {
                    status: 500,
                }
            );
        }
        const { token, userId } = parsed.data;
        if (token && userId) {
            const data = await AcceptInviteLink(token, userId);

            if (data.success) {
                console.log(data);
                return NextResponse.json({ data });
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                data: "Error while joining",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
