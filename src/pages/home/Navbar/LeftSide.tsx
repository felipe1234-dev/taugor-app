// Libs
import { Typography } from "@mui/material";

// Constants
import { APP_INFO } from "@local/constants";
const {
    appName,
    whiteIcon,
    alt
} = APP_INFO;

export default function LeftSide() {
    return (
        <>
            <img
                className="HomePage-navbar-logo"
                src={whiteIcon}
                alt={alt}
            />

            <Typography
                className="HomePage-navbar-appName"
                component="h1"
            >
                {appName}
            </Typography>
        </>
    );
}