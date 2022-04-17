// Libs
import { useState } from "react";
import { Box } from "@mui/material";
import RichTextEditor, { EditorValue } from "react-rte";

// Styles
import "@local/style/components/TextEditor.scss";

// TextEditorProps interface
interface TextEditorProps {
    initialContent?: string,
    isPreview?: boolean,
    onChange?: Function
};

export default function TextEditor({ 
    initialContent = "<h1>Olá, mundo!</h1>", 
    isPreview = false, 
    onChange = () => {}
}: TextEditorProps) {
    const [content, setContent] = useState<EditorValue>(
        RichTextEditor.createValueFromString(initialContent, "html")
    );
    
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
        !isPreview? (
            <RichTextEditor {...richTextEditor}/>
        ) : (
            <Box {...previewContainer}/>
        )
    );
};