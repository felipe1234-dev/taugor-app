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
import { File } from "@local/interfaces";

// Props interface
interface AttachmentListProps {
    list: Array<string>
};

export default function AttachmentList({ list }: AttachmentListProps) {
    const [files, setFiles]           = useState<Array<File>>([]);
    const [openFile, setOpenFile]     = useState<File|null>(null);
    const [openViewer, setOpenViewer] = useState<boolean>(false);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { storage } = useContext(FirebaseContext);

    useEffect(() => {
        const fileList: Array<File> = [];

        list.forEach((filename: string) => {
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

    const listItemButton = (file: File, key: number) => ({
        key: key,
        onClick: () => {
            setOpenFile(file);
            setOpenViewer(true);
        }
    });

    const fileViewer = (file: File) => ({
        keepMounted: true,
        open: openViewer,
        onClose: () => setOpenViewer(false),
        title: file.name,
        filePath: file.url
    });
    
    return (
        <>
            <List>
                {files.length > 0 && files.map((file, i) => (
                    <ListItemButton {...listItemButton(file, i)}>
                        <ListItemIcon>
                            <AttachFileIcon />
                        </ListItemIcon>
                        <ListItemText primary={file.name + "." + file.type} />
                    </ListItemButton>
                ))}
            </List>
            {!!openFile && (
                <FileViewer {...fileViewer(openFile)}/>
            )}
        </>
    );
};