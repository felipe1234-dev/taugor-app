import { 
    useState, 
    useEffect, 
    useContext 
} from "react";
import { 
    DialogContentText,
    DialogTitle
} from "@mui/material";

import { TaskFormContext } from "./index";
import { TextEditor, ChipField } from "@local/components";
import { TAGS } from "@local/constants";
import { Task } from "@local/interfaces";
import { Tag } from "@local/types";

export default function SecondSection(task: Task) {
    const [description, setDescription] = useState<string>("");
    
    const { update } = useContext(TaskFormContext);
    
    useEffect(() => {
        setDescription(task.description);
    }, [task.description]);
    
    useEffect(() => {
        update({ description });
    }, [description]);
 
    return (
        <>
            <DialogTitle sx={{ pl: 0 }}>
                Descrição longa
            </DialogTitle>
            <DialogContentText sx={{ mb: 4 }}>
                Faça uma descrição bem detalhada da sua atividade, ao contrário da 
                descrição breve, aqui o número de caracteres é infinito, assim como 
                contém controle total do HTML para lhe prover mais liberdade.
            </DialogContentText>
            <TextEditor
                initialContent={description}
                onChange={(html) => setDescription(html)}
                readOnly={false}
            />
        </>
    );
}