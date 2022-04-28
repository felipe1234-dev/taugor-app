// Libs
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

// Dialog components
import EditForm from "./EditForm";

export default function EditDialog() {
    const { uuid: taskUuid } = useParams();
    
    const dialog = {
        open: true,
        maxWidth: "lg" as "lg",
        scroll: "paper" as "paper",
        fullWidth: true
    }
    
    const cancelButton = {
        component: Link,
        to: `/task/${taskUuid}`,
        state: { enableLoader: false }
    }
    
    return (
        <Dialog {...dialog}>
            <DialogTitle>
                Editar atividade
            </DialogTitle>
            <DialogContent>
                <EditForm />
            </DialogContent>
            <DialogActions>
                <Button {...cancelButton}>
                    Cancelar
                </Button>
                <Button>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};