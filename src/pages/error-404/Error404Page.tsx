// Libs
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Media
import PageNotFoundImg from "@local/media/page-not-found.png";

export default function Error404Page() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minWidth: "100%" }}
        >
            <img
                style={{ minHeight: "100vh" }}
                src={PageNotFoundImg}
                alt="Página não encontrada"
            />
            <Typography variant="h5">
                Awww... Essa não!
            </Typography>
            <Typography variant="body1">
                A página que você estava procurando não existe!
                Mas não criemos pânico! Você pode voltar para o
                <Link to="/" replace>início</Link>
            </Typography>
        </Box>
    );
};