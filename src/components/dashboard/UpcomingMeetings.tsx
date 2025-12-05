import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { upcomingMeetings } from "@/constants/dashboard";
const UpcomingMeetings = () => {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Upcoming Meetings
                    </h2>
                    <Link
                        href="/meetings"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                        View all
                    </Link>
                </div>

                <div className="space-y-3">
                    {upcomingMeetings.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">
                            No upcoming meetings
                        </p>
                    ) : (
                        upcomingMeetings.map((meeting) => (
                            <div
                                key={meeting.id}
                                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {meeting.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {meeting.date}
                                            </span>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {meeting.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            {meeting.participants
                                                .slice(0, 3)
                                                .map((participant, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={participant.avatar}
                                                        alt={participant.name}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                ))}
                                            {meeting.participants.length >
                                                3 && (
                                                <span className="text-xs text-gray-500">
                                                    +
                                                    {meeting.participants
                                                        .length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                        Join
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpcomingMeetings;
