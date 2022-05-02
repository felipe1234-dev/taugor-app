import { Fragment } from "react";
import { 
    DialogContentText, 
    TextField, 
    MenuItem 
} from "@mui/material";
import { 
    STATUS_TYPES, 
    PRIORITY_TYPES, 
    ENV_TYPES, 
    INFLUENCED_USERS 
} from "@local/constants";
import { Task } from "@local/interfaces";

export default function FourthSection(task: Task) {
    const selects = [
        {
            label: "Situação atual",
            name: "status",
            defaultValue: task.status,
            options: [ ...STATUS_TYPES ]
        },
        {
            label: "Nível de urgência",
            name: "priority",
            defaultValue: task.priority,
            options: [ ...PRIORITY_TYPES ]
        },
        {
            label: "Ambiente",
            name: "environment",
            defaultValue: task.environment,
            options: [ ...ENV_TYPES ]
        },
        {
            label: "Usuários influenciados",
            name: "influencedUsers",
            defaultValue: task.influencedUsers,
            options: [ ...INFLUENCED_USERS ]
        }
    ]
    
    return (
        <>
            {selects.map((item, i) => (
                <Fragment key={i}>
                    <DialogContentText mt={2}>
                        {item.label}
                    </DialogContentText>
                    <TextField
                        name={item.name}
                        defaultValue={item.defaultValue}
                
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