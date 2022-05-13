import { 
    List, 
    ListItem, 
    ListItemIcon, 
    Skeleton, 
    ListItemText, 
    Typography, 
    Grid 
} from "@mui/material";
import { useOnMobile } from "@local/hooks";

export default function Loading() {
    const isMobile = useOnMobile("md");
    
    return (
        <List>
            {[...Array(10).keys()].map((key) => (
                <ListItem key={key}>
                    <ListItemIcon>
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={(
                            <Typography
                                component="div"
                                variant="h4"
                            >
                                <Skeleton width={isMobile ? "100%" : "60%"} />
                            </Typography>
                        )}
                        secondary={(
                            <>
                                <Typography
                                    component="div"
                                    variant="body2"
                                >
                                    <Skeleton width={isMobile ? "85%" : "45%"} />
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Skeleton width={60} />
                                    </Grid>
                                    <Grid item>
                                        <Skeleton width={60} />
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    />
                </ListItem>
            ))}
        </List>
    );
};