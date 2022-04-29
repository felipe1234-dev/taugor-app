// Libs
import {
    useState,
    useEffect,
    useContext
} from "react";
import {
    List,
    ListItemIcon,
    ListItemButton,
    ListItemText
} from "@mui/material";
import {
    AttachFile as AttachFileIcon
} from "@mui/icons-material";

// Local components
import { FileViewer } from "@local/components";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// API
import { getFileByFilename } from "@local/api/storage/attachments";

// Interfaces
import { File, Task } from "@local/interfaces";

export default function Attachs(task: Task) {
    const [files, setFiles] = useState<Array<File>>([]);
    const [openFile, setOpenFile] = useState<File|null>(null);
    const [openViewer, setOpenViewer] = useState<boolean>(false);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { storage } = useContext(FirebaseContext);

    useEffect(() => {
        const fileList: Array<File> = [];

        task.attachments.forEach((filename) => {
            getFileByFilename(storage, filename)
                .then((file) => (
                    fileList.push(file) 
                ))
                .catch((error) => {
                    setSeverity(error.severity);
                    setMessage(error.message);
                });
        });
        
        setFiles(fileList);
    }, []);
    
    return (
        <>
            <List>
                {files.length > 0 && files.map((file, i) => (
                    <ListItemButton 
                        key={i}
                        onClick={() => {
                            setOpenFile(file);
                            setOpenViewer(true);
                        }}
                    >
                        <ListItemIcon>
                            <AttachFileIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary={file.name + "." + file.type} 
                        />
                    </ListItemButton>
                ))}
            </List>
            {!!openFile && (
                <FileViewer
                    title={openFile.name}
                    filePath={openFile.url}
                    open={openViewer}
                    onClose={() => setOpenViewer(false)}
                    keepMounted
                />
            )}
        </>
    );
}