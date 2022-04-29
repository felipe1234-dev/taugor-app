// Libs
import { 
    useContext,
    useEffect,
    useState
} from "react";
import {
    Box,
    Typography,
    SwipeableDrawer,
    FormControl,
    Select,
    MenuItem,
    SwipeableDrawerProps,
} from "@mui/material";

// Contexts
import { FilterContext } from "../contexts";

// Constants
import { STATUS_TYPES, PRIORITY_TYPES } from "@local/constants";

// Types
import { Priority, Status } from "@local/types";

export default function Filters({ 
    swipeAreaWidth, 
    ...swipeableDrawer 
}: SwipeableDrawerProps) {
    const [status, setStatus]     = useState<"Todos" | Status>("Todos");
    const [priority, setPriority] = useState<"Todas" | Priority>("Todas");
    const { filter, setFilter }   = useContext(FilterContext);
    
    useEffect(() => {
        const { where } = filter;
        
        const conditions = !!where ? where.filter((where) => {
            return !["status", "priority"].includes(where[0] as string)
        }) : [];
    
        if (status !== "Todos") {
            conditions.push(["status", "==", status]);
        }
        
        if (priority !== "Todas") {
            conditions.push(["priority", "==", priority]);
        }
        
        /* Quando temos um objeto com propriedades duplicadas, o valor que 
         * vier por último tem prioridade, portanto, "where: conditions" 
         * sobrescreverá "filter.where".
         */
        setFilter({
            ...filter,
            where: conditions
        });
    }, [priority, status]);

    return (
        <SwipeableDrawer 
            swipeAreaWidth={swipeAreaWidth}
            {...swipeableDrawer}
        >
            <Box sx={{ minHeight: swipeAreaWidth }}>
                <Box className="HomePage-filters-puller" />
            </Box>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "2em !important",
                }}
            >
                <FormControl component="label">
                    <Typography
                        component="span"
                        variant="body1"
                        sx={{ m: "1em !important" }}
                    >
                        Status:
                    </Typography>
                </FormControl>
                <FormControl>
                    <Select
                        value={status}
                        onChange={(event: any) => setStatus(event.target.value)}
                    >
                        {["Todos", ...STATUS_TYPES].map((status, i) => (
                            <MenuItem key={i} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl component="label">
                    <Typography
                        component="span"
                        variant="body1"
                        sx={{ m: "1em !important" }}
                    >
                        Prioridade:
                    </Typography>
                </FormControl>
                <FormControl>
                    <Select
                        value={priority}
                        onChange={(event: any) => setPriority(event.target.value)}
                    >
                        {["Todas", ...PRIORITY_TYPES].map((priority, i) => (
                            <MenuItem key={i} value={priority}>
                                {priority}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </SwipeableDrawer>
    );
};