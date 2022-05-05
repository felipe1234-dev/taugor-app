// Libs
import {
    useState,
    useEffect,
    useContext
} from "react";
import { Dialog } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// Dialog components
import TaskForm from "../TaskForm";

// Local components
import { Spinner } from "@local/components";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// Interfaces
import { Task } from "@local/interfaces";

// API
import { getTask, updateTask } from "@local/api/collections/Tasks";
import { uploadAttach } from "@local/api/storage/attachments";

export default function EditDialog() {
    const [sourceTask, setSourceTask] = useState<Task|null>(null);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db, storage } = useContext(FirebaseContext);
    
    const { uuid: taskUuid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!taskUuid) {
            return;
        }
        
        getTask(db, taskUuid)
            .then((task) => (
                setSourceTask(task)
            ))
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message); 
            });
    }, [db, taskUuid]);
    
    const onSubmit = (params: {
        updates: Partial<Task>,
        uploads: Array<File>
    }) => {
        if (!taskUuid || !sourceTask) {
            return;
        }
        
        const { updates, uploads } = params;
        
        uploads.forEach((file) => {
            uploadAttach(storage, file)
                .catch((error) => {
                    setSeverity(error.severity);
                    setMessage(error.message);
                });
        });
    
        updateTask(db, taskUuid, updates)
            .then(() => {
                setSeverity("success"); 
                setMessage("Atividade editada com sucesso");
                    
                setTimeout(() => {
                    navigate(`/task/${taskUuid}`, { 
                       state: { enableLoader: false } 
                    });
                        
                    window.location.reload();
                }, 4000);
            })
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);
            });
    
    }
    
    if (!sourceTask || !taskUuid) {
        return (
            <Spinner 
                wrapper={{
                    width: "100%",
                    height: "300px"
                }}
                        
                spinner={{
                    width: "2.3em",
                    height: "2.3em"
                }}
            />
        );
    }

    return (
        <Dialog
            open
            fullWidth
            maxWidth="md"
            scroll="paper"
            onClose={() => (
                navigate(`/task/${taskUuid}`, { state: { enableLoader: false }})
            )}
        >
            {!!sourceTask && (
                <TaskForm
                    formTitle="Editar atividade"
                    onSubmit={onSubmit}
                    {...sourceTask}
                />
            )}
        </Dialog>
    );
};