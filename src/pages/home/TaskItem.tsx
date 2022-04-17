// Libs
import { 
    useState, 
    useEffect, 
    useContext 
} from "react";
import moment from "moment";
import {
    Box,
    Avatar,
	ListItem,
    ListItemIcon,
	ListItemText, 
	Typography,
    Chip
} from "@mui/material";
import { Label as LabelIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Components 
import { ProfileImage } from "@local/components";

// Functions
import { translateDate } from "@local/functions";

// Contexts
import { FirebaseContext, UserContext } from "@local/contexts";

// API
import { getUserByUuid } from "@local/api/collections/Users";

// Interfaces
import { Task, User } from "@local/interfaces";

export default function TaskItem(task: Task) {
    const [poster, setPoster] = useState<User|null>(null);
    const [date, setDate]     = useState<string|null>(null);
    
    const { db }   = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
    
    useEffect(() => {
        const fetchsenderData = async() => {
            const posterData = await getUserByUuid(db, task.postedBy);
            
            setPoster(posterData);
        }
        
        fetchsenderData();
    }, [task, db])
    
    useEffect(() => {
        const date = 
            moment( new Date(task.createdAt.seconds*1000) )
            .format("D [de] MMM, YYYY");
        
        setDate( translateDate(date) );
    }, [task]);
    
    const listItem = {
        component: Link,
        to: `/task/${task.uuid}`
    }
    
    const brief = {
        component: "span" as "span",
        variant: "body2" as "body2",
        sx: { 
            display: "block", 
            mb: "1em !important" 
        }
    }
    
    const box = {
        container: true,
        sx: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        }
    }
        
    const posterChip = {
        label: (!!poster && !!user)? (
            poster.uuid === user.uuid? "Você" : poster.displayName
        ) : "",
        component: "span",
        avatar: (!!poster && !!user)? (
            <ProfileImage
                src={poster.photoURL}
                alt={poster.displayName} 
            />  
        ) : <span></span>
    }
    
    const tagChip = (tag: string, i: number) => ({
        key: i,
        component: "span", 
        label: tag
    });
    
    const listItemText = {
        primary: `${task.title.join(" ")} (${task.status})`, 
        secondary: (!!poster && !!date) && (
            <>
                <Typography {...brief}>
                    {task.brief}
                </Typography>
                <Box {...box}>
                    <Chip {...posterChip}/>
                    {task.tags.map((tag, i) => <Chip {...tagChip(tag, i)}/>)} 
                    {date}
                </Box>
            </>
        )
    }
    
	return (
        <ListItem {...listItem} button>
            <ListItemIcon>
                <Avatar>
                    <LabelIcon />
                </Avatar>
            </ListItemIcon>
            <ListItemText {...listItemText}/>
        </ListItem>
	);
};