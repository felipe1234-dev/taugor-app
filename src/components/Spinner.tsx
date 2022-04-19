// Libs
import { Box } from "@mui/material";

// Styles
import "@local/style/components/Spinner.scss";

interface SpinnerProps {
    wrapper: {
        width?: string|number,
        height?: string|number
    },
    spinner: { 
        width?: string|number,
        height?: string|number,
        barColor?: string,
        pathColor?: string
    }
};

export default function Spinner({ wrapper, spinner }: SpinnerProps) {
    return (
        <Box
            className="Spinner-wrapper"
            display="flex"
			alignItems="center"
			justifyContent="center"
			sx={{ 
                width: wrapper.width? spinner.width : "", 
                minHeight: wrapper.height? spinner.height : ""
            }}
        >
            <div
                className="Spinner"
                style={{
                    width: spinner.width? spinner.width : "",
                    height: spinner.height? spinner.height : "",
                    ["--bar-color" as string]: spinner.barColor? spinner.barColor : "var(--bar-color)",
                    ["--path-color" as string]: spinner.pathColor? spinner.pathColor : "var(--path-color)"
                }}
            ></div>
        </Box>
    );
};