// Libs
import { 
    useContext, 
    useState, 
    useEffect 
} from "react";
import { 
    IconButton,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {
    ListAltTwoTone as ListIcon,
    Face as FaceIcon,
    MoreVertTwoTone as MenuIcon,
    CloseRounded as CloseIcon
} from "@mui/icons-material";

// Navbar components
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

// Interfaces
import { User } from "@local/interfaces";

// Contexts
import { FilterContext } from "../contexts";

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

export interface MenuProps {
    search: string,
    setSearch(newSearch: string): void,
    tab: 0|1,
    setTab(newTab: 0|1): void,
    menuItems: typeof menuItems
}

export default function RightSide(user: User) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    const [burgerIsOpen, setBurgerIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [tab, setTab] = useState<0|1>(0);
    const { filter, setFilter } = useContext(FilterContext);

    useEffect(() => {
        const { where } = filter;
        
        const conditions = !!where? where.filter((where) => {
            return !["title", "postedBy"].includes(where[0] as string)
        }) : [];

        if (!!search) {
            conditions.push(["title", "array-contains-any", search.split(" ")]);
        }

        if (tab === 1) {
            conditions.push(["postedBy", "==", user.uuid]);
        }

        /* Quando temos um objeto com propriedades duplicadas, o valor que 
         * vier por último tem prioridade, portanto, "where: conditions" 
         * sobrescreverá "filter.where".
         */
        setFilter({
            ...filter,
            where: conditions
        });
    }, [search, tab]);
    
    const baseProps = {
        search,
        setSearch,
        tab,
        setTab,
        menuItems
    }
    
    return (
        !isMobile ? (
            <DesktopMenu
                {...baseProps}
                {...user}
            />
        ) : (
            <>
                <MobileMenu
                    isOpen={burgerIsOpen}
                    onClose={() => setBurgerIsOpen(false)}
                    {...baseProps}
                    {...user}
                />
                <IconButton onClick={() => setBurgerIsOpen(prevState => !prevState)}>
                    {burgerIsOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            </>
        )
    );
}