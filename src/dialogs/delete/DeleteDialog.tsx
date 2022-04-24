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
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import { 
    Link, 
    useNavigate, 
    useParams 
} from "react-router-dom";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// API
import { 
    deleteActivityByUuid, 
    getActivityByUuid 
} from "@local/api/collections/Activities";

// Interfaces
import { Task } from "@local/interfaces";

export default function DeleteDialog() {
    const [task, setTask] = useState<Task|null>(null);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);
    
    const { uuid: taskUuid } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!!taskUuid) {
            getActivityByUuid(db, taskUuid)
                .then((task) => (
                    setTask(task)
                ))
                .catch((error) => {
                    setSeverity(error.severity);
                    setMessage(error.message); 
                });
        }
    }, [task, taskUuid, db]);
    
    const dialog = {
        open: true
    }
    
    const cancelButton = {
        component: Link,
        to: `/task/${taskUuid}`,
        replace: true,
        state: { enableLoader: false }
    }
    
    const deleteButton = {
        onClick: () => {
            if (!!task && !!taskUuid) {
                deleteActivityByUuid(db, task.uuid)
                    .then(() => (
                        navigate("/", { replace: true })
                    ))
                    .catch((error) => {
                        setSeverity(error.severity);
                        setMessage(error.message);
                    });
            }
        }
    }
    
    return (
        <Dialog {...dialog}>
            <DialogTitle>
                Tem certeza que quer excluir?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta ação não pode ser revertida
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button {...cancelButton}>
                    Cancelar
                </Button>
                <Button {...deleteButton}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};