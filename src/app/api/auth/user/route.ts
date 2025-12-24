import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/utils/jwt";
import { findUserById } from "@/services/userServices";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token")?.value;
    if (!authToken) {
        return NextResponse.json(
            { message: "No auth token found" },
            { status: 401 }
        );
    }
    try {
        const payload = await verifyAuthToken(authToken);

        if (!payload?.id) {
            const res = NextResponse.json(
                { message: "Invalid auth token" },
                { status: 401 }
            );
            res.cookies.delete("auth-token");
            return res;
        }

        const user = await findUserById(payload.id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        const res = NextResponse.json(
            { message: "Invalid auth token", error },
            { status: 401 }
        );
        res.cookies.delete("auth-token");
        return res;
    }
}
