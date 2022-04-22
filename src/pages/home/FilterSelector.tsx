// Libs
import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    SwipeableDrawer,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    Tooltip,
} from "@mui/material";
import {
    FilterListRounded as FilterListIcon,
    CloseRounded as CloseIcon,
} from "@mui/icons-material";

// Interfaces
import { Filter } from "@local/interfaces/index";

// Constants
import {
    STATUS_TYPES,
    PRIORITY_TYPES
} from "@local/constants/index";

// Types
import {
    Priority,
    Status,
    WhereClasule
} from "@local/types/index";

// Props interface
interface Props {
    filter: Filter,
    setFilter(params: Filter): void
};

export default function FilterSelector({ filter, setFilter }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selStatus, setSelStatus] = useState<"Todos" | Status>("Todos");
    const [selPriority, setSelPriority] = useState<"Todas" | Priority>("Todas");

    useEffect(() => {
        const conditions = filter.where ? filter.where.filter((where: WhereClasule) => {
            return !["status", "priority"].includes(where[0] as string)
        }) : [];

        if (selStatus !== "Todos")
            conditions.push(["status", "==", selStatus]);

        if (selPriority !== "Todas")
            conditions.push(["priority", "==", selPriority]);

        /* Quando temos um objeto com propriedades duplicadas, o valor que 
         * vier por último tem prioridade, portanto, "where: conditions" 
         * ssobrescreverá "filter.where".
         */
        setFilter({
            ...filter,
            where: conditions
        });
    }, [selPriority, selStatus]);

    const drawerBleeding = 52;

    const swipeableDrawer = {
        anchor: "bottom" as "bottom",
        open: isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        swipeAreaWidth: drawerBleeding,
        disableSwipeToOpen: false,
        ModalProps: {
            keepMounted: true,
        }
    }

    const box = {
        sx: { minHeight: "50px" }
    }

    const puller = {
        className: "HomePage-filters-puller",
    }

    const tooltip = {
        title: "Lista de filtros"
    }

    const filterButton = {
        className: "HomePage-filters-button",
        onClick: () => setIsOpen(true),
    }

    const form = {
        component: "form" as "form",
        sx: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "2em !important",
        }
    }

    const label = {
        variant: "body1" as "body1",
        sx: { margin: "1em !important" }
    }

    const statusSelector = {
        value: selStatus,
        onChange: (event: any) => setSelStatus(event.target.value)
    }

    const prioritySelector = {
        value: selPriority,
        onChange: (event: any) => setSelPriority(event.target.value)
    }

    return (
        <>
            <SwipeableDrawer {...swipeableDrawer}>
                <Box {...box}>
                    <Box {...puller} />
                </Box>
                <Box {...form}>
                    <FormControl>
                        <Typography {...label}>
                            Status:
                        </Typography>
                    </FormControl>
                    <FormControl>
                        <Select {...statusSelector}>
                            {["Todos", ...STATUS_TYPES].map((status: string, i: number) => (
                                <MenuItem key={i} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <Typography {...label}>
                            Prioridade:
                        </Typography>
                    </FormControl>
                    <FormControl>
                        <Select {...prioritySelector}>
                            {["Todas", ...PRIORITY_TYPES].map((priority: string, i: number) => (
                                <MenuItem key={i} value={priority}>
                                    {priority}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </SwipeableDrawer>
            <Tooltip {...tooltip}>
                <IconButton {...filterButton}>
                    {!isOpen ? <FilterListIcon /> : <CloseIcon />}
                </IconButton>
            </Tooltip>
        </>
    );
};