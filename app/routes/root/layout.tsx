import { Outlet, redirect } from "react-router";
import { NavItems, MobileSidebar } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();

        if (!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);

        if (!existingUser) {
            await storeUserData();
            // After storing, get the user data again
            const newUser = await getExistingUser(user.$id);
            // If new user is admin, redirect to admin dashboard
            if (newUser?.status === 'admin') {
                return redirect('/dashboard');
            }
            return newUser;
        }

        // If existing user is admin, redirect to admin dashboard
        if (existingUser.status === 'admin') {
            return redirect('/dashboard');
        }

        return existingUser;
    } catch (e) {
        console.log('Error in clientLoader', e)
        return redirect('/sign-in')
    }
}

const MainLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex">
                <NavItems />
            </div>
            
            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <MobileSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;