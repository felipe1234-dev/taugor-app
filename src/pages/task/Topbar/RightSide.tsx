// Libs
import { Button } from "@mui/material";
import {
    DeleteRounded as DeleteIcon,
    EditTwoTone as EditIcon
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

// Interfaces
import { Task } from "@local/interfaces";

export default function RightSide(task: Task) {
    const location = useLocation();
    
    return (
        <>
            <Button
                className="TaskPage-topbar-deleteButton"
                variant="outlined"
                startIcon={<DeleteIcon />}
                component={Link}
                to={`/delete/${task.uuid}`}
                state={{
                    background: location,
                    enableLoader: false,
                }}
            >
                Excluir
            </Button>
            <Button
                className="TaskPage-topbar-editButton"
                variant="outlined"
                startIcon={<EditIcon />}
                component={Link}
                to={`/edit/${task.uuid}`}
                state={{
                    background: location,
                    enableLoader: false,
                }}
            >
                Editar
            </Button>
        </>
    );
}