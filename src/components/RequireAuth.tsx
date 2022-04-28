// Libs
import { 
    useState, 
    useEffect, 
    useContext
} from "react";
import { Navigate, useLocation } from "react-router-dom";

// API Firebase
import { getCurrentUser } from "@local/api/auth";

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
        return <span></span>;
    }
    
    if (!allowed) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};