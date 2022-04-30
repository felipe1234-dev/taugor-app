// Libs
import { useState } from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import {
    CreateTwoTone as PencilIcon,
    FilterListRounded as FilterListIcon,
    CloseRounded as CloseIcon,
} from "@mui/icons-material";

// Actions components
import Filters from "./Filters";

export default function Actions() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <Grid item>
            <Tooltip title="Lista de filtros">
                <IconButton 
                    className="HomePage-filters-button"
                    onClick={() => setIsOpen(prevState => !prevState)}
                >
                    {!isOpen ? <FilterListIcon /> : <CloseIcon />}
                </IconButton>
            </Tooltip>
            <Filters
                anchor="bottom"
                variant="persistent"
                open={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                swipeAreaWidth={52}
                disableSwipeToOpen={false}
            />
            <Tooltip title="Adicionar uma atividade">
                <IconButton className="HomePage-header-addActivButton">
                    <PencilIcon />
                </IconButton>
            </Tooltip>
        </Grid>
    );
}