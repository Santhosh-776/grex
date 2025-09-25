"use client";

import Link from "next/link";
import { Users } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <header className="flex items-center justify-between p-6">
                <Link
                    href="/"
                    className="flex items-center space-x-2">
                    <span className="bg-blue-600 inline-block p-1 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                        Grex
                    </span>
                </Link>

                <Link
                    href="/"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    ← Back to Home
                </Link>
            </header>

            {/* Auth Content */}
            <main className="flex items-center justify-center px-4 pb-16">
                {children}
            </main>

            {/* Auth Footer */}
            <footer className="text-center py-6 text-gray-600 dark:text-gray-300">
                <p>&copy; 2024 Grex. All rights reserved.</p>
            </footer>
        </div>
    );
}
