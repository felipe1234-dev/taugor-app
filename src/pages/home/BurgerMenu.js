// Libs
import React, { 
    useState, 
    useContext 
} from "react";
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
    Box
} from "@mui/material";
import { 
    MoreVertTwoTone as MenuIcon,
    CloseRounded as CloseIcon
} from "@mui/icons-material";
import PropTypes from "prop-types";

// Contexts
import { UserContext } from "@app/contexts";

// Components
import { ProfileImage } from "@app/components";

function BurgerMenu({ navItems, selTab, setSelTab }) {
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);
    
    const [user] = useContext(UserContext);
    const { displayName, photoURL } = user;
    
    const props = {
        drawer: {
            className: "HomePage-navbar-burgerMenu",
            anchor: "left",
            open: burgerIsOpen,
            onClose: () => setBurgerIsOpen(false)
        },
        header: {
            className: "HomePage-navbar-burgerMenu-header",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        },
        list: {
            className: "HomePage-navbar-burgerMenu-list",
        },
        listItem: (index) => ({
            key: index,
            button: true,
            style: {
                opacity: selTab === index? "1" : ".5"
            },
            onClick: () => {
                setSelTab(index);
                setBurgerIsOpen(false);
            }
        }),
        burgerButton: {
            onClick: () => setBurgerIsOpen(prevState => !prevState)
        }
    };
    
    const listItems = navItems.map(({ label }, i) => (
        <ListItem {...props.listItem(i)}>
            <ListItemText>
                {label}
            </ListItemText>
        </ListItem>
    ));
    
	return (
		<>
			<Drawer {...props.drawer}>
                <Box {...props.header}>
                    <ProfileImage 
                        src={photoURL}
                        alt={displayName}
                    />
                </Box>
				<List {...props.list}>
                    {listItems}
				</List>
			</Drawer>
            <IconButton {...props.burgerButton}>
                {burgerIsOpen? <CloseIcon /> : <MenuIcon />}
            </IconButton>
		</>
	);
}

BurgerMenu.propTypes = {
    navItems: PropTypes.array.isRequired,
    selTab: PropTypes.number.isRequired,
    setSelTab: PropTypes.func.isRequired
};

export default BurgerMenu;