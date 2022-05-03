import { useContext, useState, useEffect } from "react";
import { TextField, Divider } from "@mui/material";
import { TaskFormContext } from "./index";
import { Task } from "@local/interfaces";

export default function FirstSection(task: Task) {
    const [title, setTitle] = useState<string>("");
    const [brief, setBrief] = useState<string>("");
    const [product, setProduct] = useState<string>("");
    
    const { update } = useContext(TaskFormContext);
    
    useEffect(() => {
        setTitle(task.title.join(" "));
        setBrief(task.brief);
        setProduct(task.product);
    }, [task.title, task.brief, task.product])
    
    useEffect(() => {
        update({
            title: title.split(" "),
            brief,
            product
        });
    }, [title, brief, product])
    
    const textInputs = [
        {
            placeholder: "Título",
            maxLength: 50,
            value: title,
            onChange: (event: any) => setTitle(event.target.value)
        },
        { 
            placeholder: "Explicação breve",
            maxLength: 150,
            value: brief,
            onChange: (event: any) => setBrief(event.target.value)
        },
        { 
            placeholder: "Nome do produto",
            maxLength: 20,
            value: product,
            onChange: (event: any) => setProduct(event.target.value)
        }
    ];
    
    return (
        <>
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
            <Divider sx={{ m: 2 }}/>
        </>
    );
}