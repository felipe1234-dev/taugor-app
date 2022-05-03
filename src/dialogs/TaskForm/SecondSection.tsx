import { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";

import { TaskFormContext } from "./index";
import { TextEditor, ChipField } from "@local/components";
import { TAGS } from "@local/constants";
import { Task } from "@local/interfaces";
import { Tag } from "@local/types";

export default function SecondSection(task: Task) {
    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<Array<Tag>>([]);
    
    const { update } = useContext(TaskFormContext);
    
    useEffect(() => {
        setDescription(task.description);
        setTags(task.tags);
    }, [task.description, task.tags]);
    
    useEffect(() => {
        update({
            description,
            tags
        });
    }, [description, tags]);
    
    return (
        <>
            <TextEditor
                initialContent={description}
                onChange={(html) => setDescription(html)}
                readOnly={false}
            />
            <Divider sx={{ m: 2 }}/>
            
            <ChipField 
                options={[...TAGS]}
                maxRows={4}
                
                value={tags}
                onChange={(value) => setTags(value as Array<Tag>)}

                fullWidth
                multiline
                
                placeholder="Categorias"
            />
            <Divider sx={{ m: 2 }}/>
        </>
    );
}