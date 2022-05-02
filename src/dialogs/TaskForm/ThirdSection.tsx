import { 
    useState, 
    useEffect, 
    useContext
} from "react";
import { 
    List,
    ListItem, 
    IconButton,
    ListItemText 
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { AlertContext } from "@local/contexts";
import { storage } from "@local/api";
import { getFileByFilename } from "@local/api/storage/attachments";
import { Alert, File, Task } from "@local/interfaces";

export default function ThirdSection(task: Task) {
    const [files, setFiles] = useState<Array<File>>([]);
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    useEffect(() => {
        const fileList: Array<File> = [];
        
        task.attachments.forEach(async (filename) => {
            try {
                const file = await getFileByFilename(storage, filename);
                fileList.push(file);
            } catch (error) {
                setSeverity((error as Alert).severity);
                setMessage((error as Alert).message);
            }
        });
        
        setFiles(fileList);
    }, []);
    
    return (
        <List>
            {files.map((file, i) => (
                <ListItem
                    key={i}
                    secondaryAction={(
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    )}
                >
                    <ListItemText primary={file.name} />
                </ListItem>
            ))}
        </List>
    );
}