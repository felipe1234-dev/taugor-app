// Libs
import React, { useContext } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Tooltip,
    Button
} from "@mui/material";
import { 
    ArrowBackIos as GoBackIcon,
    DeleteRounded as DeleteIcon,
    EditTwoTone as EditIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Contexts
import { UserContext } from "@local/contexts";

// Interfaces
import { Task } from "@local/interfaces";

export default function Topbar(task: Task) {
    const { user } = useContext(UserContext);
    
    const appBar = {
        className: "TaskPage-topbar",
        component: "nav",
        position: "sticky" as "sticky",
        elevation: 0
    }
    
    const tooltip = {
        title: "Voltar"
    }

    const backButton = {
        component: Link,
        to: "/"
    }
    
    const box = {
        flexGrow: 1
    }

    const deleteButton = {
        className: "TaskPage-topbar-deleteButton",
        variant: "outlined" as "outlined",
        startIcon: <DeleteIcon />
    }

    const editButton = {
        className: "TaskPage-topbar-editButton",
        variant: "outlined" as "outlined",
        startIcon: <EditIcon />,
        component: Link,
        to: `/edit/${task.uuid}`
    }
    
    return (
        <AppBar {...appBar}>
            <Toolbar>
                <Tooltip {...tooltip}>
                    <IconButton {...backButton}>
                        <GoBackIcon />
                    </IconButton>
                </Tooltip>
                <Box {...box}/>
                {(!!user && task.postedBy === user.uuid) && (
                    <>
                        <Button {...deleteButton}>
                            Excluir
                        </Button>
                        <Button {...editButton}>
                            Editar
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};