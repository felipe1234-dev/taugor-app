// Libs
import { Box } from "@mui/material";

function IsFetching() {
    const props = {
        box: {
            display: "flex",
			alignItems: "center",
			justifyContent: "center",
			sx: { 
                width: "100%", 
                minHeight: "300px"
            }
        },
        spinner: {
            className: "Spinner",
            style: {
                width: "2em",
                height: "2em",
                "--bar": "var(--gray)",
                "--path": "var(--gray-light)"
            }
        }
    }
    
    return (
        <Box {...props.box}>
            <div {...props.spinner}></div>
        </Box>
    );
}

export default IsFetching;