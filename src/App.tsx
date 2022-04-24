// Libs
import {
    useState,
    useEffect,
    useContext
} from "react";
import {
    Routes as Switch,
    Route,
    useLocation,
    Location
} from "react-router-dom";

// Components 
import {
    AlertMessage,
    PageContainer as Page,
    PageLoader,
    RequireAuth
} from "@local/components";

// Pages
import {
    HomePage as Home,
    LoginPage as Login,
    TaskPage as Task,
    Error404Page as Error404
} from "@local/pages";

// Dialogs
import {
    EditDialog as Edit,
    DeleteDialog as Delete
} from "@local/dialogs";

// Functions
import { isRouteState } from "@local/functions";

// Types
import { RouteState } from "@local/types";

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

    const locationNow = useLocation();
    const { pathname: pathNow, state } = locationNow;
    
    let routeState: RouteState|null = null;
    let bgLocation: Location|null = null;
    
    if (isRouteState(state)) {
        routeState = state;
        bgLocation = state.background || null;
    }

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
            display: pageIsLoading ? "none" : "block"
        }
    }
    
    const pageSwitch = {
        location: bgLocation || locationNow
    }

    const pages = {
        home: {
            path: "/",
            element: (
                <Page title={`Home - ${appName}`} requireAuth>
                    <Home />
                </Page>
            ),
            exact: true
        },
        login: {
            path: "/login",
            element: (
                <Page title={`Entrar - ${appName}`}>
                    <Login />
                </Page>
            ),
            exact: true
        },
        task: {
            path: "/task/:uuid",
            element: (
                <Page title={`Atividade - ${appName}`} requireAuth>
                    <Task />
                </Page>
            ),
            exact: true
        },
        error404: {
            path: "*",
            element: (
                <Page title={`Página não encontrada - ${appName}`}>
                    <Error404 />
                </Page>
            )
        }
    }
    
    const dialogs = {
        edit: {
            path: "/edit/:uuid",
            element: (
                <RequireAuth>
                    <Edit />
                </RequireAuth>
            ),
            exact: true
        },
        delete: {
            path: "/delete/:uuid",
            element: (
                <RequireAuth>
                    <Delete />
                </RequireAuth>
            ),
            exact: true
        }
    }

    const alertMessage = {
        open: !!message && !!severity,
        type: !!severity ? severity : undefined,
        duration: 6000,
        message: message as string|undefined,
        onClose: () => {
            setMessage(null);
            setSeverity(null);
        }
    }

    return (
        <>
            <main {...main}>
                <Switch {...pageSwitch}>
                    <Route {...pages.home}/>
                    <Route {...pages.login}/>
                    <Route {...pages.task}/>
                    <Route {...pages.error404}/>
                </Switch>
                
                {bgLocation && (
                    <Switch>
                        <Route {...dialogs.delete}/>
                        <Route {...dialogs.edit}/>
                    </Switch>
                )}
                
                <AlertMessage {...alertMessage}/>
            </main>
            {pageIsLoading && (
                <PageLoader />
            )}
        </>
    );
};