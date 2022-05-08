// Libs
import { 
    useContext, 
    useState, 
    useEffect 
} from "react";
import { IconButton, MenuItemProps } from "@mui/material";
import {
    ListAltTwoTone as ListIcon,
    Face as FaceIcon,
    MoreVertTwoTone as MenuIcon,
    CloseRounded as CloseIcon
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

// Navbar components
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

// Interfaces
import { User } from "@local/interfaces";

// Hooks
import { useQueryParams, useOnMobile } from "@local/hooks";

// Contexts
import { AlertContext } from "@local/contexts";
import { FilterContext } from "../contexts";

// API
import { logOut } from "@local/api/auth";

// Props interface
export interface MenuProps {
    search: string,
    setSearch(newSearch: string): void,
    tab: number,
    setTab(newTab: number): void,
    menuItems: Array<{
        label: string,
        icon: JSX.Element
    }>,
    profileItems: {
        [label: string]: MenuItemProps
    }
};

export default function RightSide(user: User) {
    const queryParams   = useQueryParams();
    const initialSearch = queryParams.get("search") ?? "";
    const initialTab    = Number(queryParams.get("owner")) ?? 0;
    
    const [search, setSearch] = useState<string>(initialSearch);
    const [tab, setTab]       = useState<number>(initialTab);
    
    const [burgerIsOpen, setBurgerIsOpen] = useState<boolean>(false);
    
    const { setMessage, setSeverity } = useContext(AlertContext);
    const { filter, setFilter } = useContext(FilterContext);
    
    const isMobile = useOnMobile("md");
    const navigate = useNavigate();
    
    useEffect(() => {
        const { where } = filter;
        
        const conditions = !!where? where.filter((where) => {
            return !["title", "postedBy"].includes(where[0] as string)
        }) : [];

        if (!!search) {
            conditions.push(["title", "array-contains-any", search.split(" ")]);
            queryParams.set("search", search);
        } else {
            queryParams.delete("search");
        }

        if (tab === 1) {
            conditions.push(["postedBy", "==", user.uuid]);
            queryParams.set("owner", "1");
        } else {
            queryParams.delete("owner");
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
    
    const onLogOut = () => {
        logOut()
            .then(() => {
                setSeverity("success"); 
                setMessage("Log out feito com sucesso");
                    
                setTimeout(() => (
                    navigate("/login", { state: { enableLoader: true } })
                ), 4000);
            })
            .catch((error) => {
                setMessage(error.message);
                setSeverity(error.severity);
            });
    };
    
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
    
    const profileItems = {
        "Perfil": {
            component: Link,
            disabled: true,
            to: `/user/${user.uuid}`
        },
        "Configurações": {
            component: Link,
            disabled: true,
            to: "/settings/"
        },
        "Sair": {
            onClick: () => onLogOut()
        }
    };
    
    const baseProps = {
        search,
        setSearch,
        tab,
        setTab,
        menuItems,
        profileItems
    };
    
    return (
        !isMobile ? (
            <DesktopMenu
                {...baseProps}
                {...user}
            />
        ) : (
            <>
                <MobileMenu
                    open={burgerIsOpen}
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