import { z } from "zod";

export const teamRequestSchema = z
    .object({
        teamId: z.uuid().optional(),
        token: z.string().optional(),
        userId: z.uuid().optional(),
        memberId: z.uuid().optional(),
    })
    .refine(
        (data) => data.teamId || data.token || data.memberId,
        "Either teamId or token must be provided."
    );
