// Libs
import React, { 
    useState,
    useEffect,
    useContext
} from "react";
import {
    Modal,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    List
} from "@mui/material";
import {
    DescriptionRounded as TextFileIcon,
    PictureAsPdfRounded as PDFFileIcon
} from "@mui/icons-material";
import PropTypes from "prop-types";

// Components
import { FileViewer } from "@app/components";

// Contexts
import { FirebaseContext, AlertContext } from "@app/contexts";

// API
import { getURLByFilename, handleError } from "@app/storage/attachments";

function AttachmentList({ attachments }) {
    const [files, setFiles] = useState([]);
    const [openFile, setOpenFile] = useState(null);
    
    const { storage } = useContext(FirebaseContext);
    const { setSeverity, setMessage } = useContext(AlertContext);
    
    useEffect(() => {
        const fetchFiles = () => {
            const fileList = [];
            
            attachments.forEach(async (filename) => {
                getURLByFilename(storage, filename)
                .then((url) => {
                    const type = filename.match(/\.\w+$/)[0].replace(".", "");
                    const name = filename.replace(/-id\d+\.\w+$/, "");
                    
                    fileList.push({
                        name: name,
                        type: type,
                        url: url
                    });
                    
                    if (fileList.length === attachments.length) {
                        setFiles(fileList);
                    }
                })
                .catch((error) => {
                    const errData = handleError(error);
            
                    setMessage(errData.message);
                    setSeverity(errData.severity);
                });
            });
        }
        
        fetchFiles();
    }, []);
    
    const props = {
        fileViewer: ({ url, type }) => ({
            filePath: url
        }),
        listItem: (i, file) => ({
            key: i, 
            onClick: () => setOpenFile(file)
        }),
        modal: {
            open: !!openFile,
            onClose: () => setOpenFile(null)
        }
    };
    
    return (
        <>
            <List>
                {files.length > 0 && files.map((file, i) => (
                    <ListItemButton {...props.listItem(i, file)}>
                        <ListItemIcon>
                            {file.type === "pdf"? (
                                <PDFFileIcon />
                            ) : file.type === "txt"? (
                                <TextFileIcon />
                            ) : null}
                        </ListItemIcon>
                        <ListItemText primary={file.name + "." + file.type} />
                    </ListItemButton>
                ))}
            </List>
            <Modal {...props.modal}>
                {(files.length > 0 && !!openFile) && (
                    <FileViewer {...props.fileViewer(openFile)}/>
                )}
            </Modal>
        </>
    );
}

AttachmentList.propTypes = {
    attachments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AttachmentList;