// Libs
import { 
    useState, 
    MouseEvent, 
    ChangeEvent 
} from "react";
import { 
    Tabs, 
    Tab, 
    Tooltip, 
    IconButton, 
    Paper,
    Menu,
    MenuItem
} from "@mui/material";

// Local components
import { ProfileImage, SearchBar } from "@local/components";

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
    };
    
    const onCloseMenu = () => {
        setAnchorEl(null);
    };
    
    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    
    return (
        <>
            <SearchBar 
                normalWidth={20}
                widthOnHover={25}
                onChange={onSearch}
                value={search}
                placeholder="Buscar por título"
            />
            
            <Tabs
                textColor="inherit"
                value={tab}
                onChange={(event: any, tabIndex: number) => setTab(tabIndex)}
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
};