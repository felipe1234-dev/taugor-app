// Libs
import { useEffect } from "react";
import { useLocation, Location } from "react-router";

// Local components
import RequireAuth from "./RequireAuth";

// Local functions
import { isRouteState } from "@local/functions";

// Props interface
export interface PageContainerProps {
    title: string,
    requireAuth?: boolean,
    is404?: boolean,
    children: JSX.Element
};

export default function PageContainer({ 
    title, 
    requireAuth = false,
    is404 = false,
    children 
}: PageContainerProps) {
    const locationNow = useLocation();
    const { state } = locationNow;
    
    let bgLocation: Location|null = null;
    if (isRouteState(state)) {
        bgLocation = state.background || null;
    }

    useEffect(() => {
        document.title = title;
        document.body.setAttribute("page", bgLocation?.pathname || locationNow.pathname);
    }, [title]);
    
    useEffect(() => {
        if (is404) {
            document.body.setAttribute("not-found", "");
        } else {
            document.body.removeAttribute("not-found");
        }
    }, [is404]);
    
    if (requireAuth) {
        return (
            <RequireAuth>
                {children}
            </RequireAuth>
        );
    }
    
    return children;
};