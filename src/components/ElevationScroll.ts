import React from "react";
import { useScrollTrigger } from "@mui/material";

interface ElevationScrollProps {
	children: React.ReactElement
};

export default function ElevationScroll({ children }: ElevationScrollProps) {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};