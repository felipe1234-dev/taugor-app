import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskForm from "../TaskForm";

export default function AddDialog() {
    const navigate = useNavigate();
    
    return (
        <Dialog
            open
            fullWidth
            maxWidth="md"
            scroll="paper"
            onClose={() => (
                navigate("/", { state: { enableLoader: false }})
            )}
        >
            <TaskForm formTitle="Adicionar atividade"/>
        </Dialog>
    );
};