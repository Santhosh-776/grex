// src/app/(landing)/layout.tsx (Landing page layout)
import React from "react";
import LandingHeader from "./components/Header";

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <LandingHeader />
            <main>{children}</main>
        </div>
    );
}
