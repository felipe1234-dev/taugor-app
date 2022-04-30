import { useMediaQuery, useTheme } from "@mui/material";

export default function useOnMobile(breakpoint: "xs"|"sm"|"md"|"lg"|"xl") {
    const theme    = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));
    
    return isMobile;
}