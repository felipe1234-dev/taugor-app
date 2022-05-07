import { useContext } from "react";
import { 
    DialogContentText,
    DialogTitle
} from "@mui/material";

import { TaskFormContext } from "./index";
import { TextEditor } from "@local/components";
import { stripTags } from "@local/functions";

export default function SecondSection() {
    const { update, updates, task } = useContext(TaskFormContext);
 
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
                initialContent={updates.description || task.description}
                onChange={(html) => update({ description: html })}
                readOnly={false}
            />
            <textarea
                required
                defaultValue={stripTags(updates.description || task.description)}
                style={{ opacity: 0 }}
            />
        </>
    );
};