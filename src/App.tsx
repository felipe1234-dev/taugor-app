// Libs
import { 
    useState,
    useEffect, 
    useContext 
} from "react";
import {
    Routes as Switch,
    Route,
    useLocation
} from "react-router-dom";

// Components 
import {
    AlertMessage,
    PageContainer as Page,
    PageLoader
} from "@local/components";

// Pages
import {
    HomePage as Home,
    LoginPage as Login,
    TaskPage as Task,
    Error404Page as Error404
} from "@local/pages";

// Contexts
import { AlertContext } from "@local/contexts";

// Constants
import { APP_INFO } from "@local/constants";

const { appName } = APP_INFO;

export default function App() {
    const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);
    const {
        message,
        setMessage, 
        severity,
        setSeverity 
    } = useContext(AlertContext);
	
	const location = useLocation();
    const pathNow  = location.pathname;
	
    // Aciona sempre que a página atual mudar
	useEffect(() => {
        setPageIsLoading(true);
    }, [pathNow]);
    
	// Aciona sempre que o componente termina de montar
    useEffect(() => {
        setTimeout(() => {
			setPageIsLoading(false);
		}, 8000);
    });
	
	const main = {
		style: {
			display: pageIsLoading? "none" : "block"
		}
	}
	
	const homeRoute = {
		path: "/",
        element: (
            <Page title={`Home - ${appName}`} requireAuth>
                <Home />
            </Page>
        ),
        exact: true
	}
    
    const loginRoute = {
        path: "/login",
        element: (
            <Page title={`Entrar - ${appName}`}>
                <Login />
            </Page>
        ),
        exact: true
    }
    
    const taskRoute = {
        path: "/task/:uuid",
        element: (
            <Page title={`Atividade - ${appName}`} requireAuth>
                <Task />
            </Page>
        ),
        exact: true
    }
    
    const error404Route = {
        path: "*",
        element: (
            <Page title={`Página não encontrada - ${appName}`}>
                <Error404 />
            </Page>
        )
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
                    <Route {...homeRoute}/>
                    <Route {...loginRoute}/>
                    <Route {...taskRoute}/>
                    <Route {...error404Route}/>
                </Switch>
            </main>
            {pageIsLoading && (
                <PageLoader />
            )}
            <AlertMessage {...alertMessage}>
                {message}
            </AlertMessage>
		</>
	);
};