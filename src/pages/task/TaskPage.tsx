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
import { getActivityByUuid } from "@local/api/collections/Activities";

// Interfaces
import { Task } from "@local/interfaces";

// Style
import "@local/style/pages/TaskPage.scss";

export default function TaskPage() {
    const [task, setTask] = useState<Task|null>(null);
    
    const { db } = useContext(FirebaseContext);
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    const { uuid: taskUuid } = useParams();
    
    useEffect(() => {
        if (!taskUuid) {
            return;
        }
        
        getActivityByUuid(db, taskUuid)
            .then((task) => (
                setTask(task)
            ))
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message); 
            });
    }, [task, taskUuid, db]);
    
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
};