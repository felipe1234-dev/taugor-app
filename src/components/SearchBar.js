import { TextField } from "@mui/material";
import { Search as SearchIcon } from "@material-ui/icons";
import PropTypes from "prop-types";

const SearchBar = ({ hasIcon, ...rest }) => (
    <div className="SearchBar">
		{hasIcon && 
			<div className="SearchBar-iconWrapper">
				<SearchIcon />
			</div>
		}
		<TextField {...rest} fullWidth/>
	</div>
);

SearchBar.propTypes = {
	hasIcon: PropTypes.bool
};

export default SearchBar;