// Libs
import {
    Paper,
    Container,
    Typography
} from "@mui/material";

// Page components
import AttachmentList from "./AttachmentList";

// Local components
import { TextEditor } from "@local/components";

// Interfaces
import { Task } from "@local/interfaces";

// Main Component
export default function Body(task: Task) {
    const paper = {
        className: "TaskPage-body",
        sx: { pb: "50px" },
        elevation: 0
    }

    const title = {
        className: "MuiTypography-root-hasCoolUnderline",
        component: "h3" as "h3",
        variant: "h5" as "h5",
        style: {
            ["--width"]: "5%"
        }
    }
    
    const attachList = {
        list: task.attachments
    }

    const textEditor = {
        readOnly: true,
        initialContent: task.description
    }
    
    return (
        <Container component="article">
            <Paper {...paper}>
                <Typography {...title}>
                    Anexos
                </Typography>
                <AttachmentList {...attachList}/>
                
                <Typography {...title}>
                    Descrição
                </Typography>
                <TextEditor {...textEditor}/>
            </Paper>
        </Container>
    );
}