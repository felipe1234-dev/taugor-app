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
import { Page, Task } from "@local/interfaces";

// Style
import "@local/style/pages/TaskPage.scss";

export default function TaskPage({ title }: Page) {
    const [task, setTask]    = useState<Task|null>(null);
    const { uuid: taskUuid } = useParams();
    
    const { db } = useContext(FirebaseContext);
    
	useEffect(() => {
        document.title = title;
    }, [title]);
    
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
        !!task && (
            <>
                <Topbar {...task}/>
                <Header {...task}/>
                <Body {...task}/>
            </>
        ) : (
            
        )
    );
};