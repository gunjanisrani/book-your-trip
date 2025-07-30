import { Link, NavLink } from "react-router-dom"; 
//Link navigates to a route without reloading the page
//NavLink is used to apply styles based on the active route
import { sidebarItems } from "~/constants"; 
import { cn } from "~/lib/utils"; //a utility function to conditionally join class names


const NavItems = ({handleClick}:{handleClick?:()=>void}) => {
    const user ={
        name: "Admin",
        email: "email@gmail.com",
        imageUrl: "/assets/images/user.png"
    }

    return (
        <section className="nav-items">
            <Link to= "/" className="link-logo"> 
                <img src="/assets/icons/logo.svg" alt="Logo" 
                className="size-[30px]" />
                <h1>Tourvisto</h1>
                </Link>

                <div className="container">
                    <nav>
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

                <footer className="nav-footer">
                    <img src={user?.imageUrl || '/assets/images/david.webp'} alt={user?.name || 'User'} />
                </footer>

                <article>
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>
                </article>

                <button
                    onClick ={() => {
                        console.log("Logout clicked");
                    }}
                    className="cursor-pointer">
                        <img src="/assets/icons/logout.svg" alt="Logout" className="size=6"/>
                </button>

                </div>
        </section>
    )
}
export default NavItems;