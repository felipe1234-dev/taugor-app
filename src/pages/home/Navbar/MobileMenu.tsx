// Libs
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box
} from "@mui/material";

// Components
import { ProfileImage } from "@local/components";
import { MenuProps } from "./RightSide";
import { User } from "@local/interfaces";

// Props interface
interface MobileMenuProps {
    isOpen?: boolean,
    onClose?: Function
}

export default function MobileMenu({
    search,
    setSearch,
    tab,
    setTab,
    menuItems,
    isOpen = false,
    onClose = () => { },
    ...user
}: MenuProps & MobileMenuProps & User) {
    return (
        <Drawer
            className="HomePage-navbar-burgerMenu"
            anchor="left"
            open={isOpen}
            onClose={() => onClose()}
        >
            <Box
                className="HomePage-navbar-burgerMenu-header"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >
                <ProfileImage
                    src={user.photoURL}
                    alt={user.displayName}
                />
            </Box>
            <List className="HomePage-navbar-burgerMenu-list">
                {menuItems.map(({ label }, i) => (
                    <ListItem
                        button
                        key={i}
                        sx={{ opacity: tab as number === i ? "1" : ".5" }}
                        onClick={() => setTab(i as 0 | 1)}
                    >
                        <ListItemText>
                            {label}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};