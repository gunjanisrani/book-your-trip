import { Header } from "../../../components";
import { allTrips } from "~/constants";
import type { Route } from "./+types/trips";

export const loader = async () => {
    // For now, return mock data. You can replace this with actual API call later
    return { trips: allTrips };
}

const Trips = ({ loaderData }: Route.ComponentProps) => {
    const { trips } = loaderData;

    return (
        <main className="p-6">
            <Header
                title="AI Trips"
                description="Manage and view AI-generated trip itineraries"
            />
            
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip: any) => (
                        <div key={trip.id} className="bg-white rounded-lg shadow-md p-4">
                            <img 
                                src={trip.imageUrls[0]} 
                                alt={trip.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">{trip.name}</h3>
                            <p className="text-gray-600 mb-2">{trip.itinerary[0]?.location}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {trip.tags.map((tag: string, index: number) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-lg font-bold text-green-600">{trip.estimatedPrice}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Trips; 