// Libs
import { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { TextFieldProps } from "@mui/material";

// Props interface
export interface ChipFieldProps {
    options: Array<string>,
    defaultValue: Array<string>
};

export default function ChipField({ 
    options, 
    defaultValue,
    name,
    required = false,
    placeholder,
    ...textField 
}: ChipFieldProps & TextFieldProps) {
    const [value, setValue] = useState<Array<string>>([]);
    
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    
    return (
        <>
            <Autocomplete
                options={options}
                defaultValue={defaultValue}
                onChange={(event, value) => setValue(value)}
                renderInput={(params: TextFieldProps) => (
                    <TextField 
                        {...params}
                        {...textField}
                    />
                )}
                filterSelectedOptions
                multiple
            />
            <TextField 
                name={name}
                required={required}
                value={value.join(", ")}
                sx={{ display: "none" }}
            />
        </>
    );
};