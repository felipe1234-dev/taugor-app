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
    const infoItems = [
        {
            icon: STATUS_ICONS[task.status],
            text: task.status
        },
        {
            icon: PRIORITY_ICONS[task.priority],
            text: `Prioridade ${task.priority}`
        },
        {
            icon: <PeopleIcon />,
            text: `${task.influencedUsers} usuários impactados`
        },
        {
            icon: <ProductIcon />,
            text: task.product
        }
    ]
    
    return (
        <Grid item>
            <Box 
                component="ul"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{ mb: ".6em" }}
            >
                {infoItems.map((item) => (
                    <Box
                        component="li"
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{ 
                            mb: ".6em", 
                            mr: "1.2em" 
                        }}
                    >
                        {item.text}
                    </Box>
                ))}
            </Box>
        </Grid>
    );
}