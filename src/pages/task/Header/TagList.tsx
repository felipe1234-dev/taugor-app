// Libs
import { Chip, Grid } from "@mui/material";

// Interfaces
import { Task } from "@local/interfaces";

export default function TagList(task: Task) {
    return (
        <Grid item>
            {task.tags.map((tag, i) => (
                <Chip 
                    key={i}
                    component="span"
                    label={tag}
                />
            ))}
            <Chip
                component="span"
                variant="outlined"
                label={task.environment}
            />
        </Grid>
    );
};