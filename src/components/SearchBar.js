// Libs
import React from "react";
import { TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

// Styles
import "@app/style/components/SearchBar.scss";

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

SearchBar.defaultProps = {
	hasIcon: false
};

export default SearchBar;