// Libs
import { useState, useContext } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
    Button,
    Modal
} from "@mui/material";
import { 
    ArrowBackIos as GoBackIcon,
    DeleteRounded as DeleteIcon,
    EditTwoTone as EditIcon
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

// API 
import { deleteActivityByUuid } from "@local/api/collections/Activities";

// Contexts
import { 
    AlertContext,
    FirebaseContext,
    UserContext
} from "@local/contexts";

// Interfaces
import { Task } from "@local/interfaces";

export default function Topbar(task: Task) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    
    const navigate  = useNavigate();
    
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
        to: "/",
        replace: true
    }
    
    const box = {
        flexGrow: 1
    }

    const deleteButton = {
        className: "TaskPage-topbar-deleteButton",
        variant: "outlined" as "outlined",
        startIcon: <DeleteIcon />,
        onClick: () => setIsOpen(true)
    }

    const editButton = {
        className: "TaskPage-topbar-editButton",
        variant: "outlined" as "outlined",
        startIcon: <EditIcon />,
        component: Link,
        to: `/edit/${task.uuid}`
    }
    
    const dialog = {
        open: isOpen,
        onClose: () => setIsOpen(false)
    }
    
    const deleteTask = () => {
        deleteActivityByUuid(db, task.uuid)
            .then(() => (
                navigate("/", { replace: true })
            ))
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);
            });
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
                        
                        <Dialog {...dialog}>
                            <DialogTitle>
                                Tem certeza que quer excluir?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Esta ação não pode ser revertida
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setIsOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button onClick={() => deleteTask()}>
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};