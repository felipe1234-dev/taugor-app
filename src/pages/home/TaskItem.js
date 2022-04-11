// Libs
import React, { 
    useState, 
    useEffect, 
    useContext 
} from "react";
import {
    Box,
    Avatar,
	ListItem,
    ListItemIcon,
	ListItemText,
	Typography,
    Chip
} from "@mui/material";
import { Label as LabelIcon } from "@material-ui/icons";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

// Components 
import { ProfileImage } from "@app/components";

// Functions
import { translateDate } from "@app/functions";

// Contexts
import { FirebaseContext, UserContext } from "@app/contexts";

// API
import { getUserByUuid } from "@app/collections/Users";

function SecondaryText({ 
    brief,
    senderUuid,
    displayName, 
    photoURL, 
    date, 
    tags
}) {
    const [user] = useContext(UserContext);
    const { uuid: userUuid } = user;
    
    const props = {
        brief: {
            component: "span",
            variant: "body2",
            sx: { 
                display: "block", 
                mb: "1em !important" 
            }
        },
        box: {
            container: true,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        senderChip: {
            label: senderUuid === userUuid? "Você" : displayName,
            component: "span",
            avatar: (
                <ProfileImage
                    src={photoURL} 
                    alt={displayName} 
                />
            )
        },
        tagChip: (tag, i) => ({
            key: i,
            component: "span", 
            label: tag
        })
    };
    
    return (
        <>
            <Typography {...props.brief}>
                {brief}
            </Typography>
            <Box {...props.box}>
                <Chip {...props.senderChip}/>
                {tags.map((tag, i) => <Chip {...props.tagChip(tag, i)}/>)} 
                {date}
            </Box>
        </>
    );
}
 
SecondaryText.propTypes = {
    brief: PropTypes.string.isRequired,
    senderUuid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    date: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired
};

function TaskItem({
    uuid: taskUuid,
    title, 
    brief, 
    status,
    tags,
    postedBy: senderUuid, 
    createdAt 
}) {
    const [senderData, setsenderData] = useState({});
    const [postDate, setPostDate] = useState("");
    
    const { db } = useContext(FirebaseContext);
	
    useEffect(() => {
        const fetchsenderData = async() => {
            const data = await getUserByUuid(db, senderUuid);
            setsenderData(data);
        }
        fetchsenderData();
    }, [senderUuid, db])
    
    useEffect(() => {
        const date = 
            moment( new Date(createdAt.seconds*1000) )
            .format("D [de] MMM, YYYY");
        
        setPostDate( translateDate(date) );
    }, [createdAt]);
    
    const subProps = {
        secondaryText: {
            brief: brief,
            senderUuid: senderUuid,
            displayName: senderData.displayName,
            photoURL: senderData.photoURL,
            date: postDate,
            tags: tags
        }
    }
    
    const props = {
        listItem: {
            component: Link,
            to: `/task/${taskUuid}`,
            button: true
        },
        listItemText: {
            primary: `${title} (${status})`, 
            secondary: (Object.entries(senderData).length > 0 && postDate) && (
                <SecondaryText {...subProps.secondaryText}/>
            )
        }
    }
    
	return (
        <ListItem {...props.listItem}>
            <ListItemIcon>
                <Avatar>
                    <LabelIcon />
                </Avatar>
            </ListItemIcon>
            <ListItemText {...props.listItemText}/>
        </ListItem>
	);
}
 
TaskItem.propTypes = {
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, 
    brief: PropTypes.string.isRequired, 
    status: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    postedBy: PropTypes.string.isRequired, 
    createdAt: PropTypes.object.isRequired 
};

export default TaskItem;