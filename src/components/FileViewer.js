// Libs
import { Modal } from "@mui/material";
import PropTypes from "prop-types";

// Styles
import "@app/style/components/FileViewer.scss";

function FileViewer({ open, onClose, title, filePath, ...props }) {
    const props = {
        modal: {
            className: "FileViewer",
            open: open,
            onClose: () => !!onClose? onClose() : null,
            ...props
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

FileViewer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired
};

export default FileViewer;