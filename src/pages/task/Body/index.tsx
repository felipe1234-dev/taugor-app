// Libs
import { Container, Paper } from "@mui/material";

// Local components
import { TextEditor } from "@local/components";

// Interfaces
import { Task } from "@local/interfaces";

export default function Body(task: Task) {
    return (
        <Container component="article">
            <Paper         
                className="TaskPage-body"
                elevation={0}
                sx={{ pb: "50px" }}
            >
                <TextEditor
                    initialContent={task.description}
                    readOnly
                />
            </Paper>
        </Container>
    );
}