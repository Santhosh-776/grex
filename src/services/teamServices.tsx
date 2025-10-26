import { prisma } from "@/lib/prisma";

export interface Team {
    name: string;
    description?: string;
    createdBy: string; // This should be the user ID
}

export const createTeam = async (teamData: Team) => {
    console.log("Creating team with data:", teamData);

    // Validate that createdBy is a valid user ID
    const user = await prisma.user.findUnique({
        where: { id: teamData.createdBy },
    });

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
                connect: { id: teamData.createdBy }, // Add creator as a member
            },
        },
        include: {
            createdBy: true,
            members: true,
        },
    });

    return newTeam;
};
