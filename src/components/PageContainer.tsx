// Libs
import { useEffect } from "react";
import { useLocation, Location } from "react-router";

// Local components
import RequireAuth from "./RequireAuth";

// Local functions
import { isRouteState } from "@local/functions";

// Local types
import { RouteState } from "@local/types";

// Props interface
interface PageContainerProps {
    title: string,
    requireAuth?: boolean,
    children: JSX.Element
};

export default function PageContainer({ title, requireAuth = false, children }: PageContainerProps) {
    const locationNow = useLocation();
    const { state } = locationNow;
    
    let routeState: RouteState|null = null;
    let bgLocation: Location|null = null;
    
    if (isRouteState(state)) {
        routeState = state;
        bgLocation = state.background || null;
    }

    useEffect(() => {
        document.title = title;
        document.body.setAttribute("page", bgLocation?.pathname || locationNow.pathname);
    }, [title]);
    
    if (requireAuth) {
        return (
            <RequireAuth>
                {children}
            </RequireAuth>
        );
    }
    
    return children;
};