// Libs
import { Grid, Box } from "@mui/material";
import {
    PeopleOutlineRounded as PeopleIcon,
    CodeRounded as ProductIcon
} from "@mui/icons-material";

// Constants
import { PRIORITY_ICONS, STATUS_ICONS } from "@local/constants";

// Interfaces 
import { Task } from "@local/interfaces";

export default function Info(task: Task) {
    const item = {
        component: "span" as "span",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "flex-start",
        alignItems: "center",
        sx: {
            mb: ".6em",
            mr: "1.2em"
        }
    }
    
    return (
        <Grid item>
            <Box 
                component="div"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{ mb: ".6em" }}
            >
                <Box {...item}>
                    {STATUS_ICONS[task.status]} {task.status}
                </Box>
                <Box {...item}>
                    {PRIORITY_ICONS[task.priority]} Prioridade {task.priority}
                </Box>
                <Box {...item}>
                    <PeopleIcon /> {task.influencedUsers} usuários impactados
                </Box>
                <Box {...item}>
                    <ProductIcon /> {task.product}
                </Box>
            </Box>
        </Grid>
    );
}