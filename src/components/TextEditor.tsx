// Libs
import { useState } from "react";
import { Box } from "@mui/material";
import RichTextEditor, { EditorValue, Props as RichTextEditorProps } from "react-rte";

// Styles
import "@local/style/components/TextEditor.scss";

// Props interface
export interface TextEditorProps {
    onChange?: (html: string) => void,
    initialContent?: string
};

export default function TextEditor({
    initialContent = "<h1>Olá, mundo!</h1>", 
    readOnly = false, 
    placeholder,
    onChange = () => {}
}: TextEditorProps & RichTextEditorProps) {
    const [content, setContent] = useState<EditorValue>(
        RichTextEditor.createValueFromString(initialContent, "html")
    );
    
    return (
        <div className="TextEditor">
            {!readOnly? (
                <RichTextEditor
                    placeholder={placeholder}
                    value={content || RichTextEditor.createEmptyValue()}
                    onChange={(newContent: EditorValue) => {
                        setContent(newContent);
                        onChange(newContent.toString("html"));
                    }}
                />
            ) : (
                <Box 
                    className="TextEditor-content"
                    dangerouslySetInnerHTML={{
                        __html: content?.toString("html") || ""
                    }}
                />
            )}
        </div>
    );
};