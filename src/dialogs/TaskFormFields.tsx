// Libs
import {
    Box,
    TextField,
    DialogContentText,
    MenuItem,
    Divider
} from "@mui/material";

// Local components
import { ChipField, TextEditor } from "@local/components";

// Interfaces
import { Task } from "@local/interfaces";

// Constants
import {
    ENV_TYPES,
    INFLUENCED_USERS,
    PRIORITY_TYPES,
    STATUS_TYPES,
    TAGS
} from "@local/constants";

export default function TaskFormFields(task: Task) {
    const box = {
        sx: {
            display: "flex",
            flexDirection: "column",
            mb: 2,
            mt: 2,
            width: "100%"
        }
    }

    const baseTextField = (
        name: string,
        placeholder: string,
        length: number, 
        value: string
    ) => ({
        name: name,
        placeholder: placeholder,
        defaultValue: value,
        inputProps: {
            maxLength: length
        },

        required: true,
        maxRows: 4,
        fullWidth: true,
        multiline: true,
        sx: {
            mb: 0,
            mt: 2,
        }
    });

    const baseSelectField = (name: string, value: string) => ({
        name: name,
        defaultValue: value,

        required: true,
        select: true,
        sx: {
            mb: 0,
            mt: 2
        }
    });

    const chipField = {
        name: "tags",
        placeholder: "Categorias",
        defaultValue: task.tags,
        options: [...TAGS],

        required: true,
        maxRows: 4,
        fullWidth: true,
        multiline: true
    }

    const dialogContentText = {
        sx: {
            mt: 2
        }
    }

    const divider = {
        sx: {
            m: 2
        }
    }

    const textEditor = {
        name: "description",
        readOnly: false,
        initialContent: task.description,
        onChange: (html: string) => {
            console.log(html);
        }
    }

    return (
        <Box {...box}>
            {/* TITLE & BRIEF*/}
            <DialogContentText {...dialogContentText}>
                Título & descrição breve
            </DialogContentText>
            <TextField
                {...baseTextField("title", "Título", 50, task.title.join(" "))}
            />
            <TextField
                {...baseTextField("brief", "Explicação breve", 150, task.brief)}
            />
            <Divider {...divider} />

            {/* DESCRIPTION */}
            <TextEditor {...textEditor}/>

            <Divider {...divider} />
            <ChipField {...chipField}/>
            <Divider {...divider} />

            {/* STATUS */}
            <DialogContentText {...dialogContentText}>
                Situação atual
            </DialogContentText>
            <TextField
                {...baseSelectField("status", task.status)}
            >
                {STATUS_TYPES.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </TextField>

            {/* PRIORITY */}
            <DialogContentText {...dialogContentText}>
                Nível de urgência
            </DialogContentText>
            <TextField
                {...baseSelectField("priority", task.priority)}
            >
                {PRIORITY_TYPES.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </TextField>

            {/* ENVIRONMENT */}
            <DialogContentText {...dialogContentText}>
                Ambiente
            </DialogContentText>
            <TextField
                {...baseSelectField("environment", task.environment)}
            >
                {ENV_TYPES.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </TextField>

            {/* INFLUENCED USERS */}
            <DialogContentText {...dialogContentText}>
                Usuários influenciados
            </DialogContentText>
            <TextField
                {...baseSelectField("influencedUsers", task.influencedUsers)}
            >
                {INFLUENCED_USERS.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};