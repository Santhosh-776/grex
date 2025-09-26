import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("auth-token")?.value;

    const protectedRoutes = ["/dashboard", "/profile", "/settings"];
    const authRoutes = ["/login", "/signup"];
    const publicRoutes = ["/", "/about", "/contact"];

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.includes(pathname);

    let isAuthenticated = false;
    let tokenInvalid = false;

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
            const { payload } = await jwtVerify(token, secret);

            isAuthenticated = true;
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error name:", error.name);
                console.log("Error message:", error.message);
            } else {
                console.log("Unknown error:", error);
            }
            tokenInvalid = true;
        }
    }

    if (tokenInvalid) {
        const response = isProtectedRoute
            ? NextResponse.redirect(new URL("/login", request.url))
            : NextResponse.next();

        // Properly clear the cookie
        response.cookies.set("auth-token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
            path: "/",
        });

        return response;
    }

    // Redirect logic for valid/no token cases
    if (isProtectedRoute && !isAuthenticated) {
        console.log(
            "Redirecting to login - no valid token for protected route"
        );
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthRoute && isAuthenticated) {
        console.log("Redirecting to dashboard - already authenticated");
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
