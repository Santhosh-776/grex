"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreateTeam from "./CreateTeam";
import { Plus } from "lucide-react";

const CreateTeamModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <Plus className="inline-block mr-2" />
                    Create Team
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create New Team
                    </DialogTitle>
                </DialogHeader>

                <CreateTeam onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default CreateTeamModal;
