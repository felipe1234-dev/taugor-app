// Libs
import React, { 
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
        listItem: (i, file) => ({
            key: i, 
            onClick: () => setOpenFile(file)
        }),
        fileViewer:  () => ({
            open: !!openFile && files.length > 0,
            onClose: () => setOpenFile(null),
            title: openFile.name? openFile.name : null,
            filePath: openFile.url? openFile.url : null,
            keepMounted: true
        })
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
            {(files.length > 0 && !!openFile) && (
                <FileViewer {...props.fileViewer()}/>
            )}
        </>
    );
}

AttachmentList.propTypes = {
    attachments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AttachmentList;