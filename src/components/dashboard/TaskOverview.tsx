import Link from "next/link";
import { recentTasks } from "@/constants/dashboard";

const TaskOverview = () => {
    return (
        <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Tasks
                    </h2>
                    <Link
                        href="/tasks"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                        View all
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentTasks.map((task) => (
                        <div
                            key={task.id}
                            className="p-3 border border-gray-200 rounded-lg">
                            <h3 className="font-medium text-sm text-gray-900">
                                {task.title}
                            </h3>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={task.assignee.avatar}
                                        alt={task.assignee.name}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    <span className="text-xs text-gray-500">
                                        {task.assignee.name}
                                    </span>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                        task.status === "todo"
                                            ? "bg-gray-100 text-gray-700"
                                            : task.status === "in-progress"
                                            ? "bg-blue-100 text-blue-700"
                                            : task.status === "review"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                    }`}>
                                    {task.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    John created a new task
                                </p>
                                <span className="text-xs text-gray-500">
                                    2 minutes ago
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    Meeting "Weekly Standup" started
                                </p>
                                <span className="text-xs text-gray-500">
                                    15 minutes ago
                                </span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    New file uploaded to Design Team
                                </p>
                                <span className="text-xs text-gray-500">
                                    1 hour ago
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskOverview;
