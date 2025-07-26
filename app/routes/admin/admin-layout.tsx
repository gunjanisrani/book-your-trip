import { Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavItems } from "../../../components";

const AdminLayout = () => {
    return (
        <div className="admin-layout flex h-screen">
            <aside className="w-full max-w-[270px] bg-white shadow-lg">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
