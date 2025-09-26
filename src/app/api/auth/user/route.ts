import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { findUserById } from "@/services/userServices";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token")?.value;
    if (!authToken) {
        return NextResponse.json(
            { message: "No auth token found" },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as any;
        if (!decoded?.id) {
            const res = NextResponse.json(
                { message: "Invalid auth token" },
                { status: 401 }
            );
            res.cookies.delete("auth-token");
            return res;
        }

        const user = await findUserById(decoded.id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("JWT verification failed:", error);
        const res = NextResponse.json(
            { message: "Invalid auth token" },
            { status: 401 }
        );
        res.cookies.delete("auth-token");
        return res;
    }
}
