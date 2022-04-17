// Libs
import React from "react";
import { Box } from "@mui/material";

function IsFetching(): JSX.Element {
    return (
        <Box
            display="flex"
			alignItems="center"
			justifyContent="center"
			sx={{ 
                width: "100%", 
                minHeight: "300px"
            }}
        >
            <div
                className="Spinner"
                style={{
                    width: "2em",
                    height: "2em",
                    "--bar": "var(--gray)",
                    "--path": "var(--gray-light)"
                }}
            ></div>
        </Box>
    );
}

export default IsFetching;