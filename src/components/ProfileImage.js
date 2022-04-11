import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { stringToColor } from "@app/functions";

function stringAvatar(name) {
	const letters = name.match(/(^\w|\s\w)/g);

	letters.forEach((char, index) => letters[index] = char.trim());
	
	let shortName = letters.join("");
	shortName = shortName.length > 1? shortName[0] + shortName[1] : shortName[0];
	
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: shortName,
	};
}

const ColorAvatar = ({ alt, ...rest }) => (
    <Avatar {...stringAvatar(alt)} {...rest} />
);

ColorAvatar.propTypes = {
	alt: PropTypes.string
}

const ProfileImage = ({ src, alt, ...rest }) => (
	(!src && alt)? <ColorAvatar alt={alt} {...rest}/>
	: <Avatar src={src} alt={alt} {...rest}/> 
);

ProfileImage.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string
}

export default ProfileImage;