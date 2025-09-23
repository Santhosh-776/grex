import { prisma } from "@/lib/prisma";

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            hashedPassword: true,
            profileImage: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function findUserById(userId: string) {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function getUserRoles(userId: string) {
    const teamMemberships = await prisma.teamMember.findMany({
        where: { userId },
        include: {
            team: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    const ownedTeams = await prisma.team.findMany({
        where: { userId },
        select: {
            id: true,
            name: true,
            createdAt: true,
        },
    });

    return {
        memberships: teamMemberships,
        ownedTeams,
    };
}

export const getUserProfile = async (userId: string) => {
    try {
        const user = await findUserById(userId);
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};
