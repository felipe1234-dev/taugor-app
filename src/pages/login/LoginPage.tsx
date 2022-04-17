// Libs
import { 
	Grid, 
	Container, 
	Box, 
	Typography 
} from "@mui/material";
import Tilt from "react-parallax-tilt";

// Page components
import LoginForm from "./LoginForm";

// Style
import "@local/style/pages/LoginPage.scss";

// Constants 
import { APP_INFO } from "@local/constants";

const {
	appName, 
	catchline, 
	whiteLogo, 
	alt, 
	link 
} = APP_INFO;

export default function LoginPage() {
    const center = {
        justifyContent: "center",
        alignItems: "center"
    }

    const container = {
        className: "LoginPage",
        component: "main",
        maxWidth: "xs" as "xs"
    }

    const box = {
        sx: {
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    }

    const logo = {
        className: "LoginPage-logo",
        src: whiteLogo,
        alt: alt,
        onClick: () => window.open(link, "_blank")?.focus()
    }

    const logoTilt = {
        tiltMaxAngleX: 40,
        tiltMaxAngleY: 40,
        perspective: 800,
        transitionSpeed: 1500,
        scale: 1.1,
        gyroscope: true,
    }

    const siteTitle = {
        className: "LoginPage-appName",
        component: "h1",
        variant: "h5" as "h5"
    }

    const catchTitle = {
        className: "LoginPage-catchline",
        component: "h2",
        variant: "h6" as "h6"
    }

	return ( 
		<Grid {...center}>
			<Grid item>
				<Container {...container}>
					<Box {...box}>
						<Tilt {...logoTilt}>
							<img {...logo}/>
						</Tilt>
						<Typography {...siteTitle}>
							{appName}
						</Typography>
						<Typography {...catchTitle}>
							{catchline}
						</Typography>
						<LoginForm />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};