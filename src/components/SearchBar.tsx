// Libs
import { TextField, TextFieldProps } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// Styles
import "@local/style/components/SearchBar.scss";

// Props interface
interface SearchBarProps {
    hasIcon?: boolean
};

export default function SearchBar({ hasIcon = false, ...rest }: SearchBarProps & TextFieldProps) {
    return (
        <div className="SearchBar">
            {hasIcon && (
                <div className="SearchBar-iconWrapper">
                    <SearchIcon />
                </div>
            )}
            <TextField {...rest} fullWidth/>
        </div>
    );
};