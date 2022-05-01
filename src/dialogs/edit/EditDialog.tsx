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
import TaskForm from "../TaskForm";

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
    
    return (
        <Dialog
            open
            fullWidth
            maxWidth="lg"
            scroll="paper"
        >
            <form onSubmit={onSubmit} onChange={onChange}>
                <DialogTitle>
                    Editar atividade
                </DialogTitle>
                <DialogContent>
                    {!!task && (
                        <TaskForm {...task}/>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button            
                        component={Link}
                        to={`/task/${taskUuid}`}
                        state={{ enableLoader: false }}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Salvar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};