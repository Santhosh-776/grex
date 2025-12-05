import { Calendar, CheckSquare, FileText, Users } from "lucide-react";
const quickActions = [
    {
        icon: Users,
        label: "New Team",
        description: "Create a new team",
        color: "blue",
        link: "/teams",
    },
    {
        icon: Calendar,
        label: "Schedule Meeting",
        description: "Plan a meeting",
        color: "green",
        link: "/meetings",
    },
    {
        icon: FileText,
        label: "Upload File",
        description: "Share documents",
        color: "purple",
        link: "/files",
    },
    {
        icon: CheckSquare,
        label: "Create Task",
        description: "Add new task",
        color: "orange",
        link: "/tasks",
    },
];

const meetings = [
    {
        id: 1,
        title: "Project Kickoff",
        date: "2024-07-01",
        time: "10:00 AM",
        participants: [
            { name: "Alice", avatar: "/avatars/alice.jpg" },
            { name: "Bob", avatar: "/avatars/bob.jpg" },
            { name: "Charlie", avatar: "/avatars/charlie.jpg" },
            { name: "David", avatar: "/avatars/david.jpg" },
        ],
        status: "upcoming",
    },
    {
        id: 2,
        title: "Design Review",
        date: "2024-07-02",
        time: "2:00 PM",
        participants: [
            { name: "Eve", avatar: "/avatars/eve.jpg" },
            { name: "Frank", avatar: "/avatars/frank.jpg" },
        ],
        status: "upcoming",
    },
];
const tasks = [
    {
        id: 1,
        title: "Create Wireframes",
        assignee: { name: "Alice", avatar: "/avatars/alice.jpg" },
        status: "in-progress",
    },
    {
        id: 2,
        title: "Set Up Database",
        assignee: { name: "Bob", avatar: "/avatars/bob.jpg" },
        status: "todo",
    },
    {
        id: 3,
        title: "Develop API Endpoints",
        assignee: { name: "Charlie", avatar: "/avatars/charlie.jpg" },
        status: "review",
    },
    {
        id: 4,
        title: "Frontend Integration",
        assignee: { name: "David", avatar: "/avatars/david.jpg" },
        status: "completed",
    },
];
const upcomingMeetings = meetings
    .filter((m) => m.status === "upcoming")
    .slice(0, 3);
const recentTasks = tasks.slice(0, 4);

export { quickActions, upcomingMeetings, recentTasks };
