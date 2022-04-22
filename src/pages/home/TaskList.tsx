// Libs
import { Fragment } from "react";
import {
    List,
    ListSubheader,
    Divider
} from "@mui/material";

// Components 
import TaskItem from "./TaskItem";

// Interfaces
import { Task, Timeline } from "@local/interfaces";

// Props interface
interface TaskListProps {
    timeline: Timeline
};

export default function TaskList({ timeline }: TaskListProps) {
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