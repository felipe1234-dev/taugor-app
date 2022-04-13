// Libs
import React from "react";
import { 
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Chip,
    Box
} from "@mui/material";
import {
    PeopleOutlineRounded as PeopleIcon,
    CodeRounded as ProductIcon
} from "@mui/icons-material";
import PropTypes from "prop-types";

// Constants
import { PRIORITY_ICONS, STATUS_ICONS } from "@app/constants";

function Header({
    title, 
    brief, 
    tags, 
    priority, 
    influencedUsers, 
    product,
    environment,
    status
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    const props = {
        container: {
			className: "TaskPage-header",
			component: "header",
            container: true,
            direction: "column",
            alignItems: "flex-start"
        },
        title: {
            className: "TaskPage-header-title",
            component: "h1"
        },
        brief: {
            className: "TaskPage-header-brief",
            component: "h2"
        },
        tag: (tag, i) => ({
            key: i,
            component: "span", 
            label: tag
        }),
        env: {
            variant: "outlined",
            component: "span",
            label: environment
        },
        info: {
            container: true,
            display: "flex",
            flexDirection: isMobile? "column" : "row",
            justifyContent: "center",
            alignItems: "flex-start",
            sx: { 
                mb: ".6em"
            }
        },
        box: {
            container: true,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            sx: { 
                mb: ".6em",
                mr: "1.2em" 
            }
        }
    };
    
    return (
        <Grid {...props.container}>
            <Grid item>
                <Typography {...props.title}>
                    {title.join(" ")}
                </Typography>
                <Typography {...props.brief}>
                    {brief}
                </Typography>
            </Grid>
            <Grid item>
                {tags.map((tag, i) => <Chip {...props.tag(tag, i)}/>)}
                <Chip {...props.env}/>
            </Grid>
            <Grid item>
                <Box {...props.info}>
                    <Box {...props.box}>
                        {STATUS_ICONS[status]} {status}
                    </Box>
                    <Box {...props.box}>
                        {PRIORITY_ICONS[priority]} Prioridade {priority}
                    </Box>
                    <Box {...props.box}>
                        <PeopleIcon /> {influencedUsers} usuários impactados
                    </Box>
                    <Box {...props.box}>
                        <ProductIcon /> {product}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

Header.propTypes = {
    title: PropTypes.arrayOf(PropTypes.string).isRequired,
    brief: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    priority: PropTypes.string.isRequired,
    influencedUsers: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default Header;