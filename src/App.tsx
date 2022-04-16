// Libs
import { useEffect, useContext } from "react";
import {
    Routes as Switch,
    Route,
    useNavigate,
    useLocation
} from "react-router-dom";

// Components 
import { PageLoader, AlertMessage } from "@local/components";

// Pages
import {
    HomePage,
    LoginPage,
    TaskPage
} from "@local/pages";

// Contexts
import {
    FirebaseContext,
    PageContext,
    UserContext,
    AlertContext
} from "@local/contexts";

// API
import { logout, getCurrentUser } from "@local/api/auth";

// Constants
import { APP_INFO } from "@local/constants";

const { appName } = APP_INFO;

export default function App() {
    const { db }      = useContext(FirebaseContext);
    const { setUser } = useContext(UserContext);
	const { 
        isLoading, 
        setIsLoading 
    } = useContext(PageContext);
    const {
        message,
        setMessage, 
        severity,
        setSeverity 
    } = useContext(AlertContext);
	
	const location = useLocation();
    const currPath = location.pathname;
    const navigate = useNavigate();
	
	useEffect(() => {
        setIsLoading(true);

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

        const fetchUserData = async() => {
            const user = await getCurrentUser(db);

            if (!!refreshToken && !!user) {
                setUser(user);

                if (currPath === "/login") {
                    navigate("/");
                }
            } else {
                setUser(null);
                navigate("/login");
            }
        }

        fetchUserData();
    }, [isLoading, db, currPath]);
    
	// Aciona sempre que o componente termina de montar
    useEffect(() => {
        setTimeout(() => {
			setIsLoading(false);
		}, 8000);
    });
	
	const main = {
		style: {
			display: isLoading? "none" : "block"
		}
	}
	
	const homeRoute = {
		path: "/",
        element: <HomePage title={`Home - ${appName}`} />,
        exact: true
	}
    
    const loginRoute = {
        path: "/login",
        element: <LoginPage title={`Entrar - ${appName}`} />,
        exact: true
    }
    
    const taskRoute = {
        path: "/task/:uuid",
        element: <TaskPage title={`Atividade - ${appName}`} />,
        exact: true
    }
    
    const notFoundRoute = {
        path: "/",
        element: 
    }
    
    const alertMessage = {
        open: !!message && !!severity,
        type: !!severity? severity : undefined,
        duration: 4000,
        onClose: () => {
            setMessage(null);
            setSeverity(null);
        }
    }
	
	return (
		<>
			<main {...main}>
                <Switch>
                    <Route {...homeRoute} />
                    <Route {...loginRoute} />
                    <Route {...taskRoute} />
                    <Route {...notFoundRoute} />
                </Switch>
            </main>
            {isLoading && (
                <PageLoader />
            )}
            <AlertMessage {...alertMessage}>
                {message}
            </AlertMessage>
		</>
	);
};