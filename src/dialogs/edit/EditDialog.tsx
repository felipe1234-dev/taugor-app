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
import { 
    Link, 
    useParams,
    useNavigate
} from "react-router-dom";

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

export default function EditDialog() {
    const [task, setTask] = useState<Task|null>(null);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);
    
    const { uuid: taskUuid } = useParams();
    const navigate = useNavigate();    

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
            });
    }, [db, taskUuid]);
    
    const onSubmit = (event: any) => {
        event.preventDefault();
        
        if (!!taskUuid && !!task) {
            const data = new FormData(event.currentTarget);
            const newValues: any = {};
            
            for (const [ key, value ] of data.entries()) {
                const sample = task[key as keyof Task];
                
                switch (true) {
                    case sample instanceof Array: 
                        newValues[key] = (value as string).split(key === "tags" ? ", " : " ");
                        break;
                        
                    case typeof sample === "string":
                        newValues[key] = value as string;
                        break;
                }
            }
            
            updateTask(db, taskUuid, newValues as Task)
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
    }
    
    if (!task || !taskUuid) {
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
        >
            <form onSubmit={onSubmit}>
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