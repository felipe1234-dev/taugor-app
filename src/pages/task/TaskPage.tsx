// Libs
import { 
    useState, 
    useEffect,
    useContext
} from "react";
import { useParams } from "react-router-dom";

// Page components 
import Topbar from "./Topbar";
import Header from "./Header";
import Body from "./Body";

// Contexts
import { FirebaseContext } from "@local/contexts";

// API
import { getActivityByUuid } from "@local/api/collections/Activities";

// Interfaces
import { Task } from "@local/interfaces";

// Style
import "@local/style/pages/TaskPage.scss";

export default function TaskPage() {
    const [task, setTask] = useState<Task|null>(null);
    const { db } = useContext(FirebaseContext);
    
    const { uuid: taskUuid } = useParams();
    
    useEffect(() => {
        const fetchTaskData = async() => {
            if (!!taskUuid) {
                const pageTask = await getActivityByUuid(db, taskUuid);
                setTask(pageTask);
            }
        }
        
        fetchTaskData();
    }, [task, taskUuid, db]);
    
    return (
        !!task? (
            <>
                <Topbar {...task}/>
                <Header {...task}/>
                <Body {...task}/>
            </>
        ) : (
            <span></span>          
        )
    );
};