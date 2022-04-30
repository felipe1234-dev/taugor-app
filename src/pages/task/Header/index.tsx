// Libs
import { useState } from "react";
import { Grid, Button, Tooltip } from "@mui/material";
import {
    AttachFile as AttachFileIcon,
    CloseRounded as CloseIcon
} from "@mui/icons-material";

// Header components
import Heading from "./Heading";
import TagList from "./TagList";
import Info from "./Info";
import Attachs from "./Attachs";

// Interfaces 
import { Task } from "@local/interfaces";

export default function Header(task: Task) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Grid
            container
            className="TaskPage-header"
            component="header"
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            <Heading {...task} />
            <TagList {...task} />
            <Info {...task} />
            <Tooltip title="Lista de anexos">
                <Button 
                    className="TaskPage-header-seeAttachs"
                    startIcon={!isOpen ? <AttachFileIcon /> : <CloseIcon />}
                    onClick={() => setIsOpen(prevState => !prevState)}
                >
                    {!isOpen ? "Ver anexos" : "Fechar anexos"}
                </Button>
            </Tooltip>
            <Attachs 
                open={isOpen}
                onClose={() => setIsOpen(false)}
                task={task} 
            />
        </Grid>
    );
}