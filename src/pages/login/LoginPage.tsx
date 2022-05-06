// Libs
import { Box } from "@mui/material";

// Page components
import Heading from "./Heading";
import Form from "./Form";

// Style
import "@local/style/pages/LoginPage.scss";

export default function LoginPage() {
	return (
		<Box
			className="LoginPage"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			sx={{
				minHeight: "100vh",
				minWidth: "100%"
			}}
		>
			<Heading />
			<Form />
		</Box>
	);
};