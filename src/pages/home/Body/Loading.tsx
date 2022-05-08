import { 
    List, 
    ListItem, 
    ListItemIcon, 
    Skeleton, 
    ListItemText, 
    Typography, 
    Grid 
} from "@mui/material";

export default function Loading() {
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
                                <Skeleton width={300} />
                            </Typography>
                        )}
                        secondary={(
                            <>
                                <Typography
                                    component="div"
                                    variant="body2"
                                >
                                    <Skeleton width={260} />
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Skeleton width={180} />
                                    </Grid>
                                    <Grid item>
                                        <Skeleton width={180} />
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