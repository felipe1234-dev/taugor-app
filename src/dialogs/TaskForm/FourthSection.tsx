import { 
    Fragment, 
    useState, 
    useEffect, 
    useContext 
} from "react";
import { 
    DialogContentText, 
    TextField, 
    MenuItem 
} from "@mui/material";

import { TaskFormContext } from "./index";
import { 
    STATUS_TYPES, 
    PRIORITY_TYPES, 
    ENV_TYPES, 
    INFLUENCED_USERS 
} from "@local/constants";
import { Task } from "@local/interfaces";
import { 
    Status, 
    Environment,
    Priority,
    Influence
} from "@local/types";

export default function FourthSection(task: Task) {
    const [status, setStatus] = useState<Status>();
    const [priority, setPriority] = useState<Priority>();
    const [environment, setEnvironment] = useState<Environment>();
    const [influence, setInfluence] = useState<Influence>();
    
    const { update } = useContext(TaskFormContext);
    
    useEffect(() => {
        setStatus(task.status);
        setPriority(task.priority);
        setEnvironment(task.environment);
        setInfluence(task.influencedUsers);
    }, [task.status, task.priority, task.environment, task.influencedUsers]);
    
    useEffect(() => {
        update({
            status,
            priority,
            environment,
            influencedUsers: influence
        });
    }, [status, priority, environment, influence]);
    
    const selects = [
        {
            label: "Situação atual",
            name: "status",
            value: status || "",
            onChange: (event: any) => setStatus(event.target.value),
            options: [ ...STATUS_TYPES ]
        },
        {
            label: "Nível de urgência",
            name: "priority",
            value: priority || "",
            onChange: (event: any) => setPriority(event.target.value),
            options: [ ...PRIORITY_TYPES ]
        },
        {
            label: "Ambiente",
            name: "environment",
            value: environment || "",
            onChange: (event: any) => setEnvironment(event.target.value),
            options: [ ...ENV_TYPES ]
        },
        {
            label: "Usuários influenciados",
            name: "influencedUsers",
            value: influence || "",
            onChange: (event: any) => setInfluence(event.target.value),
            options: [ ...INFLUENCED_USERS ]
        }
    ];
    
    return (
        <>
            {selects.map((item, i) => (
                <Fragment key={i}>
                    <DialogContentText mt={2}>
                        {item.label}
                    </DialogContentText>
                    <TextField
                        name={item.name}
                        value={item.value}
                        onChange={item.onChange}
                        required
                        select
                        sx={{ mb: 0, mt: 2 }}
                    >
                        {item.options.map((value, i) => (
                            <MenuItem key={i} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Fragment>
            ))}
        </>
    );
}