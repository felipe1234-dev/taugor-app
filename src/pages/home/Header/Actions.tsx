// Libs
import { useState } from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import {
    CreateTwoTone as PencilIcon,
    FilterListRounded as FilterListIcon,
    CloseRounded as CloseIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

// Actions components
import Filters from "./Filters";

export default function Actions() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();
    return (
        <Grid item>
            <Filters
                anchor="bottom"
                variant="persistent"
                open={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                swipeAreaWidth={52}
                disableSwipeToOpen={false}
            />
            
            <Grid
                container
                spacing={1}
                sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1
                }}
            >
                <Grid item>
                    <Tooltip title="Lista de filtros">
                        <IconButton 
                            className="HomePage-filters-button"
                            onClick={() => setIsOpen(prevState => !prevState)}
                        >
                            {!isOpen ? <FilterListIcon /> : <CloseIcon />}
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title="Adicionar uma atividade">
                        <IconButton 
                            className="HomePage-header-addActivButton"
                            component={Link}
                            to="/add/"
                            state={{
                                background: location,
                                enableLoader: false
                            }}
                        >
                            <PencilIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
}