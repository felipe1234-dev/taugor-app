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
} from "@material-ui/icons";
import FileViewer from "react-file-viewer";
import PropTypes from "prop-types";

// Contexts
import { FirebaseContext } from "@app/contexts";

// API
import { getURLByFilename } from "@app/storage/attachments";

function AttachmentList({ attachments }) {
    const [files, setFiles] = useState([]);
    const [openFile, setOpenFile] = useState(null);
    
    const { storage } = useContext(FirebaseContext);
    
    useEffect(() => {
        const fetchFiles = async () => {
            const fileList = [];
            
            await attachments.forEach(async (filename) => {
                const url  = await getURLByFilename(storage, filename);
                const type = filename.match(/\.\w+$/)[0].replace(".", "");
                const name = filename.replace(/\-id\d+\.\w+$/, "");
                
                fileList.push({
                    name: name,
                    type: type,
                    url: url
                });
            });
            
            setFiles(fileList);
        }
        
        fetchFiles();
    }, [attachments]);
    
    const props = {
        fileViewer: (url, type) => ({
            filePath: url,
            fileType: type
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
                {files.length > 0 && (
                    files.map((file, i) => (
                        <ListItemButton {...props.listItem(i, file)}>
                            <ListItemIcon>
                                {file.type === "pdf"? (
                                    <PDFFileIcon />
                                ) : file.type === "txt"? (
                                    <TextFileIcon />
                                ) : null}
                            </ListItemIcon>
                            <ListItemText primary={file.name} />
                        </ListItemButton>
                    ))
                )}
            </List>
            <Modal {...props.modal}>
                {(files.length > 0 && !!openFile) && (
                    <FileViewer {...props.fileViewer(openFile.url, openFile.type)}/>
                )}
            </Modal>
        </>
    );
}

AttachmentList.propTypes = {
    attachments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AttachmentList;