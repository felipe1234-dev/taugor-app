import { Modal } from "@mui/material";

function FileViewer({ open, onClose, filePath }) {
    const props = {
        modal: {
            open: open,
            onClose: () => !!onClose? onClose() : null
        },
        iframe: {
            sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
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