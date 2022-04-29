// Libs
import React, { Fragment } from "react";
import {
    List,
    ListSubheader,
    Divider
} from "@mui/material";

// TaskList components 
import TaskItem from "./TaskItem";

// Contexts
import { TimelineContext } from "../contexts";

// Interfaces
import { Task } from "@local/interfaces";

export default function TaskList() {
    const { timeline } = React.useContext(TimelineContext);
    
    return (
        <List className="HomePage-taskList">
            {Object.entries(timeline).map(([time, tasks]: [string, Array<Task>]) => (
                <Fragment key={time}>
                    <ListSubheader>
                        {time}
                    </ListSubheader>
                    {tasks.map((task, i) => (
                        <Fragment key={i}>
                            <TaskItem {...task} />
                        </Fragment>
                    ))}
                    <Divider
                        variant="inset"
                        component="li"
                    />
                </Fragment>
            ))}
        </List>
    );
};