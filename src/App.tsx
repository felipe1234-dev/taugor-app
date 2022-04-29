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
    
    let bgLocation: Location|null = null;
    let enableLoader: boolean     = true;
    
    if (isRouteState(state)) {
        bgLocation   = state.background   || null;
        enableLoader = state.enableLoader || false;
    }

    // Aciona sempre que a página atual mudar
    useEffect(() => {
        setPageIsLoading(enableLoader);
    }, [pathNow]);

    // Aciona sempre que o componente termina de montar
    useEffect(() => {
        setTimeout(() => {
            setPageIsLoading(false);
        }, 8000);
    });
    
    return (
        <>
            <main style={{ display: pageIsLoading ? "none" : "block" }}>
                <Switch location={bgLocation || locationNow}>
                    <Route
                        path="/"
                        element={(
                            <Page title={`Home - ${appName}`} requireAuth>
                                <Home />
                            </Page>
                        )}
                    />
                    <Route
                         path="/login"
                         element={(
                             <Page title={`Entrar - ${appName}`}>
                                 <Login />
                             </Page>
                        )}
                    />
                    <Route
                        path="/task/:uuid"
                        element={(
                            <Page title={`Atividade - ${appName}`} requireAuth>
                                <Task />
                            </Page>
                        )}
                    />
                    <Route            
                        path="*"
                        element={(
                            <Page title={`Página não encontrada - ${appName}`}>
                                <Error404 />
                            </Page>
                        )}
                    />
                </Switch>
                
                {bgLocation && (
                    <Switch>
                        <Route 
                            path="/edit/:uuid"
                            element={(
                                <RequireAuth>
                                    <Edit />
                                </RequireAuth>
                            )}
                        />
                        <Route 
                            path="/delete/:uuid"
                            element={(
                                <RequireAuth>
                                    <Delete />
                                </RequireAuth>
                            )}
                        />
                    </Switch>
                )}
                
                <AlertMessage
                    open={!!message && !!severity}
                    type={severity || undefined}
                    duration={6000}
                    message={message}
                    onClose={() => {
                        setMessage(null);
                        setSeverity(null);
                    }}
                />
            </main>
            {pageIsLoading && (
                <PageLoader />
            )}
        </>
    );
};