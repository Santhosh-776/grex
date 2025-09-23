import { prisma } from "@/lib/prisma";
import { CreateUserData, LoginData } from "@/types/auth";
import { findUserByEmail, findUserById, getUserRoles } from "./userServices";
import { verifyPassword } from "@/utils/hash";
import { createAuthToken } from "@/utils/jwt";

export const createUser = async (userData: CreateUserData) => {
    try {
        const createdUser = prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                hashedPassword: userData.hashedPassword,
                profileImage: userData.profileImage || null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
                createdAt: true,
            },
        });

        return createdUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const authenticateUser = async (data: LoginData) => {
    try {
        const user = await findUserByEmail(data.email);
        if (!user) {
            return null;
        }

        const isValidPassword = await verifyPassword(
            data.password,
            user.hashedPassword
        );
        if (!isValidPassword) {
            return null;
        }
        const roles = await getUserRoles(user.id);
        const tokenPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            rememberMe: data.rememberMe || false,
        };
        const token = createAuthToken(tokenPayload);
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
            },
        };
    } catch (error) {
        console.error("Error authenticating user:", error);
        return null;
    }
};
