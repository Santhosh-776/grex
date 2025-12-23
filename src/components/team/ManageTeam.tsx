const MeanageTeam = () => {
    return (
        <section>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Manage Team</h2>
                <div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Edit Team Details
                    </button>
                    <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Delete Team
                    </button>
                    <button className="ml-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary">
                        Manage Roles
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MeanageTeam;
