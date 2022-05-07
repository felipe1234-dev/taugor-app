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
import { TextEditor } from "@local/components";

export default function SecondSection() {
    const [description, setDescription] = useState<string>("");
    
    const { update, updates, task } = useContext(TaskFormContext);
    
    useEffect(() => {
        if (!!task.description || !!updates.description)
            setDescription(updates.description || task.description || "");
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
                placeholder="Descrição..."
                initialContent={description}
                onChange={(html) => setDescription(html)}
                readOnly={false}
            />
            <textarea
                style={{ visibility: "hidden" }}
                defaultValue={description.replace(/(<[^>]+>)/ig, "")}
                required
            />
        </>
    );
};