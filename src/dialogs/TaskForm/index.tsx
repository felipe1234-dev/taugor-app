// Libs
import { Box } from "@mui/material";

// TaskForm components
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";

// Interfaces
import { Task } from "@local/interfaces";

export default function TaskForm(task: Task) {
    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2,
                mt: 2,
                width: "100%"
            }}
        >
            <FirstSection {...task}/>
            <SecondSection {...task}/>
            <ThirdSection {...task}/>
            <FourthSection {...task}/>
        </Box>
    );
};