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
    MenuItem,
    Divider
} from "@mui/material";
import { useParams } from "react-router-dom";

// Local components
import { ChipField, TextEditor } from "@local/components"; 

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// Interfaces
import { Task } from "@local/interfaces";

// API
import { getActivityByUuid } from "@local/api/collections/Activities";

// Constants
import { 
    STATUS_TYPES,
    PRIORITY_TYPES,
    ENV_TYPES,
    INFLUENCED_USERS,
    TAGS
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
    
    const baseTextField = (
        name: string, 
        placeholder: string, 
        length: number,
        value: string
    ) => ({
        name: name,
        placeholder: placeholder,
        defaultValue: value,
        inputProps: {
            maxLength: length
        },
        
        required: true,
        maxRows: 4,
        fullWidth: true,
        multiline: true,
        sx: {
            mb: 0,
            mt: 2,
        }
    });
    
    const baseSelectField = (name: string, value: string) => ({
        name: name,
        defaultValue: value,
        
        required: true,
        select: true,
        sx: {
            mb: 0,
            mt: 2
        }
    });
    
    const chipField = (name: string, placeholder: string, value: Array<string>) => ({
        name: name,
        placeholder: placeholder,
        defaultValue: value,
        options: [ ...TAGS ],
        
        required: true,
        maxRows: 4,
        fullWidth: true,
        multiline: true
    });
    
    const dialogContentText = {
        sx: {
            mt: 2
        }
    }
    
    const divider = {
        sx: {
            m: 2
        }
    }
    
    const textEditor = (initialContent: string) => ({
        isPreview: false,
        initialContent: initialContent,
        onChange: (html: string) => {
            console.log(html);
        }
    });
    
    return (
        <Box {...form}>
            {!!task && (
                <>
                    {/* TITLE & BRIEF*/}
                    <DialogContentText {...dialogContentText}>
                        Título & descrição breve
                    </DialogContentText>
                    <TextField
                        {...baseTextField("title", "Título", 50, task.title.join(" "))}
                    />
                    <TextField
                        {...baseTextField("brief", "Explicação breve", 150, task.brief)}
                    />
                    <Divider {...divider}/>
                    
                    {/* DESCRIPTION */}
                    <TextEditor 
                        {...textEditor(task.description)}
                    />
                    
                    <Divider {...divider}/>
                    <ChipField 
                        {...chipField("tags", "Categorias", task.tags)}
                    />
                    <Divider {...divider}/>
                    
                    {/* STATUS */}
                    <DialogContentText {...dialogContentText}>
                        Situação atual
                    </DialogContentText>
                    <TextField
                        {...baseSelectField("status", task.status)}
                    >
                        {STATUS_TYPES.map((value, i) => (
                            <MenuItem key={i} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    {/* PRIORITY */}
                    <DialogContentText {...dialogContentText}>
                        Nível de urgência
                    </DialogContentText>
                    <TextField 
                        {...baseSelectField("priority", task.priority)}
                    >
                        {PRIORITY_TYPES.map((value, i) => (
                            <MenuItem key={i} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    {/* ENVIRONMENT */}
                    <DialogContentText {...dialogContentText}>
                        Ambiente
                    </DialogContentText>
                    <TextField
                        {...baseSelectField("environment", task.environment)}
                    >
                        {ENV_TYPES.map((value, i) => (
                            <MenuItem key={i} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    {/* INFLUENCED USERS */}
                    <DialogContentText {...dialogContentText}>
                        Usuários influenciados
                    </DialogContentText>
                    <TextField
                        {...baseSelectField("influencedUsers", task.influencedUsers)}
                    >
                        {INFLUENCED_USERS.map((value, i) => (
                            <MenuItem key={i} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                </>
            )}
        </Box>
    );
}