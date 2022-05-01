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

export default function TaskForm(task: Task) {
    const textInputs = [
        {
            name: "title", 
            placeholder: "Título",
            maxLength: 50,
            defaultValue: task.title.join(" ")
        },
        { 
            name: "brief", 
            placeholder: "Explicação breve",
            maxLength: 150,
            defaultValue: task.brief
        },
        { 
            name: "product", 
            placeholder: "Nome do produto",
            maxLength: 20,
            defaultValue: task.product
        }
    ]

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
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2,
                mt: 2,
                width: "100%"
            }}
        >
            {textInputs.map((item) => (
                <TextField
                    required
                    fullWidth
                    multiline
                    maxRows={4}
                    name={item.name}
                    placeholder={item.placeholder}
                    defaultValue={item.defaultValue}
                    inputProps={{ maxLength: item.maxLength }}
                    sx={{ mb: 0, mt: 2 }}
                />
            ))}
            <Divider sx={{ m: 2 }}/>
            
            <TextEditor
                name="description"
                initialContent={task.description}
                readOnly={false}
            />
            <Divider sx={{ m: 2 }}/>
            
            <ChipField 
                name="tags"
                placeholder="Categorias"
                defaultValue={task.tags}
                options={[...TAGS]}
                maxRows={4}
         
                required
                fullWidth
                multiline
            />
            <Divider sx={{ m: 2 }}/>

            {selects.map((item) => (
                <>
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
                </>
            ))}
        </Box>
    );
};