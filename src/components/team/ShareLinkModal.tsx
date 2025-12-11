"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Copy } from "lucide-react";

interface ShareLinkModalProps {
    content: string | null;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
    content,
    dialogOpen,
    setDialogOpen,
}) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const handleCopyLink = () => {
        if (content) {
            navigator.clipboard.writeText(content);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    return (
        <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Share Team Link
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Share this link to invite others to join your team:
                </DialogDescription>
                <div className="mt-4 flex space-x-2">
                    <span className="text-blue-500 text-sm">{content}</span>
                    <span
                        className="text-secondary cursor-pointer"
                        onClick={handleCopyLink}>
                        <Copy className="w-5 h-5 text-sm" />
                    </span>
                </div>
                {linkCopied && (
                    <div className="mt-2 text-green-500 text-sm text-center">
                        Link copied!
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ShareLinkModal;
