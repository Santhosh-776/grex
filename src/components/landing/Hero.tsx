"use client";

import React from "react";
import {
    Users,
    Calendar,
    FileText,
    Clock,
    ArrowRight,
    Play,
} from "lucide-react";
import Link from "next/link";
const Home: React.FC = () => {
    const darkMode = false;
    const features = [
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

    return (
        <div
            className={`min-h-screen ${
                darkMode ? "bg-gray-900" : "bg-gray-50"
            } transition-colors duration-300`}>
            {/* Hero Section */}
            <section className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1
                            className={`text-5xl md:text-6xl font-bold mb-6 ${
                                darkMode ? "text-white" : "text-gray-900"
                            }`}>
                            The Future of
                            <span className="text-blue-600 block">
                                Team Collaboration
                            </span>
                        </h1>

                        <p
                            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>
                            Seamlessly connect your team with integrated
                            meetings, task management, file sharing, and
                            real-time collaboration tools.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/signup"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2">
                                <span>Get Started Free</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <button
                                className={`flex items-center gap-2 px-8 py-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                                    darkMode
                                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}>
                                <Play className="w-5 h-5" />
                                <span>Watch Demo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2
                            className={`text-3xl md:text-4xl font-bold mb-4 ${
                                darkMode ? "text-white" : "text-gray-900"
                            }`}>
                            Everything You Need
                        </h2>
                        <p
                            className={`text-lg ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                            Powerful tools to streamline your team's workflow
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Link
                                    key={index}
                                    href={feature.link}
                                    className={`group relative ${
                                        darkMode ? "bg-gray-800" : "bg-white"
                                    } rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden`}>
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                    <div className="relative">
                                        <div
                                            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4`}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3
                                            className={`text-xl font-semibold mb-3 ${
                                                darkMode
                                                    ? "text-white"
                                                    : "text-gray-900"
                                            }`}>
                                            {feature.title}
                                        </h3>

                                        <p
                                            className={`${
                                                darkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                            } leading-relaxed`}>
                                            {feature.description}
                                        </p>

                                        <ArrowRight
                                            className={`w-5 h-5 mt-4 ${
                                                darkMode
                                                    ? "text-gray-500"
                                                    : "text-gray-400"
                                            } group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200`}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className={`py-16 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2
                        className={`text-3xl md:text-4xl font-bold mb-6 ${
                            darkMode ? "text-white" : "text-gray-900"
                        }`}>
                        Ready to Transform Your Team?
                    </h2>
                    <p
                        className={`text-lg mb-8 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                        Join thousands of teams already using TeamFlow to
                        collaborate more effectively.
                    </p>
                    <Link
                        href="/auth"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg inline-flex items-center gap-2">
                        <span>Start Your Free Trial</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
