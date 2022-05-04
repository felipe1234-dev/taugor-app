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
import { useNavigate, useParams } from "react-router-dom";

// Contexts
import { AlertContext, FirebaseContext } from "@local/contexts";

// API
import { deleteTask } from "@local/api/collections/Tasks";

export default function DeleteDialog() {
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);

    const { uuid: taskUuid } = useParams();
    const navigate = useNavigate();

    const onDelete = () => {
        if (!!taskUuid) {
            deleteTask(db, taskUuid)
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

    return (
        <Dialog
            open
            onClose={() => navigate(`/task/${taskUuid}`, {
                state: { enableLoader: false }
            })}
        >
            <DialogTitle>
                Tem certeza que quer excluir?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta ação não pode ser revertida
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDelete}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};