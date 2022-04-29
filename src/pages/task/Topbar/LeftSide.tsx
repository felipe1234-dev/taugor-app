// Libs
import { Tooltip, IconButton } from "@mui/material";
import { ArrowBackIos as GoBackIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function LeftSide() {
    return (
        <Tooltip title="Voltar">
            <IconButton
                component={Link}
                to="/"
                replace
                state={{ enableLoader: true }}
            >
                <GoBackIcon />
            </IconButton>
        </Tooltip>
    );
}