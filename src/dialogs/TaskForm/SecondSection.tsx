import { Divider } from "@mui/material";
import { TextEditor, ChipField } from "@local/components";
import { TAGS } from "@local/constants";
import { Task } from "@local/interfaces";

export default function SecondSection(task: Task) {
    return (
        <>
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
        </>
    );
}