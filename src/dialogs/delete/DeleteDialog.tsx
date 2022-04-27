// Libs
import { useContext } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import { 
    Link, 
    useNavigate, 
    useParams 
} from "react-router-dom";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// API
import { deleteActivityByUuid } from "@local/api/collections/Activities";

export default function DeleteDialog() {
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);
    
    const { uuid: taskUuid } = useParams();
    const navigate = useNavigate();
    
    const dialog = {
        open: true
    }
    
    const cancelButton = {
        component: Link,
        to: `/task/${taskUuid}`,
        replace: true,
        state: { enableLoader: false }
    }
    
    const deleteButton = {
        onClick: () => {
            if (!!taskUuid) {
                deleteActivityByUuid(db, taskUuid)
                    .then(() => {
                        setSeverity("success");
                        setMessage("Atividade excluída com sucesso");
                        
                        setTimeout(() => {
                            navigate("/", { 
                                replace: true, 
                                state: {
                                    enableLoader: true 
                                }
                            });
                        }, 4000);
                    })
                    .catch((error) => {
                        setSeverity(error.severity);
                        setMessage(error.message);
                    });
            }
        }
    }
    
    return (
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
                <Button {...cancelButton}>
                    Cancelar
                </Button>
                <Button {...deleteButton}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};