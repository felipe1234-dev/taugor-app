// Libs
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import RichTextEditor, { EditorValue } from "react-rte";

// Styles
import "@local/style/components/TextEditor.scss";

// Props interface
export interface TextEditorProps {
    name?: string,
    initialContent?: string,
    readOnly?: boolean,
    onChange?: (html: string) => void
};

export default function TextEditor({
    name,
    initialContent = "<h1>Olá, mundo!</h1>", 
    readOnly = false, 
    onChange = () => {}
}: TextEditorProps) {
    const [content, setContent] = useState<EditorValue>(
        RichTextEditor.createValueFromString("", "html")
    );
    
    useEffect(() => {
        setContent(
            RichTextEditor.createValueFromString(initialContent, "html")
        );
    }, [initialContent])
    
    return (
        <div className="TextEditor">
            {!readOnly? (
                <>
                    <textarea
                        name={name}
                        defaultValue={content.toString("html")}
                        style={{ display: "none" }}
                    />
                    <RichTextEditor
                        value={content}
                        onChange={(newContent: EditorValue) => {
                            setContent(newContent);
                            onChange(newContent.toString("html"));
                        }}
                    />
                </>
            ) : (
                <Box 
                    className="TextEditor-content"
                    dangerouslySetInnerHTML={{
                        __html: content.toString("html")
                    }}
                />
            )}
        </div>
    );
};