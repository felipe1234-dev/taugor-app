// Libs
import {
    useState,
    useEffect,
    useContext
} from "react";
import {
    Drawer,
    DrawerProps,
    IconButton,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { 
    VisibilityRounded as EyeIcon,
    SimCardDownloadRounded as DownloadIcon
} from "@mui/icons-material";
import fileDownload from "js-file-download";

// Local components
import { FileViewer } from "@local/components";

// Hooks
import { useOnMobile } from "@local/hooks";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// API
import { getFileByFilename } from "@local/api/storage/attachments";

// Interfaces
import { Alert, File, Task } from "@local/interfaces";

// Functions
import { getEnv } from "@local/functions";

export default function Attachs({ 
    open = false, 
    task, 
    ...drawer 
}: DrawerProps & { task: Task }) {
    const [files, setFiles] = useState<Array<File>>([]);
    const [openFile, setOpenFile] = useState<File|null>(null);
    const [openViewer, setOpenViewer] = useState<boolean>(false);
    
    const isMobile = useOnMobile("md");
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { storage } = useContext(FirebaseContext);

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
    
    const onOpenFile = (file: File) => {
        setOpenFile(file);
        setOpenViewer(true);
    }
    
    const onDownload = (file: File) => {
        fetch(getEnv("CORS_PROXY") + file.url)
            .then((resp) => resp.blob())
            .then((resp) => fileDownload(resp, file.name));
    }
    
    return (
        <>
            {!!openFile && (
                <FileViewer
                    title={openFile.name}
                    filePath={openFile.url}
                    open={openViewer}
                    onClose={() => setOpenViewer(false)}
                    keepMounted
                />
            )}
            <Drawer
                open={open}
                anchor={isMobile ? "bottom" : "right"}
                variant="persistent"
                PaperProps={{
                    sx: { 
                        maxHeight: isMobile ? "240px" : "100%",
                        minWidth: isMobile ? "100%" : "240px" 
                    }
                }}
                {...drawer}
            >
                <List>
                    {files.length > 0 && files.map((file, i) => (
                        <ListItem
                            key={i}
                            component="li"
                            secondaryAction={(
                                <div style={{ display: "inline-flex" }}>
                                    <IconButton
                                        onClick={() => onOpenFile(file)}
                                        edge="end" 
                                        aria-label="download"
                                        sx={{ mr: ".1em" }}
                                    >
                                        <EyeIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => onDownload(file)}
                                        edge="end" 
                                        aria-label="download"
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                </div>
                            )}
                        >
                            <ListItemText primary={`${file.name}.${file.type}`} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}