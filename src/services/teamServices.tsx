import { prisma } from "@/lib/prisma";
import { Team } from "@/types";

export const createTeam = async (teamData: Team) => {
    const newTeam = await prisma.team.create({
        data: {
            name: teamData.name,
            createdBy: { connect: { id: teamData.createdBy.id } },
            members: { connect: { id: teamData.createdBy.id } },
        },
        include: {
            createdBy: true,
            members: true,
        },
    });
    return newTeam;
};
