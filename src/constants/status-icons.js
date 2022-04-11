import {
    CheckCircleOutlineRounded as FinishedIcon,
    Autorenew as InProgressIcon,
    AssessmentRounded as InAnalysisIcon
} from "@material-ui/icons";

const STATUS_ICONS = {
    "Finalizado": <FinishedIcon />,
    "Em andamento": <InProgressIcon />, 
    "Em análise": <InAnalysisIcon />
};

export default STATUS_ICONS;