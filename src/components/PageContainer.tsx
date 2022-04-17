// Libs
import { useEffect } from "react";

// Local components
import RequireAuth from "./RequireAuth";

// Props interface
interface PageContainerProps {
    title: string,
    requireAuth?: boolean,
    children: JSX.Element
};

export default function PageContainer({ title, requireAuth = false, children }: PageContainerProps) {
    useEffect(() => {
        document.title = title;
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