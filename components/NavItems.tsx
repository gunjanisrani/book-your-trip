import { Link, NavLink, useLoaderData,useNavigate} from "react-router-dom"; 
//Link navigates to a route without reloading the page
//NavLink is used to apply styles based on the active route
import { sidebarItems } from "~/constants"; 
import { cn } from "~/lib/utils"; //a utility function to conditionally join class names
import { logoutUser } from "~/appwrite/auth";

const NavItems = ({handleClick}:{handleClick?:()=>void}) => {
    const user =useLoaderData();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    }

    return (
        <section className="nav-items flex flex-col h-full">
            <Link to= "/" className="link-logo"> 
                <img src="/assets/icons/logo.svg" alt="Logo" 
                className="size-[30px]" />
                <h1>Tourvisto</h1>
            </Link>

            <div className="container flex flex-col h-full">
                <nav className="flex-1">
                    {sidebarItems.map(({id,href,icon,label}) => (
                        <NavLink to={href} key={id}>
                            {({isActive}:{isActive:boolean}) => (
                                <div className={cn('group nav-item',{
                                    'bg-primary-100 !text-white': isActive
                                })} onClick={handleClick}>
                                    <img src={icon} alt={label} 
                                    className={`group-hover:brightness-0 size-0 
                                        group-hover:invert ${isActive ? 'brightness-0 invert' :'text-dark-200'}`} 
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <footer className="nav-footer mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        {user?.imageUrl ? (
                            <img 
                                src={user.imageUrl} 
                                alt={user?.name || 'User'} 
                                referrerPolicy="no-referrer" 
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : null}
                        <div 
                            className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium ${user?.imageUrl ? 'hidden' : ''}`}
                        >
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold">{user?.name}</h2>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick ={handleLogout}
                        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-red-500">
                        <img src="/assets/icons/logout.svg" alt="Logout" className="size-4"/>
                        Logout
                    </button>
                </footer>
            </div>
        </section>
    )
}
export default NavItems;