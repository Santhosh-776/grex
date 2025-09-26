import { SignJWT } from "jose";

type JwtPayload = {
    id: string;
    email: string;
    rememberMe?: boolean;
};

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const createAuthToken = async (payload: JwtPayload): Promise<string> => {
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.rememberMe ? "7d" : "1d")
        .sign(secretKey);
    return jwt;
};
