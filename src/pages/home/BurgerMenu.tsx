// Libs
import { 
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

// Contexts
import { UserContext } from "@local/contexts";

// Components
import { ProfileImage } from "@local/components";

// Props interface
interface Props {
    navItems: Array<{ label: string, icon: JSX.Element }>,
    selTab: 0|1,
    setSelTab(tab: 0|1): void
};

export default function BurgerMenu({ navItems, selTab, setSelTab }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const { user } = useContext(UserContext);
    
    const drawer = {
        className: "HomePage-navbar-burgerMenu",
        anchor: "left" as "left",
        open: isOpen,
        onClose: () => setIsOpen(false)
    }
    
    const header = {
        className: "HomePage-navbar-burgerMenu-header",
        sx: { 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }
    }
    
    const profileImage = {
        src: !!user? user.photoURL : undefined,
        alt: !!user? user.displayName : "Nada"
    }
    
    const list = {
        className: "HomePage-navbar-burgerMenu-list"
    }
    
    const listItem = (i: 0|1) => ({
        key: i,
        style: {
            opacity: selTab === i ? "1" : ".5"
        },
        onClick: () => {
            setSelTab(i);
            setIsOpen(false);
        }
    });
    
    const burgerButton = {
        onClick: () => setIsOpen(prevState => !prevState)
    }
    
	return (
		<>
			<Drawer {...drawer}>
                <Box {...header}>
                    <ProfileImage {...profileImage}/>
                </Box>
				<List {...list}>
                    {navItems.map(({ label }, i) => (
                        <ListItem {...listItem(i as 0|1)} button>
                            <ListItemText>
                                {label}
                            </ListItemText>
                        </ListItem>
                    ))}
				</List>
			</Drawer>
            <IconButton {...burgerButton}>
                {isOpen? <CloseIcon /> : <MenuIcon />}
            </IconButton>
		</>
	);
};