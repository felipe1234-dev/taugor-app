// Libs
import { 
    TextField,
    TextFieldProps,
    Autocomplete 
} from "@mui/material";

// Props interface
interface ChipFieldProps {
    options: Array<string>,
    defaultValue: Array<string>
};

export default function ChipField({ options, defaultValue, ...textField }: ChipFieldProps & TextFieldProps) {
    const autocomplete = {
        multiple: true,
        options,
        defaultValue,
        filterSelectedOptions: true,
        renderInput: (params: TextFieldProps) => (
            <TextField
                {...params}
                {...textField}
            />
        )
    }
    
    return <Autocomplete {...autocomplete}/>;
};