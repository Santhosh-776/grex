import { prisma } from "@/lib/prisma";
import { findUserById } from "./userServices";

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
