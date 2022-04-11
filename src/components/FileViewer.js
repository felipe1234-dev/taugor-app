import { Modal } from "@mui/material";

function FileViewer({ open, onClose, title, filePath }) {
    const props = {
        modal: {
            open: open,
            onClose: () => !!onClose? onClose() : null
        },
        iframe: {
            title: title,
            src: filePath
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

export default FileViewer;