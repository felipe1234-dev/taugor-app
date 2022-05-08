import { useEffect, useContext } from "react";
import { 
    Button,
    List,
    ListItem, 
    IconButton,
    DialogTitle,
    ListItemText,
    Skeleton,
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
import { Alert } from "@local/interfaces";

export default function ThirdSection() {
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { update, upload, uploads, task } = useContext(TaskFormContext);
    
    useEffect(() => {
        if (uploads.length > 0) {
            return;
        }
        
        const fileList: Array<File> = [];
        
        task.attachments?.forEach((name) => {
            getAttach(storage, name)
                .then((attach) => {
                    fileList.push(attach.file);
                    
                    if (fileList.length === task.attachments?.length) {
                        upload("reset", fileList);
                    }
                })
                .catch((error) => {
                    setSeverity((error as Alert).severity);
                    setMessage((error as Alert).message);
                });
        });
    }, [task.attachments]);
    
    useEffect(() => {
        update({
            attachments: uploads.map((file) => {
                const ext  = file.name.replace(/^.+\.(\w+)$/, "$1");
                const name = file.name.replace("." + ext, "");
                const id   = file.lastModified;
            
                return `${name}-id${id}.${ext}`;
            })
        });
    }, [uploads]);
    
    const onUpload = (event: any) => {
        const file: File = event.target.files[0];
        upload("add", [ file ]);
    }
    
    const onDelete = (file: File) => {
        upload("reset", uploads.filter(item => item !== file));
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
                    <DialogTitle sx={{ pl: 0, mt: 2 }}>
                        Anexos
                    </DialogTitle>
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
                        <Button 
                            variant="contained"
                            color="primary" 
                            aria-label="upload file" 
                            component="span"
                            endIcon={<UploadFileIcon />}
                            disableElevation
                            sx={{ textTransform: "none" }}
                        >
                            Fazer upload
                        </Button>
                    </label>
                </Grid>
            </Grid>
            <List>
                {(uploads.length > 0) ? (
                    uploads.map((file, i) => (
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
                                primary={`#${file.lastModified}`} 
                                secondary={`${file.name} (${file.type})`} 
                            />
                        </ListItem>
                    ))
                ) : (
                    [...Array(4).keys()].map((key) => (
                        <ListItem
                            key={key}
                            secondaryAction={(
                                <Skeleton 
                                    variant="circular" 
                                    width={40} height={40} 
                                />
                            )}
                        >
                            <ListItemText
                                primary={(
                                    <Skeleton 
                                        variant="text" 
                                        width={150}
                                    />
                                )} 
                                secondary={(
                                    <Skeleton 
                                        variant="text" 
                                        width={150}
                                    />
                                )} 
                            />
                        </ListItem>
                    ))
                )}
            </List>
        </>
    );
};