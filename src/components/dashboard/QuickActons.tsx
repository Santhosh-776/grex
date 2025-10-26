"use client";

import { quickActions } from "@/constants/dashboard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const QuickActions = () => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={index}
                            href={action.link}
                            className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`p-2 rounded-lg bg-${action.color}-100 text-${action.color}-600`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {action.label}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {action.description}
                                    </p>
                                </div>
                                <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;
