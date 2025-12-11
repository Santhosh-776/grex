import { LoginData } from "./auth";
// User matches Prisma User model
export interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: string; // matches schema "profileImage"
    role?: "owner" | "admin" | "member" | "viewer"; // matches enum Role (optional on client)
}

// Team matches Prisma Team model
export interface Team {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    createdBy: User;
    members: TeamMember[];
    meetings?: Meeting[];
    tasks?: Task[];
}

export interface TeamMember {
    id: string;
    userId: string;
    teamId: string;
    role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
    joinedAt: string; // or Date if you convert it
    user: User; // Nested user object included via Prisma include
}

// Meeting matches Prisma Meeting model
export interface Meeting {
    id: string;
    title: string;
    description?: string;
    scheduledAt: string; // ISO string
    status: "scheduled" | "ongoing" | "completed"; // matches Status enum
    createdBy: User;
    teamId: string;
    notes?: Note[];
    participants?: User[]; // derived from Team members or invites
    hasReminder?: boolean; // frontend helper
}

// Task matches Prisma Task model
export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate: string; // ISO string
    status: "todo" | "in-progress" | "completed" | "overdue"; // matches TaskStatus enum
    assignedTo: User;
    teamId: string;
}

// Note matches Prisma Note model
export interface Note {
    id: string;
    content: string;
    createdAt: string;
    createdBy: User;
}

// Notification matches Prisma Notification model
export interface Notification {
    id: string;
    type: "MEETING_REMINDER" | "MEETING_UPDATE" | "TASK_DUE" | "TASK_ASSIGNED";
    content: string;
    isRead: boolean;
    createdAt: string; // ISO string
    teamId?: string;
    meetingId?: string;
    taskId?: string;
}
