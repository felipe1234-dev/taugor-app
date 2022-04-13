// Libs
import React, { useState } from "react";
import { Box } from "@mui/material";
import RichTextEditor from "react-rte";
import PropTypes from "prop-types";

// Styles
import "@app/style/components/TextEditor.scss";

function TextEditor({ initialContent, isPreview, onChange }) {
    const [content, setContent] = useState(
        RichTextEditor.createValueFromString(initialContent, "html")
    );
    
    const props = {
        richTextEditor: {
            value: content,
            onChange: (newContent) => {
                setContent(newContent);
                onChange(newContent.toString("html"));
            }
        },
        previewContainer: {
            className: "TextEditor-content",
            dangerouslySetInnerHTML: {
                __html: content
            }
        }
    };
    
    return (
        !isPreview? (
            <RichTextEditor {...props.richTextEditor}/>
        ) : (
            <Box {...props.previewContainer}/>
        )
    );
}

TextEditor.propTypes = {
    isPreview: PropTypes.bool.isRequired,
    initialContent: PropTypes.string,
    onChange: PropTypes.func
};

TextEditor.defaultProps = {
    isPreview: false,
    initialContent: "<h1>Olá, mundo!</h1>",
    onChange: () => {}
};

export default TextEditor;