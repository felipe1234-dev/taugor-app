// Libs
import {
    useState,
    useEffect,
    useContext
} from "react";
import moment from "moment";
import {
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip
} from "@mui/material";
import { Link } from "react-router-dom";

// TaskItem components
import SecondaryText from "./SecondaryText";

// Functions
import { translateDate } from "@local/functions";

// Contexts
import {
    AlertContext,
    FirebaseContext,
    UserContext
} from "@local/contexts";

// Constants
import { STATUS_ICONS } from "@local/constants";

// API
import { getUser } from "@local/api/collections/Users";

// Interfaces
import { Task, User } from "@local/interfaces";

export default function TaskItem(task: Task) {
    const [poster, setPoster] = useState<User | null>(null);
    const [date, setDate] = useState<string | null>(null);

    const { setSeverity, setMessage } = useContext(AlertContext);
    const { db } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getUser(db, task.postedBy)
            .then((user) => (
                setPoster(user)
            ))
            .catch((error) => {
                setSeverity(error.severity);
                setMessage(error.message);
            });
    }, [task, db])

    useEffect(() => {
        const date =
            moment(new Date(task.createdAt.seconds * 1000))
                .format("D [de] MMM, YYYY");

        setDate(translateDate(date));
    }, [task]);

    return (
        <ListItem 
            button
            component={Link}
            to={`/task/${task.uuid}`}
            state={{ enableLoader: true }}    
        >
            <ListItemIcon>
                <Tooltip title={task.status}>
                    <Avatar>
                        {STATUS_ICONS[task.status]}
                    </Avatar>
                </Tooltip>
            </ListItemIcon>
            <ListItemText
                primary={task.title.join(" ")}
                secondary={(!!poster && !!date && !!user) && (
                    <SecondaryText
                        user={user}
                        poster={poster}
                        task={task} 
                        date={date}
                    />
                )}
            />
        </ListItem>
    );
};