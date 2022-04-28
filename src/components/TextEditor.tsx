// Libs
import { useState } from "react";
import { Box } from "@mui/material";
import RichTextEditor, { EditorValue } from "react-rte";

// Styles
import "@local/style/components/TextEditor.scss";

// Props interface
export interface TextEditorProps {
    name?: string,
    initialContent?: string,
    readOnly?: boolean,
    onChange?: Function
};

export default function TextEditor({
    name,
    initialContent = "<h1>Olá, mundo!</h1>", 
    readOnly = false, 
    onChange = () => {}
}: TextEditorProps) {
    const [content, setContent] = useState<EditorValue>(
        RichTextEditor.createValueFromString(initialContent, "html")
    );
    
    const textarea = {
        name: name,
        type: "hidden",
        defaultValue: content.toString("html"),
        style: { display: "none" }
    }
    
    const richTextEditor = {
        value: content,
        onChange: (newContent: EditorValue) => {
            setContent(newContent);
            onChange(newContent.toString("html"));
        }
    }
    
    const previewContainer = {
        className: "TextEditor-content",
        component: "article" as "article",
        dangerouslySetInnerHTML: {
            __html: content.toString("html")
        }
    }
    
    return (
        <div className="TextEditor">
            {!readOnly? (
                <>
                    <textarea {...textarea}/>
                    <RichTextEditor {...richTextEditor}/>
                </>
            ) : (
                <Box {...previewContainer}/>
            )}
        </div>
    );
};