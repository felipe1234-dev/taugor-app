// Libs
import { 
    Modal,
    ModalProps,
    useMediaQuery,
    useTheme
} from "@mui/material";

// Styles
import "@local/style/components/FileViewer.scss";

// Props interface
export interface FileViewerProps {
    title?: string,
    filePath: string
};

export default function FileViewer({
    title = "", 
    filePath, 
    ...modal 
}: FileViewerProps & Omit<ModalProps, "children">) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    return (
        <Modal className="FileViewer" {...modal}>
            <iframe
                title={title}
                src={filePath}
                style={{ 
                    minWidth: isMobile? "90vw" : "60vw",
                    maxWidth: isMobile? "90vw" : "60vw"
                }}
            />
        </Modal>
    );
};