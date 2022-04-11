// Libs
import React, { useState, useEffect } from "react";
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
} from "@material-ui/icons";
import PropTypes from "prop-types";

function Filters({ setFilters }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selStatus, setSelStatus] = useState("Todos");
	const [selPriority, setSelPriority] = useState("Todas");
	const drawerBleeding = 52;

	const props = {
		swipeableDrawer: {
			anchor: "bottom",
			open: isOpen,
			onOpen: () => setIsOpen(true),
			onClose: () => setIsOpen(false),
			swipeAreaWidth: drawerBleeding,
			disableSwipeToOpen: false,
			ModalProps: {
				keepMounted: true,
			},
		},
		puller: {
			className: "HomePage-filters-puller",
		},
		filterButton: {
			className: "HomePage-filters-button",
			onClick: () => setIsOpen(true),
		},
		form: {
			component: "form",
			sx: {
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "flex-start",
				alignItems: "center",
				padding: "2em !important",
			},
		},
		label: {
			variant: "body1", 
			sx: { margin: "1em !important" }
		},
		statusSelector: {
			value: selStatus,
			onChange: (event) => setSelStatus(event.target.value)
		},
		prioritySelector: {
			value: selPriority,
			onChange: (event) => setSelPriority(event.target.value)
		}
	};
	
	useEffect(() => {
		setFilters(prevState => {
			const conditions = prevState.where.filter(where => !["status", "priority"].includes(where[0]));
			
			if (selStatus !== "Todos")
				conditions.push([ "status", "==", selStatus ]);
			
			if (selPriority !== "Todas")
				conditions.push([ "priority", "==", selPriority ]);

			return ({
				where: [ ...conditions ],
				orderBy: prevState.orderBy,
				limit: prevState.limit
			});
		});
	}, [selPriority, selStatus]);
	
	const statusTypes = [
		"Todos",
		"Em análise",
		"Em andamento",
		"Finalizado"
	];
	
	const priorityTypes = [
		"Todas",
		"Baixa",
		"Média",
		"Alta"
	];

	return (
		<>
			<SwipeableDrawer {...props.swipeableDrawer}>
				<Box sx={{ minHeight: "50px" }}>
					<Box {...props.puller} />
				</Box>
				<Box {...props.form}>
					<FormControl>
						<Typography {...props.label}>
							Status:
						</Typography>
					</FormControl>
					<FormControl>
						<Select {...props.statusSelector}>
							{statusTypes.map((status, i) => (
								<MenuItem key={i} value={status}>
									{status}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					
					<FormControl>
						<Typography {...props.label}>
							Prioridade:
						</Typography>
					</FormControl>
					<FormControl>
						<Select {...props.prioritySelector}>
							{priorityTypes.map((priority, i) => (
								<MenuItem key={i} value={priority}>
									{priority}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</SwipeableDrawer>
			<Tooltip title="Lista de filtros">
				<IconButton {...props.filterButton}>
					{!isOpen ? <FilterListIcon /> : <CloseIcon />}
				</IconButton>
			</Tooltip>
		</>
	);
}

Filters.propTypes = {
	setFilters: PropTypes.func.isRequired
};

export default Filters;