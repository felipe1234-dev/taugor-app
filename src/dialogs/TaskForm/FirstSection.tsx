import { useContext } from "react";
import { 
    TextField, 
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { TaskFormContext } from "./index";

export default function FirstSection() {
    const { updateTask, updates, task } = useContext(TaskFormContext);
    
    const textInputs = [
        {
            placeholder: "Título",
            maxLength: 50,
            value: updates.title?.join(" ") || task.title?.join(" "),
            onChange: (event: any) => updateTask({ title: event.target.value.split(" ") })
        },
        { 
            placeholder: "Explicação breve",
            maxLength: 150,
            value: updates.brief || task.brief,
            onChange: (event: any) => updateTask({ brief: event.target.value })
        }
    ];
    
    return (
        <>
            <DialogTitle sx={{ pl: 0 }}>
                Título & Descrição breve
            </DialogTitle>
            <DialogContentText>
                O título pode comportar 50 caracteres e a descrição 150
            </DialogContentText>
            {textInputs.map((item, i) => (
                <TextField
                    key={i}
                    required
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder={item.placeholder}
                    value={item.value}
                    onChange={item.onChange}
                    inputProps={{ maxLength: item.maxLength }}
                    sx={{ mb: 0, mt: 2 }}
                />
            ))}
        </>
    );
}