// Libs
import React, { 
    useState, 
    useEffect, 
    useContext 
} from "react";
import { 
    Tab,
    Tabs,
    AppBar, 
    Toolbar,
    Typography,
    useMediaQuery,
    IconButton,
    useTheme,
    Tooltip,
    Paper,
    Box
} from "@mui/material";
import {
    ListAltTwoTone as ListIcon,
    Face as FaceIcon
} from "@material-ui/icons";
import PropTypes from "prop-types";

// Constants
import { APP_INFO } from "@app/constants";

// Contexts
import { UserContext } from "@app/contexts";

// Components
import BurgerMenu from "./BurgerMenu";
import { ProfileImage, SearchBar } from "@app/components";

// Functions
import { stringToColor } from "@app/functions";

const { 
    appName, 
    whiteIcon, 
    alt 
} = APP_INFO; 

function Navbar({ setFilters }) {
    const [searchVal, setSearchVal] = useState("");
    const [selTab, setSelTab] = useState(0);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    const [user] = useContext(UserContext);
    const {
        uuid: userUuid, 
        photoURL, 
        displayName 
    } = user;
    
    useEffect(() => {
        setFilters(prevState => {
            const conditions = prevState.where.filter(where => !["title", "postedBy"].includes(where[0]));
			
			if (searchVal)
				conditions.push([ "title", "==", searchVal ]);

            if (selTab === 1) 
                conditions.push([ "postedBy", "==", userUuid ]);
                
			return ({
				where: [ ...conditions ],
				orderBy: prevState.orderBy,
				limit: prevState.limit
			});
        });
    }, [searchVal, selTab]);
    
    const menuItems = [
        {
            label: "Todas as atividades",
            icon: <ListIcon />
        },
        {
            label: "Suas atividades",
            icon: <FaceIcon />
        }
    ];
    
    const props = {
        appBar: {
            className: "HomePage-navbar",
            component: "nav",
            position: "sticky",
            elevation: 0
        },
        logo: {
            className: "HomePage-navbar-logo",
            src: whiteIcon,
            alt: alt
        },
        appName: {
            className: "HomePage-navbar-appName",
            component: "h1"
        },
        searchBar: {
            onChange: (event) => setSearchVal(event.target.value),
            placeholder: "Buscar por título" 
        },
        tooltip: {
            title: "Abrir configurações"
        },
        iconButton: {
            component: Paper,
            elevation: 1,
            sx: {
                border: `.05em solid ${displayName? stringToColor(displayName) : "#fff"} !important`,
                padding: "0 !important", 
                marginLeft: ".5em !important",
                backgroundColor: "transparent !important"
            }
        },
        profileImage: {
            className: "HomePage-navbar-profileImage",
            src: photoURL,
            alt: displayName 
        },
        tabs: {
            onChange: (event, newIndex) => setSelTab(newIndex),
            textColor: "inherit", 
            value: selTab
        },
        tab: ({ label, icon }, i) => ({
            key: i,
            value: i,
            icon: icon,
            label: label,
            iconPosition: "start" 
        }),
        burgerMenu: {
            selTab: selTab,
            setSelTab: (newIndex) => setSelTab(newIndex),
            navItems: menuItems
        }
    };
    
    return (
        <AppBar {...props.appBar}>
            <Toolbar>
                <img {...props.logo}/>
                
                <Typography {...props.appName}>
                    {appName}
                </Typography>
                
                <Box flexGrow={1} />
                
                {!isMobile? (
                    <>
                        <SearchBar {...props.searchBar}/>
                        <Tabs {...props.tabs}>
                            {menuItems.map((item, i) => (
                                <Tab {...props.tab(item, i)}/>
                            ))}
                        </Tabs>
                        <Tooltip {...props.tooltip}>
                            <IconButton {...props.iconButton}>
                                <ProfileImage {...props.profileImage}/>
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <BurgerMenu {...props.burgerMenu}/>
                )}
                
            </Toolbar>
        </AppBar>
    );
}

Navbar.propTypes = {
    setFilters: PropTypes.func.isRequired
};

export default Navbar;