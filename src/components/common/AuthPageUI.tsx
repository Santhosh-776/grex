import { Users } from "lucide-react";

const AuthPageUI = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center w-1/2">
            <div className="flex-1 lg:mr-16 mb-8 lg:mb-0">
                <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Users className="w-7 h-7 text-white" />
                        </div>
                        <span className={`font-bold text-3xl }`}>Grex</span>
                    </div>

                    <h1 className={`text-4xl lg:text-5xl font-bold mb-6 }`}>
                        <span className="block">Collaborate Better,</span>

                        <span className="text-blue-600">Meet Smarter</span>
                    </h1>

                    <p className={`text-xl mb-8 -md mx-auto lg:mx-0`}>
                        Streamline your team collaboration with integrated
                        meetings, task management, and file sharing.
                    </p>

                    <div className="hidden lg:block">
                        <div
                            className={`w-full h-64  rounded-2xl flex items-center justify-center bg-blue-100`}>
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-16 h-16 rounded-xl shadow-md flex items-center justify-center`}>
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPageUI;
