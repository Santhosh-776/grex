import { Calendar, Clock, FileText, Users } from "lucide-react";

export const features = [
    {
        icon: Users,
        title: "Create Team",
        description: "Build and manage your collaborative teams",
        gradient: "from-blue-500 to-purple-600",
        link: "/teams",
    },
    {
        icon: Calendar,
        title: "Create Call",
        description: "Start instant meetings with your team",
        gradient: "from-green-500 to-blue-600",
        link: "/meetings",
    },
    {
        icon: FileText,
        title: "Share Files",
        description: "Securely share and collaborate on documents",
        gradient: "from-purple-500 to-pink-600",
        link: "/files",
    },
    {
        icon: Clock,
        title: "Schedule Meetings",
        description: "Plan and organize your team meetings",
        gradient: "from-orange-500 to-red-600",
        link: "/meetings",
    },
];
