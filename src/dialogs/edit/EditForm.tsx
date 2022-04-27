// Libs
import { 
    useState, 
    useEffect,
    useContext
} from "react";
import {
    Box,
    TextField,
    DialogContentText,
    MenuItem
} from "@mui/material";
import { useParams } from "react-router-dom";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// Interfaces
import { Task } from "@local/interfaces";

// API
import { getActivityByUuid } from "@local/api/collections/Activities";

// Constants
import { 
    STATUS_TYPES,
    PRIORITY_TYPES
} from "@local/constants";

export default function EditForm() {
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
        onSubmit: onSubmit,
        onChange: onChange,
        component: "form" as "form",
        sx: {
            display: "flex",
            flexDirection: "column",
            mb: 2,
            mt: 2,
            width: "100%"
        }
    }
    
    const baseTextField = {
        maxRows: 4,
        fullWidth: true,
        multiline: true,
        sx: {
            mb: 0,
            mt: 2,
        }
    }
    
    const titleTextField = {
        name: "title",
        placeholder: "Título",
        defaultValue: task?.title.join(" "),
        inputProps: {
            maxLength: 50
        }
    }
    
    const briefTextField = {
        name: "brief",
        placeholder: "Explicação breve",
        defaultValue: task?.brief,
        inputProps: {
            maxLength: 150
        }
    }
    
    const baseSelectField = {
        select: true,
        sx: {
            mb: 0,
            mt: 2
        }
    }
    
    const statusSelectField = {
        name: "status",
        defaultValue: task?.status
    }
    
    const prioritySelectField = {
        name: "priority",
        defaultValue: task?.priority
    }
    
    return (
        <Box {...form}>
            <DialogContentText>
                 
            </DialogContentText>
            {!!task && (
                <>
                    <TextField
                        {...baseTextField} 
                        {...titleTextField}
                    />
                    <TextField
                        {...baseTextField} 
                        {...briefTextField}
                    />
                    <TextField 
                        {...baseSelectField} 
                        {...statusSelectField}
                    >
                        {STATUS_TYPES.map((status: string, i: number) => (
                            <MenuItem key={i} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        {...baseSelectField} 
                        {...prioritySelectField}
                    >
                        {PRIORITY_TYPES.map((status: string, i: number) => (
                            <MenuItem key={i} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>
                </>
            )}
        </Box>
    );
}