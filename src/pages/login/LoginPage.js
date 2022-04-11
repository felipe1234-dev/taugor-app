// Libs
import React, { useEffect } from "react";
import { 
	Grid, 
	Container, 
	Box, 
	Typography 
} from "@mui/material";
import PropTypes from "prop-types";
import Tilt from "react-parallax-tilt";

// Components
import LoginForm from "./LoginForm";

// Constants
import { APP_INFO } from "@app/constants";

// Style
import "@app/style/pages/LoginPage.scss";

const {
	appName, 
	catchline, 
	blueLogo, 
	alt, 
	link 
} = APP_INFO;

function LoginPage({ title }) {
	useEffect(() => (document.title = title), [title]);

	const props = {
		center: {
			justifyContent: "center",
  			alignItems: "center"
		},
		container: {
			className: "LoginPage",
			component: "main",
			maxWidth: "xs",
		},
		box: {
			sx: {
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			},
		},
		logo: {
			className: "LoginPage-logo",
			src: blueLogo,
			alt: alt,
            onClick: () => window.open(link, "_blank").focus()
		},
		logoTilt: {
			tiltMaxAngleX: 40,
			tiltMaxAngleY: 40,
			perspective: 800,
			transitionSpeed: 1500,
			scale: 1.1,
			gyroscope: true,
		},
		title: {
			className: "LoginPage-appName",
			component: "h1",
			variant: "h5",
		},
		subtitle: {
			className: "LoginPage-catchline",
			component: "h2",
			variant: "h6"
		}
	};

	return ( 
		<Grid {...props.center}>
			<Grid item>
				<Container {...props.container}>
					<Box {...props.box}>
						<Tilt {...props.logoTilt}>
							<img {...props.logo}/>
						</Tilt>
						<Typography {...props.title}>
							{appName}
						</Typography>
						<Typography {...props.subtitle}>
							{catchline}
						</Typography>
						<LoginForm />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
}

LoginPage.propTypes = {
	title: PropTypes.string.isRequired
};

export default LoginPage;
