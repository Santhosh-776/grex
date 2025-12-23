import { User, Delete } from "lucide-react";

export const memberOptions = [
    {
        id: 1,
        label: "View Profile",
        bgcolor: "hover:bg-chart-1/30",
        border: "border-chart-1",
        action: "[userId]/profile",
        icon: User,
    },
    {
        id: 3,
        label: "Remove Member",
        bgcolor: "hover:bg-red-500",
        border: "border-chart-5",
        action: "[memberId]/remove",
        icon: Delete,
    },
    {
        id: 2,
        label: "Assign Role",
        bgcolor: "hover:bg-chart-3/20",
        border: "border-chart-3",
        action: "[memberId]/role",
        icon: User,
    },
];
