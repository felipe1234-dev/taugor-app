// Libs
import { ChangeEvent } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box
} from "@mui/material";

// Components
import { ProfileImage, SearchBar } from "@local/components";
import { MenuProps } from "./RightSide";
import { User } from "@local/interfaces";

// Props interface
interface MobileMenuProps {
    open?: boolean,
    onClose?: Function
}

export default function MobileMenu({
    search,
    setSearch,
    tab,
    setTab,
    menuItems,
    open = false,
    onClose = () => { },
    ...user
}: MenuProps & MobileMenuProps & User) {
    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    
    return (
        <Drawer
            className="HomePage-navbar-burgerMenu"
            anchor="left"
            variant="persistent"
            open={open}
            onClose={() => onClose()}
        >
            <Box
                className="HomePage-navbar-burgerMenu-header"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <ProfileImage
                    src={user.photoURL}
                    alt={user.displayName}
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <SearchBar 
                    normalWidth={100}
                    widthOnHover={100}
                    onChange={onSearch}
                    value={search}
                    placeholder="Buscar por título"
                />
            </Box>
            <List className="HomePage-navbar-burgerMenu-list">
                {menuItems.map(({ label }, i) => (
                    <ListItem
                        button
                        key={i}
                        sx={{ opacity: tab as number === i ? "1" : ".5" }}
                        onClick={() => setTab(i)}
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