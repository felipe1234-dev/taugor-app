// Libs
import { useContext } from "react";
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Dialog components
import TaskForm from "../TaskForm";

// Interfaces
import { Task } from "@local/interfaces";

// API
import { addTask } from "@local/api/collections/Tasks";
import { uploadAttach } from "@local/api/storage/attachments";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

export default function AddDialog() {
    const navigate = useNavigate();
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db, storage } = useContext(FirebaseContext);
    
    const onSubmit = (params: {
        updates: Partial<Task>,
        uploads: Array<File>
    }) => {
        const { updates, uploads } = params;
        
        uploads.forEach((file) => {
            uploadAttach(storage, file)
                .catch((error) => {
                    setSeverity(error.severity);
                    setMessage(error.message);
                });
        });
    
        addTask(db, updates)
            .then((task) => {
                setSeverity("success"); 
                setMessage("Atividade adicionada com sucesso");
                    
                setTimeout(() => (
                    navigate(`/task/${task.uuid}`, { 
                       state: { enableLoader: true } 
                    })
                ), 4000);
            })
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);
            });
    }
    
    return (
        <Dialog
            open
            fullWidth
            maxWidth="md"
            scroll="paper"
            onClose={() => (
                navigate("/", { state: { enableLoader: false }})
            )}
        >
            <TaskForm 
                formTitle="Adicionar atividade"
                onSubmit={onSubmit}
            />
        </Dialog>
    );
};