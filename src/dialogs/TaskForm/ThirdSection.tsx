import { 
    useState, 
    useEffect, 
    useContext
} from "react";
import { 
    List,
    ListItem, 
    IconButton,
    ListItemText,
    DialogContentText,
    Grid
} from "@mui/material";
import { 
    Delete as DeleteIcon, 
    UploadFileRounded as UploadFileIcon
} from "@mui/icons-material";

import { AlertContext } from "@local/contexts";
import { storage } from "@local/api";
import { getFileByFilename } from "@local/api/storage/attachments";
import { File, Task } from "@local/interfaces";

export default function ThirdSection(task: Task) {
    const [files, setFiles] = useState<Array<File>>([]);
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    useEffect(() => {
        const fileList: Array<File> = [];
        
        task.attachments.forEach((filename) => {
            getFileByFilename(storage, filename)
                .then((file) => {
                    fileList.push(file);
                    
                    if (fileList.length === task.attachments.length) {
                        setFiles(fileList);
                    }
                })
                .catch((error) => {
                    setSeverity(error.severity);
                    setMessage(error.message);
                });
        });
    }, []);
    
    const onUpload = (event: any) => {
        const value = event.target.value;
        const fileList: Array<File> = JSON.parse(JSON.stringify(files));
        
        fileList.push({
            name: value.replace("C:\\fakepath\\", "").replace(/\.\w+$/, ""),
            type: value.match(/\.\w+$/)[0].replace(".", ""),
            url: value
        });
        
        setFiles(fileList);
    }
    
    const onDelete = (file: File) => {
        setFiles(prevState => (
            prevState.filter(item => item !== file)
        ));
    }
    
    return (
        <>
            <Grid
                container
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <DialogContentText mt={2}>
                        Anexos
                    </DialogContentText>
                </Grid>
                <Grid item>
                    <label htmlFor="icon-button-file">
                        <input 
                            id="icon-button-file"
                            accept=".pdf,.txt"
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            onInput={(event: any) => onUpload(event)}
                        />
                        <IconButton 
                            color="primary" 
                            aria-label="upload file" 
                            component="span"
                        >
                            <UploadFileIcon />
                        </IconButton>
                    </label>
                </Grid>
            </Grid>
            <List>
                {files.map((file, i) => (
                    <ListItem
                        key={i}
                        secondaryAction={(
                            <IconButton 
                                color="primary"
                                onClick={() => onDelete(file)}
                                edge="end" 
                                aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    >
                        <ListItemText primary={`${file.name}.${file.type}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}