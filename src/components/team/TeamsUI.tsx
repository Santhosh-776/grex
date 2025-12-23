import CreateTeamModal from "./CreateTeamModal";
import TeamList from "./TeamList";

const TeamsUI = () => {
    return (
        <div className="mx-auto ml-64 pt-16 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Teams
                    </h1>
                    <p className="text-secondary dark:text-gray-400">
                        Manage your teams and collaborate effectively
                    </p>
                </div>

                <CreateTeamModal />
            </div>

            <div className="">
                <TeamList />
            </div>
        </div>
    );
};

export default TeamsUI;
