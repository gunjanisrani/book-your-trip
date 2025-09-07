import { Outlet,redirect } from "react-router"; //a placeholder to inject child routes
import { SidebarComponent } from "@syncfusion/ej2-react-navigations"; //a component library for sidebar
import { NavItems,MobileSidebar } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();

        if (!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);

        if (existingUser?.status === 'user') {
            return redirect('/');
        }

        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        console.log('Error in clientLoader', e)
        return redirect('/sign-in')
    }
}

const AdminLayout = () => {
    //show sidebar only on larger screens
    //on smaller screens, show a mobile sidebar
    return (
        <div className="admin-layout">
            <MobileSidebar/>
            <aside className="w-full max-w-[270px] hidden lg:block"> 
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
