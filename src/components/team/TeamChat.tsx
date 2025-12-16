"use client";

import React, { useState } from "react";

interface ChatMessage {
    id: string;
    author: string;
    message: string;
    timestamp: string;
}

interface Team {
    id: string;
    name: string;
}

interface TeamChatProps {
    team: Team;
}

const TeamChat: React.FC<TeamChatProps> = ({ team }) => {
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            const message: ChatMessage = {
                id: Date.now().toString(),
                author: "You",
                message: chatMessage,
                timestamp: new Date().toLocaleTimeString(),
            };
            setChatMessages([...chatMessages, message]);
            setChatMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Team Chat
            </h3>

            {/* Chat Messages */}
            <div className="border border-gray-200 dark:border-secondary rounded-lg p-4 mb-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                {chatMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
                        No messages yet. Start the conversation!
                    </div>
                ) : (
                    <div className="space-y-3">
                        {chatMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                                    {msg.author.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {msg.author}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-secondary dark:text-gray-300 break-words">
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 py-2 border bg-white dark:bg-gray-900 border-gray-300 dark:border-secondary text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!chatMessage.trim()}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default TeamChat;
