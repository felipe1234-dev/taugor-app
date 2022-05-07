// Libs
import { Avatar, Box, Button, Typography } from "@mui/material";
import { 
    QuestionMarkOutlined as QuestionMarkIcon 
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Style
import "@local/style/pages/Error404Page.scss";

export default function Error404Page() {
    const iconSize = 80;
    
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: "100vh",
                minWidth: "100%" 
            }}
        >
            <Avatar 
                sx={{
                    mb: 3,
                    backgroundColor: "transparent",
                    width: iconSize, height: iconSize   
                }}
            >
                <QuestionMarkIcon sx={{ fontSize: iconSize }}/>
            </Avatar>
            <Typography variant="h5">
                Awww... Essa não!
            </Typography>
            <Typography variant="body1">
                A página que você estava procurando não existe!
            </Typography>
            <Typography variant="body1">
                Mas não criemos pânico!
            </Typography>
            <Button
                component={Link}
                to="/"
                state={{ enableLoader: true }}
                replace
                variant="contained"
                disableElevation
                sx={{ mt: 3, mb: 2 }}
            >
                Início
            </Button>
        </Box>
    );
};