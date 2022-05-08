// Libs
import { useState, MouseEvent } from "react";
import { 
    Tabs, 
    Tab, 
    Tooltip, 
    IconButton, 
    Paper, 
    TextField,
    Menu,
    MenuItem
} from "@mui/material";

// Local components
import { ProfileImage } from "@local/components";

// Functions
import { stringToColor } from "@local/functions";

// Interfaces
import { User } from "@local/interfaces";
import { MenuProps } from "./RightSide";

export default function DesktopMenu({
    search,
    setSearch,
    tab,
    setTab,
    menuItems,
    profileItems,
    ...user 
}: MenuProps & User) {
    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
    const menuIsOpen = !!anchorEl;
    
    const onClickMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    
    const onCloseMenu = () => {
        setAnchorEl(null);
    }
    
    return (
        <>
            <div className="HomePage-navbar-searchBar">
                <TextField 
                    onChange={(event: any) => setSearch(event.target.value)}
                    placeholder="Buscar por título"
                    fullWidth
                />
            </div>
            
            <Tabs
                textColor="inherit"
                value={tab}
                onChange={(event: any, newTab: 0|1) => setTab(newTab)}
            >
                {menuItems.map((item, i) => (
                    <Tab
                        key={i}
                        value={i}
                        icon={item.icon}
                        label={item.label}
                        iconPosition="start"
                    />
                ))}
            </Tabs>
            
            <Tooltip title="Abrir opções de perfil">
                <IconButton 
                    component={Paper}
                    elevation={1}
                    onClick={onClickMenu}
                    sx={{
                        border: `.05em solid ${stringToColor(user.displayName)} !important`,
                        padding: "0 !important",
                        marginLeft: ".5em !important",
                        backgroundColor: "transparent !important"
                    }}
                >
                    <ProfileImage                
                        className="HomePage-navbar-profileImage"
                        src={user.photoURL}
                        alt={user.displayName}
                    />
                </IconButton>
            </Tooltip>
            
            <Menu
                anchorEl={anchorEl}
                open={menuIsOpen}
                onClose={onCloseMenu}
            >
                {Object.entries(profileItems).map(([label, props]) => (
                    <MenuItem key={label} {...props}>
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}