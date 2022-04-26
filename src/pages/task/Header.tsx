// Libs
import { 
    Grid,
    Typography,
    Chip,
    Box
} from "@mui/material";
import {
    PeopleOutlineRounded as PeopleIcon,
    CodeRounded as ProductIcon
} from "@mui/icons-material";

// Constants
import { PRIORITY_ICONS, STATUS_ICONS } from "@local/constants";

// Interfaces 
import { Task } from "@local/interfaces";

// Help components
const Heading = (task: Task) => {
    const title = {
        className: "TaskPage-header-title",
        component: "h1" as "h1"
    }
    
    const brief = {
        className: "TaskPage-header-brief MuiTypography-root-hasCoolUnderline",
        component: "h2" as "h2",
        style: {
            ["--width"]: "10%"
        }
    }
    
    return (
        <Grid item>
            <Typography {...title}>
                {task.title.join(" ")}
            </Typography>
            <Typography {...brief}>
                {task.brief}
            </Typography>
        </Grid>
    );
};

const ChipList = (task: Task) => {
    const tagChip = (label: string, key: number) => ({
        key: key,
        component: "span" as "span",
        label: label
    });
    
    const envChip = {
        variant: "outlined" as "outlined",
        component: "span" as "span",
        label: task.environment
    }
    
    return (
        <Grid item>
            {task.tags.map((tag: string, i: number) => (
                <Chip {...tagChip(tag, i)}/>
            ))}
            <Chip {...envChip}/>
        </Grid>
    );
};

const Info = (task: Task) => {
    const box = {
        component: "div" as "div",
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "flex-start",
        sx: {
            mb: ".6em"
        }
    }
    
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
            <Box {...box}>
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
};

// Main component
export default function Header(task: Task) {
    const header = {
        container: true,
        className: "TaskPage-header",
		component: "header" as "header",
        direction: "column" as "column",
        alignItems: "flex-start"
    }
    
    return (
        <Grid {...header}>
            <Heading {...task}/>
            <ChipList {...task}/>
            <Info {...task}/>
        </Grid>
    );
};