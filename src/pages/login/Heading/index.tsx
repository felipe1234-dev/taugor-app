// Libs
import { Typography } from "@mui/material";
import Tilt from "react-parallax-tilt";

// Constants 
import { APP_INFO } from "@local/constants";
const {
	appName, 
	catchline, 
	whiteLogo, 
	alt, 
	link 
} = APP_INFO;

export default function Heading() {
    return (
        <>
            <Tilt
                tiltMaxAngleX={40}
                tiltMaxAngleY={40}
                perspective={800}
                transitionSpeed={1500}
                scale={1.1}
                gyroscope
            >
                <img
                    className="LoginPage-logo"
                    src={whiteLogo}
                    alt={alt}
                    onClick={() => window.open(link, "_blank")?.focus()}
                />
            </Tilt>
            <Typography
                className="LoginPage-appName"
                component="h1"
                variant="h5"
            >
                {appName}
            </Typography>
            <Typography
                className="LoginPage-catchline"
                component="h2"
                variant="h6"
            >
                {catchline}
            </Typography>
        </>
    );
}