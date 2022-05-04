import { 
    useContext, 
    useState, 
    useEffect 
} from "react";
import { 
    TextField, 
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { TaskFormContext } from "./index";
import { Task } from "@local/interfaces";

export default function FirstSection(task: Task) {
    const [title, setTitle] = useState<string>("");
    const [brief, setBrief] = useState<string>("");
    
    const { update } = useContext(TaskFormContext);
    
    useEffect(() => {
        setTitle(task.title.join(" "));
        setBrief(task.brief);
    }, [task.title, task.brief])
    
    useEffect(() => {
        update({
            title: title.split(" "),
            brief
        });
    }, [title, brief])
    
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