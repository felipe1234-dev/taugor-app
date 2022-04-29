// Libs
import { Grid } from "@mui/material";

// Header components
import Heading from "./Heading";
import TagList from "./TagList";
import Info from "./Info";
import Attachs from "./Attachs";

// Interfaces 
import { Task } from "@local/interfaces";

export default function Header(task: Task) {
    return (
        <Grid
            container
            className="TaskPage-header"
            component="header"
            direction="column"
            alignItems="flex-start"
        >
            <Heading {...task}/>
            <TagList {...task}/>
            <Info {...task}/>
            <Attachs {...task}/>
        </Grid>
    );
}