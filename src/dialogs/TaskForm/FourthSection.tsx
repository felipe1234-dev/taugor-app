import {
    useState, 
    useEffect, 
    useContext 
} from "react";
import {
    Grid,
    DialogTitle,
    DialogContentText, 
    TextField, 
    MenuItem 
} from "@mui/material";

import { TaskFormContext } from "./index";
import { ChipField } from "@local/components";
import { 
    STATUS_TYPES, 
    PRIORITY_TYPES, 
    ENV_TYPES, 
    INFLUENCED_USERS,
    TAGS
} from "@local/constants";
import { Tag } from "@local/types";

export default function FourthSection() {
    const { updateTask, updates, task } = useContext(TaskFormContext);
    
    const textInputs = [
        {
            label: "Nome do produto",
            placeholder: "Nome do produto",
            maxLength: 20,
            value: updates.product || task.product,
            onChange: (event: any) => updateTask({ product: event.target.value }),
            inputProps: { maxLength: 50 }
        }
    ];
    
    const selects = [
        {
            label: "Situação atual",
            value: updates.status || task.status,
            onChange: (event: any) => updateTask({ status: event.target.value }),
            options: [ ...STATUS_TYPES ]
        },
        {
            label: "Nível de urgência",
            value: updates.priority || task.priority,
            onChange: (event: any) => updateTask({ priority: event.target.value }),
            options: [ ...PRIORITY_TYPES ]
        },
        {
            label: "Ambiente",
            value: updates.environment || task.environment,
            onChange: (event: any) => updateTask({ environment: event.target.value }),
            options: [ ...ENV_TYPES ]
        },
        {
            label: "Usuários influenciados",
            value: updates.influencedUsers || task.influencedUsers,
            onChange: (event: any) => updateTask({ influencedUsers: event.target.value }),
            options: [ ...INFLUENCED_USERS ]
        }
    ];
    
    return (
        <>
            <DialogTitle sx={{ pl: 0 }}>
                Mais informações
            </DialogTitle>
            <DialogContentText sx={{ mb: 2 }}>
                Aqui estão mais algumas informações variadas para você verificar
            </DialogContentText>
            
            <DialogContentText mt={2}>
                Categorias
            </DialogContentText>
            <ChipField 
                multiline
                options={[...TAGS]}
                maxRows={4}
                value={updates.tags || task.tags}
                onChange={(value) => updateTask({ tags: value as Array<Tag> })}
                placeholder="Categorias"
                sx={{ mb: 0, mt: 2 }}
            />
            
            <Grid container spacing={2}>
                {textInputs.map((item, i) => (
                    <Grid key={i} item xs={6}>
                        <DialogContentText mt={2}>
                            {item.label}
                        </DialogContentText>
                        <TextField
                            required
                            multiline
                            fullWidth
                            maxRows={4}
                            placeholder={item.placeholder}
                            value={item.value}
                            onChange={item.onChange}
                            inputProps={item.inputProps}
                            sx={{ mb: 0, mt: 2 }}
                        />
                    </Grid>
                ))}
            
                {selects.map((item, i) => (
                    <Grid key={i} item xs={6}>
                        <DialogContentText mt={2}>
                            {item.label}
                        </DialogContentText>
                        <TextField
                            select
                            required
                            fullWidth
                            value={item.value}
                            onChange={item.onChange}
                            sx={{ mb: 0, mt: 2 }}
                        >
                            {item.options.map((value, i) => (
                                <MenuItem key={i} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}