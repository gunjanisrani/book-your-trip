//@ts-nocheck

import { Link } from "react-router-dom"; 
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

const MobileSidebar=()=>{
    let sidebar:SidebarComponent;

    const toggleSidebar=()=>{
        sidebar.toggle();
    }

    return(
        <div className="mobile-sidebar wrapper">

            <header> 
                <Link to="/">
                    <img src="/assets/icons/logo.svg" alt="Logo" className="size-[30px]" />
                <h1>Tourvisto</h1>
                </Link>
                
                
                <button onClick={toggleSidebar}>
                    <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
                </button>
            </header>

            <SidebarComponent 
                width={270}
                
                ref={(sidebar) => 
                    sidebar = sidebar}
                
                created={()=> sidebar.hide()}
                closeOnDocumentClick={true}
                ShowBackdrop={true}
                type="over"
                >
                <NavItems handleClick={toggleSidebar

                }/>
            </SidebarComponent>
        </div>
    )
}
export default MobileSidebar;