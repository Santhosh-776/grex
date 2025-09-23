import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { verifyPassword } from "@/utils/hash";
import { findUserByEmail } from "@/services/userServices";
import { createAuthToken } from "@/utils/jwt";

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    rememberMe: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const parseResult = loginSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                {
                    message: "Invalid input",
                    errors: z.treeifyError(parseResult.error),
                },
                { status: 400 }
            );
        }

        const data = parseResult.data;

        const user = await findUserByEmail(data.email);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 401 }
            );
        }

        const isValidPassword = await verifyPassword(
            data.password,
            user.hashedPassword
        );
        if (!isValidPassword) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }
        const tokenPayload = {
            id: user.id,
            email: user.email,
            rememberMe: data.rememberMe || false,
        };
        const token = createAuthToken(tokenPayload);
        const response = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );
        response.cookies.set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: data.rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60,
            path: "/",
        });
        return response;
    } catch (error) {
        console.error("Login route error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: String(error) },
            { status: 500 }
        );
    }
}
