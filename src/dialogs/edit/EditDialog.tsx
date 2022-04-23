// Libs
import {
    Dialog
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function EditDialog() {
    const { uuid: taskUuid } = useParams();
    
    const dialog = {
        open: true
    }
    
    return (
        <Dialog {...dialog}>
            {taskUuid}
        </Dialog>
    );
};