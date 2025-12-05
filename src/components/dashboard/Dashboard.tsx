"use client";

import Greetings from "./Greetings";
import QuickActions from "./QuickActons";
import UpcomingMeetings from "./UpcomingMeetings";
import TaskOverview from "./TaskOverview";
const Dashboard: React.FC = () => {
    return (
        <main className="ml-64 pt-16 p-6 bg-gray-50 min-h-screen w-full">
            <div className="max-w-7xl mx-auto">
                <Greetings />

                <QuickActions />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <UpcomingMeetings />
                    <TaskOverview />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
