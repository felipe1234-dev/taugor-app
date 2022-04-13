// Libs
import { 
    Modal,
    useMediaQuery,
    useTheme
} from "@mui/material";
import PropTypes from "prop-types";

// Styles
import "@app/style/components/FileViewer.scss";

function FileViewer({ 
    open, 
    onClose, 
    title, 
    filePath, 
    ...modalProps 
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    const props = {
        modal: {
            className: "FileViewer",
            open: open,
            onClose: () => !!onClose? onClose() : null,
            ...modalProps
        },
        iframe: {
            title: title,
            src: filePath,
            style: { 
                minWidth: isMobile? "90vw" : "60vw",
                maxWidth: isMobile? "90vw" : "60vw"
            }
        }
    };
    
    return (
        <Modal {...props.modal}>
            {(filePath && open) && (
                <iframe {...props.iframe}></iframe>
            )}
        </Modal>
    );
}

FileViewer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired
};

export default FileViewer;