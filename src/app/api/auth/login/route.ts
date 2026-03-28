import { NextRequest, NextResponse } from "next/server";

import axiosInstance from "@/lib/axios";
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const redirectTo =
            request.nextUrl.searchParams.get("redirectTo") || "/dashboard";
        const absoluteRedirectUrl = new URL(redirectTo, request.url);
        const res = await axiosInstance.post(`/auth/login`, body);

        const backendUser = res.data.data;

        if (!backendUser) {
            console.error("Unexpected backend response shape:", res.data);
            return NextResponse.json(
                { message: "Invalid backend response" },
                { status: 502 },
            );
        }
        const setCookie = res.headers["set-cookie"];
        const response = NextResponse.json(
            {
                user: {
                    id: backendUser.id,
                    email: backendUser.email,
                    profile: backendUser.profileImage,
                },
                redirect: {
                    url: absoluteRedirectUrl,
                },
            },
            { status: 200 },
        );
        console.log(response.body);
        if (setCookie) {
            response.headers.set("set-cookie", setCookie[0]);
        }
        return response;
    } catch (error) {
        console.error("Login route error:", error);
        return NextResponse.json(
            { message: "Internal server error", error: String(error) },
            { status: 500 },
        );
    }
}
