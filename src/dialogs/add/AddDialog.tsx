import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
            
        </Dialog>
    );
};