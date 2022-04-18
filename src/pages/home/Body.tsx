// Libs
import { 
    Container, 
    Paper, 
    Grid, 
    Typography 
} from "@mui/material";

// Page components
import FilterSelector from "./FilterSelector";
import NoResults from "./NoResults";
import TaskList from "./TaskList";

// Local components
import { Spinner } from "@local/components";

// Interfaces
import { Filter, Timeline } from "@local/interfaces";

// Props interface
interface BodyProps {
    isLoading: boolean,
    timeline: Timeline,
    filter: Filter,
    setFilter(params: Filter): void
};

export default function Body({
    isLoading,
    timeline,
    filter,
    setFilter
}: BodyProps) {
    const paper = {
        className: `HomePage-main${isLoading? " isLoading" : ""}`,
        sx: { pb: "50px" },
        elevation: 0
    }
    
    const grid = {
        container: true,
        sx: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }
    }
    
    const typography = {
        className: "hasCustomBar",
        component: "h5" as "h5",
        variant: "h5" as "h5",
        gutterBottom: true,
        sx: { p: 2 }
    }
    
    const spinner = {
        wrapper: {
            width: "100%",
            height: "300px"
        },
        spinner: {
            width: "2em",
            height: "2em",
            barColor: "var(--light)",
            pathColor: "var(--pale)"
        }
    }
    
    const taskList = { timeline }
    
    const filterSelector = { setFilter, filter }
    
    return (
        <Container sx={{ display: "flex" }}>
            <Paper {...paper}>
                <Grid {...grid}>
                    <Grid item>
                        <Typography {...typography}>
                            Atividades
                        </Typography>
                    </Grid>
                    <Grid item> 
                        <FilterSelector {...filterSelector}/>
                    </Grid>
                </Grid>
                {isLoading? <Spinner {...spinner}/> : (
                    Object.entries(timeline).length > 0? <TaskList {...taskList} /> : <NoResults />
                )}
            </Paper>
        </Container>
    );
};