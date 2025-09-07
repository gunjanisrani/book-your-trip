import { Header } from "../../../components";
import { ColumnsDirective, ColumnDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import { cn, formatDate } from "~/lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users"

export const loader = async () => {
    const { users, total } = await getAllUsers(10, 0);

    return { users, total };
}

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
    const { users } = loaderData;

    return (
        <main className="p-6">
            <Header
                title="Manage Users"
                description="Filter, sort, and access detailed user profiles"
            />

            <div className="mt-6">
                <GridComponent dataSource={users} gridLines="None">
                    <ColumnsDirective>
                        <ColumnDirective
                            field="name"
                            headerText="Name"
                            width="200"
                            textAlign="Left"
                            template={(props: UserData) => (
                                <div className="flex items-center gap-1.5 px-4">
                                    {props.imageUrl ? (
                                        <img 
                                            src={props.imageUrl} 
                                            alt="user" 
                                            className="rounded-full size-8 aspect-square object-cover" 
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : null}
                                    <div 
                                        className={`rounded-full size-8 aspect-square bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium ${props.imageUrl ? 'hidden' : ''}`}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'flex';
                                        }}
                                    >
                                        {props.name ? props.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span>{props.name}</span>
                                </div>
                            )}
                        />
                        <ColumnDirective
                            field="email"
                            headerText="Email Address"
                            width="200"
                            textAlign="Left"
                        />
                        <ColumnDirective
                            field="joinedAt"
                            headerText="Date Joined"
                            width="140"
                            textAlign="Left"
                            template={({ joinedAt }: { joinedAt: string }) => formatDate(joinedAt)}
                        />
                        <ColumnDirective
                            field="status"
                            headerText="Type"
                            width="100"
                            textAlign="Left"
                            template={({ status }: UserData) => (
                                <div className="flex items-center gap-2 px-4">
                                    <div className={cn('size-1.5 rounded-full', status === 'user' ? 'bg-green-500' : 'bg-gray-500')} />
                                    <span className={cn('text-xs font-medium', status === 'user' ? 'text-green-700' : 'text-gray-500')}>
                                        {status}
                                    </span>
                                </div>
                            )}
                        />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </main>
    )
}

export default AllUsers