// Libs
import {
    useState,
    useEffect,
    useContext
} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

// Dialog components
import TaskFormFields from "../TaskFormFields";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// Interfaces
import { Task } from "@local/interfaces";

// API
import { getActivityByUuid } from "@local/api/collections/Activities";

export default function EditDialog() {
    const [task, setTask] = useState<Task|null>(null);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);
    
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
    }, [db, taskUuid]);
    
    const onSubmit = (event: any) => {
        event.preventDefault();
    }

    const onChange = () => {

    }
    
    const form = {
        component: "form" as "form",
        onSubmit: onSubmit,
        onChange: onChange,
        maxWidth: "lg" as "lg",
        scroll: "paper" as "paper",
        open: true,
        fullWidth: true
    }
    
    const cancelButton = {
        component: Link,
        to: `/task/${taskUuid}`,
        state: { enableLoader: false }
    }
    
    const saveButton = {
        type: "submit" as "submit",
    }
    
    return (
        <Dialog {...form}>
            <DialogTitle>
                Editar atividade
            </DialogTitle>
            <DialogContent>
                {!!task && (
                    <TaskFormFields {...task}/>
                )}
            </DialogContent>
            <DialogActions>
                <Button {...cancelButton}>
                    Cancelar
                </Button>
                <Button {...saveButton}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};