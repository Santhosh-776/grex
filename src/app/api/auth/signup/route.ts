import { NextResponse, NextRequest } from "next/server";
import { createUser } from "@/services/authServices";
import { hashPassword } from "@/utils/hash";
import { findUserByEmail } from "@/services/userServices";
import { z } from "zod";

const signupSchema = z.object({
    email: z.email(),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    profileImage: z.union([z.url(), z.literal("")]).optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const parseResult = signupSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                {
                    message: "Invalid input",
                    errors: z.treeifyError(parseResult.error),
                },
                { status: 400 }
            );
        }

        const { email, name, profileImage, password } = parseResult.data;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }
        const { success, error, hashedPassword } = await hashPassword(password);
        if (!success || !hashedPassword) {
            return NextResponse.json(
                { message: error || "Password hashing failed" },
                { status: 500 }
            );
        }

        const newUser = await createUser({
            email,
            name,
            profileImage,
            hashedPassword,
        });

        return NextResponse.json(
            { message: "User created successfully", user: newUser },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error in signup route:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
