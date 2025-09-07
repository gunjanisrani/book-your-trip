import {Header, StatsCard, TripCard} from "../../../components/";
import {dashboardStats, user, allTrips} from "~/constants";
import { getUser } from "~/appwrite/auth";
import type { Route } from "./+types/dashboard";


const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

export async function clientLoader() {
    return await getUser();
}

const Dashboard = ({loaderData}: Route.ComponentProps) => {
    const user = loaderData as User | null;
    
    return (
       <main className="dashboard wrapper">
        <Header 
                title={`Welcome ${user?.name ?? 'Guest'} 👋`}
                description="Track activity, trends and popular destinations in real time"
        />

        <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <StatsCard 
                headerTitle="Total Users"
                total={totalUsers}
                
                
                currentMonth={usersJoined.currentMonth}
                lastMonth={usersJoined.lastMonth}
            />
            
            <StatsCard
                headerTitle="Total Trips"
                total={totalTrips}
                currentMonth={tripsCreated.currentMonth}
                lastMonth={tripsCreated.lastMonth}
            />

            <StatsCard
                headerTitle="Active Users"
                total={totalUsers}
                currentMonth={userRole.currentMonth}
                lastMonth={userRole.lastMonth}
            />
            

            </div>
        </section>
        <section className="container">
            <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

            <div className='trip-grid'>
                    {allTrips.slice(0, 4).map(({ id, name, imageUrls, itinerary,tags,estimatedPrice}) => (
                    <TripCard 
                        key={id} 
                        name={name}
                        id={id.toString()}
                        imageUrl={imageUrls[0]}
                        location={itinerary?.[0]?.location ?? ''}
                        tags={tags}
                        price={estimatedPrice}/>
                ))}
            </div>
        </section>
        <TripCard />
       </main>
    )
}

export default Dashboard;