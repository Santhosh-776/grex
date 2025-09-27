import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className=" bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Topbar />
                <main className="flex-1 p-4 ">{children}</main>
            </div>
        </div>
    );
};
export default AppLayout;
