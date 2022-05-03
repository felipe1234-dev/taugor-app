// Libs
import { 
    useState, 
    useEffect, 
    useContext
} from "react";
import { 
    Navigate, 
    useLocation,
    Location
} from "react-router-dom";

// API
import { getCurrentUser } from "@local/api/auth";

// Functions
import { isRouteState } from "@local/functions";

// Contexts
import { 
    AlertContext, 
    FirebaseContext, 
    UserContext 
} from "@local/contexts";

// Props interface
export interface RequireAuthProps {
    children: JSX.Element
};

export default function RequireAuth({ children }: RequireAuthProps) {
    const [ready, setReady]     = useState<boolean>(false);
    const [allowed, setAllowed] = useState<boolean>(false);
    const location = useLocation();
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);
    const { setUser } = useContext(UserContext);
    
    const locationNow = useLocation();
    const { state } = locationNow;
    
    let bgLocation: Location|null = null;
    if (isRouteState(state)) {
        bgLocation = state.background || null;
    }
    
    useEffect(() => {
        setReady(false);
        
        getCurrentUser(db)
            .then((user) => {
                setUser(user);
                setAllowed(!!user); 
                /* Se user for nulo, significa que não está logado,
                 * vai ser convertido em false e vice-versa.
                 */
                    
                setReady(true);
            })
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);   
            });
    }, [db]); 

    if (!ready) {
        return <></>;
    }
    
    if (!allowed) {
        return <Navigate to="/login" state={{ from: bgLocation || locationNow }} replace />;
    }

    return children;
};