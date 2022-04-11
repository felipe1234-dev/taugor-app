// Libs
import React from "react";
import { Box, Typography } from "@mui/material";

// Images
import NoResultsFoundImg from "@app/media/no-results-found.webp";

function NoResults() {
    const props = {
        box: {
            display: "flex",
            flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			sx: { width: "100%" }
        },
        image: {
            style: { height: "300px" },
			src: NoResultsFoundImg,
			alt: "Nenhum resultado"
        },
        title: {
            variant: "h5"
        },
        paragraph: {
            variant: "body1"
        }
    };
    
	return (
		<Box {...props.box}>
			<img {...props.image}/>
			<Typography {...props.title}>
                Não achamos o que você procurava
            </Typography>
            <Typography {...props.paragraph}>
                Nós colocamos o nosso melhor detetive para o caso
            </Typography>
		</Box>
	);
}

export default NoResults;