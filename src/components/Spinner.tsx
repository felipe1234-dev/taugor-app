// Libs
import { Box } from "@mui/material";

// Styles
import "@local/style/components/Spinner.scss";

interface SpinnerProps {
    wrapper: {
        width: string|number,
        height: string|number
    },
    spinner: { 
        width: string|number,
        height: string|number,
        barColor: string,
        pathColor: string
    }
};

export default function Spinner({ wrapper, spinner }: SpinnerProps) {
    return (
        <Box
            display="flex"
			alignItems="center"
			justifyContent="center"
			sx={{ 
                width: wrapper.width, 
                minHeight: wrapper.height
            }}
        >
            <div
                className="Spinner"
                style={{
                    width: spinner.width,
                    height: spinner.height,
                    ["--bar" as string]: spinner.barColor,
                    ["--path" as string]: spinner.pathColor
                }}
            ></div>
        </Box>
    );
};