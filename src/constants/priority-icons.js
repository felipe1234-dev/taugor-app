import React from "react";
import {
    LowPriority as LowPriorityIcon,
    GradeRounded as MediumPriorityIcon,
    PriorityHigh as HighPriorityIcon
} from "@mui/icons-material";

const PRIORITY_ICONS = {
    "Baixa": <LowPriorityIcon />,
    "Média": <MediumPriorityIcon />,
    "Alta": <HighPriorityIcon />
};

export default PRIORITY_ICONS;