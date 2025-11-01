import React from "react";
import Header from "@/components/landing/Header";
export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">{children}</main>
        </div>
    );
}
