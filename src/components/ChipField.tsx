// Libs
import { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { TextFieldProps } from "@mui/material";

// Props interface
export interface ChipFieldProps {
    options: Array<string>,
    value?: Array<string>,
    onChange?: (selOptions: Array<string>) => void
};

export default function ChipField({ 
    options, 
    value = [],
    onChange = () => {},
    ...textField 
}: ChipFieldProps & TextFieldProps) {
    const [selOptions, setSelOptions] = useState<Array<string>>([]);
    
    useEffect(() => {
        setSelOptions(value);
    }, [value]);
    
    return (
        <Autocomplete
            options={options}
            value={selOptions}
            onChange={(event, value) => onChange(value)}
            renderInput={(params: TextFieldProps) => (
                <TextField
                    {...params}
                    {...textField}
                />
            )}
            filterSelectedOptions
            multiple
        />
    );
};