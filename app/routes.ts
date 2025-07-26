import { type RouteConfig, route, layout, index } from "@react-router/dev/routes";

export default [
    index('routes/index.tsx'),
    layout("routes/admin/admin-layout.tsx", [
        index('routes/admin/dashboard.tsx'),
        route('all-users', 'routes/admin/all-users.tsx'),
        route('trips', 'routes/admin/trips.tsx'),
    ]),
   
] satisfies RouteConfig;