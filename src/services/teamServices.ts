import { prisma } from "@/lib/prisma";
import { findUserById } from "./userServices";
import { nanoid } from "nanoid";

export interface Team {
    name: string;
    description?: string;
    createdBy: string;
}

export const createTeam = async (teamData: Team) => {
    console.log("Creating team with data:", teamData);

    const user = await findUserById(teamData.createdBy);

    if (!user) {
        throw new Error(`User with ID ${teamData.createdBy} not found`);
    }

    const newTeam = await prisma.team.create({
        data: {
            name: teamData.name,
            description: teamData.description,
            createdBy: {
                connect: { id: teamData.createdBy },
            },
            members: {
                create: {
                    user: { connect: { id: teamData.createdBy } },
                    role: "ADMIN",
                },
            },
        },
        include: {
            createdBy: true,
            members: {
                include: {
                    user: true,
                },
            },
        },
    });

    return newTeam;
};

export const getAllTeams = async (userId: string) => {
    return prisma.team.findMany({
        where: {
            members: {
                some: { userId },
            },
        },
        include: {
            members: {
                include: { user: true },
            },
        },
    });
};

export const generateInviteLink = async (teamId: string) => {
    const token = nanoid(24);
    await prisma.invite.create({
        data: {
            token,
            teamId,
            expiresAt: new Date(Date.now() + 86400000), // 24 hours
        },
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/teams/${teamId}/${token}`;

    return url;
};

export const AcceptInviteLink = async (token: string, userId: string) => {
    try {
        const invite = await prisma.invite.findUnique({
            where: { token },
        });

        if (!invite) {
            return { data: "Invalid Token", success: false };
        }

        if (!invite.expiresAt || invite.expiresAt < new Date()) {
            return { success: false, error: "Token expired" };
        }

        const exists = await prisma.teamMember.findUnique({
            where: {
                userId_teamId: {
                    userId,
                    teamId: invite.teamId,
                },
            },
        });

        if (exists) {
            return { success: true, message: "Already a member" };
        }
        await prisma.teamMember.create({
            data: {
                userId,
                teamId: invite.teamId,
                role: "MEMBER",
            },
        });
        return { success: true, message: "Joined the team!" };
    } catch (error) {
        return { success: false, error: "Something went wrong" };
    }
};

export const deleteMember = async (memberId: string) => {
    await prisma.teamMember.delete({
        where: {
            id: memberId,
        },
    });

    return { message: "Member removed successfully" };
};
