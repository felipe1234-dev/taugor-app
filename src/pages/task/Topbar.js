// Libs
import React, { useContext } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
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
import PropTypes from "prop-types";

// Contexts
import { UserContext } from "@app/contexts";

function Topbar({ taskUuid, senderUuid }) {
    const [user] = useContext(UserContext);
    
    const props = {
        appBar: {
            className: "TaskPage-topbar",
            component: "nav",
            position: "sticky",
            elevation: 0
        },
        backButton: {
            component: Link,
            to: "/"
        },
        deleteButton: {
            className: "TaskPage-topbar-deleteButton",
            variant: "outlined", 
            startIcon: <DeleteIcon />
        },
        editButton: {
            className: "TaskPage-topbar-editButton",
            variant: "outlined", 
            startIcon: <EditIcon />,
            component: Link,
            to: `/edit/${taskUuid}`
        }
    };
    
    return (
        <AppBar {...props.appBar}>
            <Toolbar>
                <Tooltip title="Voltar">
                    <IconButton {...props.backButton}>
                        <GoBackIcon />
                    </IconButton>
                </Tooltip>
                <Box flexGrow={1} />
                {senderUuid === user.uuid && (
                    <>
                        <Button {...props.deleteButton}>
                            Excluir
                        </Button>
                        <Button {...props.editButton}>
                            Editar
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

Topbar.propTypes = {
    taskUuid: PropTypes.string.isRequired,
    senderUuid: PropTypes.string.isRequired
};

export default Topbar;