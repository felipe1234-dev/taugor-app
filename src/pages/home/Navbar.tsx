// Libs
import {
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
} from "@mui/icons-material";

// Contexts
import { UserContext } from "@local/contexts";

// Components
import BurgerMenu from "./BurgerMenu";

// Local components
import { ProfileImage, SearchBar } from "@local/components";

// Hooks
import { useOnScroll } from "@local/hooks";

// Functions
import { stringToColor } from "@local/functions";

// Interfaces
import { Filter } from "@local/interfaces";

// Types
import { WhereClasule } from "@local/types";

// Constants
import { APP_INFO } from "@local/constants";

const {
    appName,
    whiteIcon,
    alt
} = APP_INFO;

// NavbarProps interface
interface NavbarProps {
    filter: Filter,
    setFilter(params: Filter): void
};

export default function Navbar({ filter, setFilter }: NavbarProps) {
    const [searchVal, setSearchVal] = useState<string>("");
    const [selTab, setSelTab] = useState<0 | 1>(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { user } = useContext(UserContext);
    
    const hideAppBar = useOnScroll(300);
    
    useEffect(() => {
        const conditions = filter.where ? filter.where.filter((where: WhereClasule) => {
            return !["title", "postedBy"].includes(where[0] as string)
        }) : [];

        if (!!searchVal)
            conditions.push(["title", "array-contains-any", searchVal.split(" ")]);

        if (selTab === 1 && !!user)
            conditions.push(["postedBy", "==", user.uuid]);

        setFilter({
            ...filter,
            where: conditions
        });
    }, [user, searchVal, selTab]);

    const menuItems = [
        {
            label: "Todas as atividades",
            icon: <ListIcon />
        },
        {
            label: "Suas atividades",
            icon: <FaceIcon />
        }
    ]

    const appBar = {
        className: "HomePage-navbar",
        component: "nav",
        position: "sticky" as "sticky",
        elevation: 0,
        style: {
            top: hideAppBar? "-60px" : "0"
        }
    }

    const logo = {
        className: "HomePage-navbar-logo",
        src: whiteIcon,
        alt: alt
    }

    const brand = {
        className: "HomePage-navbar-appName",
        component: "h1"
    }

    const box = {
        flexGrow: 1
    }

    const searchBar = {
        onChange: (event: any) => setSearchVal(event.target.value),
        placeholder: "Buscar por título"
    }

    const tabs = {
        onChange: (event: any, newIndex: 0 | 1) => setSelTab(newIndex),
        textColor: "inherit" as "inherit",
        value: selTab
    }

    const tab = (tab: any, i: number) => ({
        key: i,
        value: i,
        icon: tab.icon,
        label: tab.label,
        iconPosition: "start" as "start"
    });

    const tooltip = {
        title: "Abrir configurações"
    }

    const iconButton = {
        component: Paper,
        elevation: 1,
        sx: {
            border: `.05em solid ${!!user ? stringToColor(user.displayName) : "#fff"} !important`,
            padding: "0 !important",
            marginLeft: ".5em !important",
            backgroundColor: "transparent !important"
        }
    }

    const profileImage = {
        className: "HomePage-navbar-profileImage",
        src: !!user ? user.photoURL : undefined,
        alt: !!user ? user.displayName : "Nada"
    }

    const burgerMenu = {
        selTab: selTab,
        setSelTab: (newIndex: 0 | 1) => setSelTab(newIndex),
        navItems: menuItems
    }

    return (
        <AppBar {...appBar}>
            <Toolbar>
                <img {...logo} />

                <Typography {...brand}>
                    {appName}
                </Typography>

                <Box {...box} />

                {!isMobile ? (
                    <>
                        <SearchBar {...searchBar} />
                        <Tabs {...tabs}>
                            {menuItems.map((item, i) => (
                                <Tab {...tab(item, i)} />
                            ))}
                        </Tabs>
                        <Tooltip {...tooltip}>
                            <IconButton {...iconButton}>
                                <ProfileImage {...profileImage} />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : <BurgerMenu {...burgerMenu} />}

            </Toolbar>
        </AppBar>
    );
};