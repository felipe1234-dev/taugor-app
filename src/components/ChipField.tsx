// Libs
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
    ...textField 
}: ChipFieldProps & TextFieldProps) {
    return (
        <Autocomplete
            options={options}
            defaultValue={defaultValue}
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