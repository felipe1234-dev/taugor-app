// Libs
import {
    LowPriority as LowPriorityIcon,
    GradeRounded as MediumPriorityIcon,
    PriorityHigh as HighPriorityIcon,
    CheckCircleOutlineRounded as FinishedIcon,
    Autorenew as InProgressIcon,
    AssessmentRounded as InAnalysisIcon
} from "@mui/icons-material";

// Images
import WhiteTaugorLogo from "@local/media/white-taugor-logo.png";
import BlueTaugorLogo from "@local/media/blue-taugor-logo.png";
import WhiteTaugorIcon from "@local/media/white-taugor-icon.png";

export const APP_INFO = { 
    appName: "Gestor de Atividades Taugor",
    catchline: "Gerencie as suas atividades dentro da empresa",
    whiteLogo: WhiteTaugorLogo,
    blueLogo: BlueTaugorLogo,  
    whiteIcon: WhiteTaugorIcon,
    alt: "Taugor Corporation",
    link: "http://www.taugor.com.br/"
};

export const STATUS_TYPES = [
    "Em análise",
    "Em andamento",
    "Finalizado"
] as const;

export const STATUS_ICONS = {
    "Finalizado": <FinishedIcon />,
    "Em andamento": <InProgressIcon />, 
    "Em análise": <InAnalysisIcon />
};

export const PRIORITY_TYPES = [
    "Baixa",
    "Média",
    "Alta"
] as const;

export const PRIORITY_ICONS = {
    "Baixa": <LowPriorityIcon />,
    "Média": <MediumPriorityIcon />,
    "Alta": <HighPriorityIcon />
};

export const ENV_TYPES = [
    "Ambiente de Produção - Cliente Ativo/Licença",
    "Dados/Ambiente de Testes - Somente testes"
] as const;

export const INFLUENCED_USERS = [
    "1-10",
    "11-30",
    "31-50",
    "51+"
] as const;