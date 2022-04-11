// Libs
import React, { 
    useState, 
    useEffect,
    useContext
} from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// Components 
import Topbar from "./Topbar";
import Header from "./Header";
import Body from "./Body";

// Contexts
import { FirebaseContext } from "@app/contexts";

// API
import { getActivityByUuid } from "@app/collections/Activities";

// Style
import "@app/style/pages/TaskPage.scss";

function TaskPage({ title }) {
    const [task, setTask] = useState({});
    const { uuid: taskUuid } = useParams();
    
    const { db } = useContext(FirebaseContext);
    
	useEffect(() => (document.title = title), [title]);
    
    useEffect(() => {
        const fetchTaskData = async() => {
            const data = await getActivityByUuid(db, taskUuid);
            setTask(data);
        }
        
        fetchTaskData();
    }, [task, taskUuid, db]);
    
    const props = {
        topbar: {
            taskUuid: taskUuid,
            senderUuid: task.postedBy
        },
        header: {
            ...task
        },
        body: {
            ...task
        }
    };
    
    return (
        Object.entries(task).length > 0 && (
            <>
                <Topbar {...props.topbar}/>
                <Header {...props.header}/>
                <Body {...props.body}/>
            </>
        )
    );
}

TaskPage.propTypes = {
    title: PropTypes.string.isRequired
};

export default TaskPage;