// Libs
import { CSSProperties } from "react";
import { Box } from "@mui/material";

// Styles
import "@local/style/components/Spinner.scss";

export interface SpinnerProps {
    wrapper?: CSSProperties,
    spinner?: CSSProperties
};

export default function Spinner({ wrapper = {}, spinner = {} }: SpinnerProps) {
    return (
        <Box
            className="Spinner-wrapper"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={wrapper}
        >
            <div
                className="Spinner"
                style={spinner}
            ></div>
        </Box>
    );
};