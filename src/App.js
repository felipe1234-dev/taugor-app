// Libs
import React, {
    useEffect,
    useState,
    useContext
} from "react";
import {
    Routes as Switch,
    Route, 
    useNavigate,
    useLocation
} from "react-router-dom";

// Firebase API functions
import { getCurrentUser, logout } from "@app/auth";

// Constants
import { APP_INFO } from "@app/constants";

// Contexts
import { 
    FirebaseContext,
    PageContext,
    UserContext,
    AlertContext 
} from "@app/contexts";

// Components
import { PageLoader, AlertMessage } from "@app/components";
import { 
    HomePage,
    LoginPage, 
    TaskPage
} from "@app/pages";

// Extraindo appName
const { appName } = APP_INFO;

function App() {
    const [showPageLoader, setShowPageLoader] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    
    const { db } = useContext(FirebaseContext);
    const [pageIsLoading, setPageIsLoading] = useContext(PageContext);
    const [, setUser] = useContext(UserContext);
    const { message, severity } = useContext(AlertContext);
    
    const location = useLocation();
    const currPath = location.pathname;
    const navigate = useNavigate();
    
    useEffect(() => {
        setShowPageLoader(pageIsLoading);
        
        const refreshToken = sessionStorage.getItem("Auth Token");
        
        if (refreshToken) {
            const tokenDate = sessionStorage.getItem("Assign Date");
            const timeNow = new Date().getTime();
            const minutesPassed = (timeNow - tokenDate)/(1000*60);
            
            if (minutesPassed > 60) {
                logout().then(() => {
                    sessionStorage.removeItem("Auth Token");
                    sessionStorage.removeItem("Assign Date");
                });
            }
        }
        
        const fetchUserData = async() => {
            const user = await getCurrentUser(db);
            
            if (refreshToken) {
                setUser(user);
                
                if (currPath === "/login") {
                    navigate("/");
                }
            } else {
                setUser({});
                navigate("/login");
            }
        }
        
        fetchUserData();
    }, [pageIsLoading, db, currPath]);
    
    useEffect(() => {
        if (message && severity) {
            setShowAlert(true);
        }
    }, [severity, message]);
    
    // Aciona sempre que o componente termina de montar
    useEffect(() => {
        setTimeout(() => setPageIsLoading(false), 8000); 
    });
    
    const props = {
        main: {
            style: { 
                display: showPageLoader? "none" : "block" 
            }
        },
        alertMessage: {
            open: showAlert,
            type: severity,
            duration: 4000,
            onClose: () => setShowAlert(false)
        },
        homeRoute: {
            path: "/", 
            element: <HomePage title={`Home - ${appName}`} />,
            exact: true   
        },
        loginRoute: {
            path: "/login", 
            element: <LoginPage title={`Entrar - ${appName}`} />,
            exact: true
        },
        taskRoute: {
            path: "/task/:uuid",
            element: <TaskPage title={`Atividade - ${appName}`} />,
            exact: true
        }
    }
    
    return (
        <>
            <main {...props.main}>
               <Switch>
                    <Route {...props.homeRoute}/>
                    <Route {...props.loginRoute}/>
                    <Route {...props.taskRoute}/>
                </Switch>
            </main>
            {showPageLoader && <PageLoader />}
            <AlertMessage {...props.alertMessage}>
                {message}
            </AlertMessage>
        </>
    );
}

export default App;