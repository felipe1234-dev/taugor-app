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

import { TaskFormContext } from "./index";
import { AlertContext } from "@local/contexts";
import { storage } from "@local/api";
import { getAttach } from "@local/api/storage/attachments";
import { Attach, Task } from "@local/interfaces";

export default function ThirdSection(task: Task) {
    const [attachs, setAttachs] = useState<Array<Attach>>([]);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { update, upload } = useContext(TaskFormContext);
    
    useEffect(() => {
        const attachList: Array<Attach> = [];
        
        task.attachments.forEach((attachname) => {
            getAttach(storage, attachname)
                .then((attach) => {
                    attachList.push(attach);
                    
                    if (attachList.length === task.attachments.length) {
                        setAttachs(attachList);
                    }
                })
                .catch((error) => {
                    setSeverity(error.severity);
                    setMessage(error.message);
                });
        });
    }, [task.attachments]);
    
    useEffect(() => {
        update({
           attachments: attachs.map((item) => `${item.name}-id${item.id}.${item.type}`)
        });
        
        upload(
            attachs
                .filter((item) => item.file !== undefined)
                .map((item) => item.file) as Array<File>
        );
    }, [attachs]);
    
    const onUpload = (event: any) => {
        const value = event.target.value;
        const file = event.target.files[0] as File;
        const attachList: Array<Attach> = JSON.parse(JSON.stringify(attachs));
        
        attachList.push({
            id: file.lastModified,
            name: value.replace("C:\\fakepath\\", "").replace(/\.\w+$/, ""),
            type: value.match(/\.\w+$/)[0].replace(".", ""),
            url: value,
            file: file
        });
         
        setAttachs(attachList);
    }
    
    const onDelete = (file: Attach) => {
        setAttachs(prevState => (
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
                            multiple
                            id="icon-button-file"
                            accept=".pdf,.txt"
                            type="file"
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
                {attachs.map((file, i) => (
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
                        <ListItemText
                            primary={`#${file.id}`} 
                            secondary={`${file.name}.${file.type}`} 
                        />
                    </ListItem>
                ))}
            </List>
        </>
    );
}