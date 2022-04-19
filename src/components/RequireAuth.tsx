// Libs
import { 
    useState, 
    useEffect, 
    useContext 
} from "react";
import { Navigate, useLocation } from "react-router-dom";

// API Firebase
import { getCurrentUser, logout } from "@local/api/auth/sign-in";

// Contexts
import { FirebaseContext, UserContext } from "@local/contexts";

// Props interface
interface RequireAuthProps {
    children: JSX.Element
};

export default function RequireAuth({ children }: RequireAuthProps) {
    const [ready, setReady]     = useState<boolean>(false);
    const [allowed, setAllowed] = useState<boolean>(false);
    const location = useLocation();
    
    const { db } = useContext(FirebaseContext);
    const { setUser } = useContext(UserContext);
    
    useEffect(() => {
        (async() => {
            setReady(false); 
            
            const refreshToken = sessionStorage.getItem("Auth Token");

            if (!!refreshToken) {
                const tokenDate     = Number(sessionStorage.getItem("Assign Date"));
                const timeNow       = new Date().getTime();
                const minutesPassed = (timeNow - tokenDate)/(1000 * 60);

                if (minutesPassed > 60) {
                    logout().then(() => {
                        sessionStorage.removeItem("Auth Token");
                        sessionStorage.removeItem("Assign Date");
                    });
                }
            } 
            
            const user = await getCurrentUser(db);
            
            if (!!refreshToken || !!user) {
                setUser(user);
                setAllowed(true);
            } else {
                setUser(null);
                setAllowed(false);
            }
            
            setReady(true);
        })();
    }, [db]); 

    if (!ready) {
        return <span></span>;
    }
    
    if (!allowed) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};