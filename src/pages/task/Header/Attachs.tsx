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
import { getAttach } from "@local/api/storage/attachments";

// Interfaces
import { Attach, Task } from "@local/interfaces";

// Functions
import { getEnv } from "@local/functions";

export default function Attachs({ 
    open = false, 
    task, 
    ...drawer 
}: DrawerProps & { task: Task }) {
    const [attachs, setAttachs] = useState<Array<Attach>>([]);
    const [openAttach, setOpenAttach] = useState<Attach|null>(null);
    const [openViewer, setOpenViewer] = useState<boolean>(false);
    
    const isMobile = useOnMobile("md");
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { storage } = useContext(FirebaseContext);

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
    }, []);
    
    const onOpen = (attach: Attach) => {
        setOpenAttach(attach);
        setOpenViewer(true);
    }
    
    const onDownload = (attach: Attach) => {
        fetch(getEnv("CORS_PROXY") + attach.url)
            .then((resp) => resp.blob())
            .then((resp) => fileDownload(resp, attach.name));
    }
    
    return (
        <>
            {!!openAttach && (
                <FileViewer
                    title={openAttach.name}
                    filePath={openAttach.url}
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
                    {attachs.map((attach, i) => (
                        <ListItem
                            key={i}
                            component="li"
                            secondaryAction={(
                                <div style={{ display: "inline-flex" }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => onOpen(attach)}
                                        edge="end" 
                                        aria-label="download"
                                        sx={{ mr: ".1em" }}
                                    >
                                        <EyeIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={() => onDownload(attach)}
                                        edge="end" 
                                        aria-label="download"
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                </div>
                            )}
                        >
                            <ListItemText
                                primary={`#${attach.id}`} 
                                secondary={`${attach.name}.${attach.type}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}