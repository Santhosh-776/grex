import jwt from "jsonwebtoken";

type JwtPayload = {
    id: string;
    email: string;
    rememberMe?: boolean;
};

const secretKey = process.env.SECRET_KEY as string;

export const createAuthToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, secretKey, {
        expiresIn: payload.rememberMe ? "7d" : "1d",
    });
};
