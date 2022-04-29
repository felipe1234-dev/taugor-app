// Libs
import { CSSProperties } from "react";
import { Grid, Typography } from "@mui/material";

// Interfaces
import { Task } from "@local/interfaces";

export default function Heading(task: Task) {
    return (
        <Grid item>
            <Typography        
                className="TaskPage-header-title"
                component="h1"
            >
                {task.title.join(" ")}
            </Typography>
            <Typography
                className="TaskPage-header-brief MuiTypography-root-hasCoolUnderline"
                component="h2"
                style={{ 
                    "--underline-width": "10%" 
                } as CSSProperties}
            >
                {task.brief}
            </Typography>
        </Grid>
    );
}