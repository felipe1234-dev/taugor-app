// Libs
import { 
	Grid, 
	Container, 
	Box
} from "@mui/material";

// Page components
import Heading from "./Heading";
import Form from "./Form";

// Style
import "@local/style/pages/LoginPage.scss";

export default function LoginPage() {
	return ( 
		<Grid
            justifyContent="center"
            alignItems="center"
        >
			<Grid item>
				<Container
                    className="LoginPage"
                    maxWidth="xs"
                >
					<Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ marginTop: 8 }}
                    >
                        <Heading />
						<Form />
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
};