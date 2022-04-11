// Libs
import React from "react";
import {
    Box,
    Container,
    Typography,
    Paper
} from "@mui/material";
import PropTypes from "prop-types";

// Components
import AttachmentList from "./AttachmentList";

function Body({ attachments }) {
    const props = {
        container: {
			display: "flex"
		},
		paper: {
			className: "TaskPage-body",
			elevation: 0,
			sx: { pb: "50px" }
		},
        title: {
            component: "h3",
            variant: "h5"
        },
        attachmentList: {
            attachments: attachments
        }
    };
    
    return (
        <Container {...props.container}>
            <Paper {...props.paper}>
                <Typography {...props.title}>
                    Anexos
                </Typography>
                <AttachmentList {...props.attachmentList}/>
                
                
                <Typography {...props.title}>
                    Descrição
                </Typography>
                <Box></Box>
            </Paper>
        </Container>
    );
}

Body.propTypes = {
    attachments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Body;