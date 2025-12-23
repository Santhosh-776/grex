import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        { message: "Logged out" },
        { status: 200 }
    );
    response.cookies.delete("auth-token");
    return response;
}
