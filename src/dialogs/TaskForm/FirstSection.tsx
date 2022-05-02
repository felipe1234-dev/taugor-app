import { TextField, Divider } from "@mui/material";
import { Task } from "@local/interfaces";

export default function FirstSection(task: Task) {
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
    
    return (
        <>
            {textInputs.map((item, i) => (
                <TextField
                    key={i}
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
        </>
    );
}