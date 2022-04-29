// Libs
import React from "react";
import { 
    Container, 
    Paper, 
    Grid, 
    Typography 
} from "@mui/material";

// Page components
import NoResults from "./NoResults";
import TaskList from "./TaskList";

// Local components
import { Spinner } from "@local/components";

// Contexts
import { TimelineContext } from "../contexts";

// Props interface
interface BodyProps {
    loaderRef: React.RefObject<HTMLDivElement>
};

export default function Body({ loaderRef }: BodyProps) {
    const { timeline, isLoading } = React.useContext(TimelineContext);
    
    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Paper
                className={`HomePage-main${isLoading? " isLoading" : ""}`}
                sx={{ pb: "50px" }}
                elevation={0}
            >
                <Grid
                    container
                    sx={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <Grid item sx={{ p: 2 }}>
                        <Typography 
                            className="MuiTypography-root-hasCoolUnderline"
                            component="h5"
                            variant="h5"
                            gutterBottom
                        >
                            Atividades 
                        </Typography>
                    </Grid>
                </Grid>
                {!isLoading? (
                    Object.entries(timeline).length > 0? (
                        <> 
                            <TaskList />
                            {/* Quando visível, carrega mais documentos da base de dados*/}
                            <div id="loader" ref={loaderRef} /> 
                        </>
                    ) : (
                        <NoResults />
                    )
                ) : (
                    <Spinner 
                        wrapper={{
                            width: "100%",
                            height: "300px"
                        }}
                        
                        spinner={{
                            width: "2em",
                            height: "2em"
                        }}
                    />
                )}
            </Paper>
        </Container>
    );
};