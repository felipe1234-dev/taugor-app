import { 
    useState,
    useEffect, 
    useContext,
    ChangeEvent
} from "react";
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

import { TaskFormContext } from "../index";
import { AlertContext } from "@local/contexts";
import { storage } from "@local/api";
import { getAttach } from "@local/api/storage/attachments";
import { Alert } from "@local/interfaces";

export default function ThirdStep() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { 
        updateTask, 
        updates, 
        uploadFiles, 
        uploads, 
        task 
    } = useContext(TaskFormContext);
    
    useEffect(() => {
        if (!!updates)  {
            const attachList = updates.attachments ?? [];
            
            if (attachList.length > 0) {
                return;
            }
        }
        
        setIsLoading(true);
        
        const fileList: Array<File> = [];
        
        task.attachments?.forEach((name) => {
            getAttach(storage, name)
                .then((attach) => {
                    fileList.push(attach.file);
                    
                    if (fileList.length === task.attachments?.length) {
                        uploadFiles("reset", fileList);
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    setSeverity((error as Alert).severity);
                    setMessage((error as Alert).message);
                });
        });
    }, [task.attachments]);
    
    useEffect(() => {
        updateTask({
            attachments: uploads.map((file) => {
                const ext  = file.name.replace(/^.+\.(\w+)$/, "$1");
                const name = file.name.replace("." + ext, "");
                const id   = file.lastModified;
            
                return `${name}-id${id}.${ext}`;
            })
        });
    }, [uploads]);
    
    const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target?.files || [];
        const file  = files.length > 0 ? files[0] : null;
        
        if (!!file) {
            uploadFiles("add", [ file ]);
        }
    };
    
    const onDelete = (file: File) => {
        uploadFiles("reset", uploads.filter(item => item !== file));
    };
    
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
                            onChange={onUpload}
                        />
                        <Button 
                            variant="contained"
                            color="primary" 
                            aria-label="uploadFiles file" 
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
                {!isLoading ? (
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