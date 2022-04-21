// Libs
import { useEffect } from "react";
import { useLocation } from "react-router";

// Local components
import RequireAuth from "./RequireAuth";

// Props interface
interface PageContainerProps {
    title: string,
    requireAuth?: boolean,
    children: JSX.Element
};

export default function PageContainer({ title, requireAuth = false, children }: PageContainerProps) {
    const { pathname: pathNow } = useLocation();
    
    useEffect(() => {
        document.title = title;
        document.body.setAttribute("page", pathNow);
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