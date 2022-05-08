// Libs
import { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

// Style
import "@local/style/components/SearchBar.scss";

// Props interface
export interface SearchBarProps {
    normalWidth?: number,
    widthOnHover?: number
};

export default function SearchBar({ 
    normalWidth = 20,
    widthOnHover = 25, 
    ...textField 
}: SearchBarProps & TextFieldProps) {
    const [width, setWidth] = useState<number>(normalWidth);
    
    return (
        <div 
            className="SearchBar-wrapper"
            onMouseEnter={() => setWidth(widthOnHover)}
            onMouseLeave={() => setWidth(normalWidth)} 
            style={{ width: `${width}%` }}
        >
            <TextField
                {...textField}
                fullWidth
            />
        </div>
    );
};