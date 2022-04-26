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
import { useParams } from "react-router-dom";

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
    }, [task, taskUuid, db]);
    
    const dialog = {
        open: true,
        maxWidth: "lg" as "lg",
        scroll: "paper" as "paper"
    }
    
    return (
        <Dialog {...dialog}>
            <DialogTitle>
                Editar atividade
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta ação não pode ser revertida
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>
                    Cancelar
                </Button>
                <Button>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};