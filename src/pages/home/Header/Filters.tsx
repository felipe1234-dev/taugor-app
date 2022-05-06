// Libs
import { 
    useContext,
    useEffect,
    useState
} from "react";
import {
    Box,
    Grid,
    Typography,
    SwipeableDrawer,
    TextField,
    MenuItem,
    SwipeableDrawerProps,
} from "@mui/material";

// Hooks
import { useQueryParams, useOnMobile } from "@local/hooks";

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
    const queryParams = useQueryParams();
    const isMobile = useOnMobile("md");
    
    const initialStatus   = queryParams.get("status") as Status || "Todos";
    const initialPriority = queryParams.get("priority") as Priority || "Todas";
    
    const [status, setStatus]     = useState<"Todos" | Status>(initialStatus);
    const [priority, setPriority] = useState<"Todas" | Priority>(initialPriority);
    
    const { filter, setFilter } = useContext(FilterContext);
    
    useEffect(() => {
        const { where } = filter;
        
        const conditions = !!where ? where.filter((where) => {
            return !["status", "priority"].includes(where[0] as string)
        }) : [];
    
        if (status !== "Todos") {
            conditions.push(["status", "==", status]);
            queryParams.set("status", status);
        } else {
            queryParams.delete("status");
        }
        
        if (priority !== "Todas") {
            conditions.push(["priority", "==", priority]);
            queryParams.set("priority", priority);
        } else {
            queryParams.delete("priority");
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

    const selects = [
        {
            label: "Situação",
            value: status,
            onChange: (event: any) => setStatus(event.target.value),
            options: [ "Todos", ...STATUS_TYPES ]
        },
        {    
            label: "Urgência",
            value: priority,
            onChange: (event: any) => setPriority(event.target.value),
            options: [ "Todas", ...PRIORITY_TYPES ]
        }
    ];
    
    return (
        <SwipeableDrawer 
            swipeAreaWidth={swipeAreaWidth}
            {...swipeableDrawer}
        >
            <Box sx={{ minHeight: swipeAreaWidth }}>
                <Box className="HomePage-filters-puller" />
            </Box>
            <Grid 
                container 
                spacing={2}
                sx={{ 
                    px: isMobile ? 2 : 20,
                    py: 2 
                }}
            >
                {selects.map((item, i) => (
                    <Grid key={i} item xs={6}>
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{ m: "1em !important" }}
                        >
                            {item.label}
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            value={item.value}
                            onChange={item.onChange}
                            sx={{ mb: 0, mt: 2 }}
                        >
                            {item.options.map((value, i) => (
                                <MenuItem key={i} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                ))}
            </Grid>
        </SwipeableDrawer>
    );
};