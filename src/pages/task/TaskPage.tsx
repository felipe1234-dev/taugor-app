// Libs
import { 
    useState, 
    useEffect,
    useContext
} from "react";
import { useParams } from "react-router-dom";

// Fallback page
import { Error404Page } from "@local/pages";

// Page components 
import Topbar from "./Topbar";
import Header from "./Header";
import Body from "./Body";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// API
import { getTask } from "@local/api/collections/Tasks";

// Interfaces
import { Task } from "@local/interfaces";

// Style
import "@local/style/pages/TaskPage.scss";

export default function TaskPage() {
    const [task, setTask] = useState<Task|null>(null);
    const [ready, setReady] = useState<boolean>(false);
    
    const { db } = useContext(FirebaseContext);
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    const { uuid: taskUuid } = useParams();
    
    useEffect(() => {
        if (!taskUuid) {
            return;
        }
        
        getTask(db, taskUuid)
            .then((task) => (
                setTask(task)
            ))
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message); 
            })
            .then(() => (
                setReady(true)
            ));
    }, [db, taskUuid]);
    
    if (!ready) {
        return <></>;
    }
    
    return (
        !!task? (
            <>
                <Topbar {...task}/>
                <Header {...task}/>
                <Body {...task}/>
            </>
        ) : (
            <Error404Page /> 
        )
    );
}