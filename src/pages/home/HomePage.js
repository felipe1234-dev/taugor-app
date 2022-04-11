// Libs
import React, { 
    useState,
    useEffect,
    useContext
} from "react";
import {
    Paper,
    Container, 
    Typography,
    Grid
} from "@mui/material";
import PropTypes from "prop-types";

// Components
import Navbar from "./Navbar";
import Header from "./Header";
import TaskList from "./TaskList";
import Filters from "./Filters";
import NoResults from "./NoResults";
import IsFetching from "./IsFetching";
import { ElevationScroll } from "@app/components";

// Contexts
import { 
    FirebaseContext, 
    AlertContext, 
    UserContext 
} from "@app/contexts";

// API
import { getActivities } from "@app/collections";

// Functions
import { groupDocsByTime } from "@app/functions";

// Style
import "@app/style/pages/HomePage.scss";

function HomePage({ title }) {
    const [isFetching, setIsFetching] = useState(false);
    const [activities, setActivities] = useState([]);
    const [filters, setFilters] = useState({
        where: [],
        orderBy: [
            ["createdAt", "desc"] 
        ],
        limit: 30
    });
    
    const { db } = useContext(FirebaseContext);
    const { setSeverity, setMessage } = useContext(AlertContext);
    const [user] = useContext(UserContext);
    
	useEffect(() => (document.title = title), [title]);
    
    useEffect(() => {
        setIsFetching(true);
        
        getActivities(db, filters)
        .then((response) => {
            const grouped = Object.entries(groupDocsByTime(response));
            setActivities(grouped);
        })
        .catch((error) => console.log(error))
        .then(() => setTimeout(() => setIsFetching(false), 5000));
    }, [db, filters]);
    
    const props = {
        taskList: {
            activities: activities
        },
        container: {
			display: "flex"
		},
		paper: {
			className: `HomePage-main${isFetching? " is-loading" : ""}`,
			elevation: 0,
			sx: { pb: "50px" }
		},
		filtersContainer: {
			container: true,
			direction: "row",
			justifyContent: "space-between",
			alignItems: "center"
		},
		filterTitle: {
			className: "HomePage-filters-title",
			component: "h5",
			variant: "h5",
			gutterBottom: true,
			sx: { p: 2 }
		},
        navbar: {
            setFilters: (props) => setFilters(props)
        },
        filters: {
            setFilters: (props) => setFilters(props)
        }
    };
    
    return (
        <>
            <ElevationScroll>
                <Navbar {...props.navbar}/>
            </ElevationScroll>
            <Header />
            <Container {...props.container}>
                <Paper {...props.paper}>
                    <Grid {...props.filtersContainer}>
                        <Grid item>
                            <Typography {...props.filterTitle}>
                                Atividades
                            </Typography>
                        </Grid>
                        <Grid item> 
                            <Filters {...props.filters}/>
                        </Grid>
                    </Grid>
                    {isFetching? (
                        <IsFetching />
                    ) : (
                        activities.length > 0? (
                            <TaskList {...props.taskList}/> 
                        ) : (
                            <NoResults />
                        )
                    )}
                </Paper>
            </Container>
        </> 
    );
}

HomePage.propTypes = {
	title: PropTypes.string.isRequired
};

export default HomePage;