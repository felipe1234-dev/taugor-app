// Libs
import { Box, Typography } from "@mui/material";

// Images
import NoResultsFoundImg from "@local/media/no-results-found.webp";

export default function NoResults() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
        >
            <img
                style={{ height: "300px" }}
                src={NoResultsFoundImg}
                alt="Nenhum resultado"
            />
            <Typography variant="h5">
                Não achamos o que você procurava
            </Typography>
            <Typography variant="body1">
                Nós colocamos o nosso melhor detetive para o caso
            </Typography>
        </Box>
    );
};