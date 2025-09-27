import { prisma } from "@/lib/prisma";
import { Meeting } from "@/types";

const createMeeting = async (meetingData: Meeting) => {
    try {
        const newMeeting = await prisma.meeting.create({
            data: {
                title: meetingData.title,
                date: meetingData.date,
                time: meetingData.time,
                participants: {
                    create: meetingData.participants.map((participant) => ({
                        name: participant.name,
                        avatar: participant.avatar,
                    })),
                },
                status: meetingData.status,
            },
            include: {
                participants: true,
            },
        });
        return newMeeting;
    } catch (error) {
        console.error("Error creating meeting:", error);
        throw error;
    }
};
