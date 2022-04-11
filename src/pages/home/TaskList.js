// Libs
import React, { Fragment } from "react";
import {
	List,
	ListSubheader,
	Divider
} from "@mui/material";
import PropTypes from "prop-types";

// Components 
import TaskItem from "./TaskItem";

function TaskList({ activities }) {
	const props = {
		taskList: {
			className: "HomePage-taskList"
		},
		divider: { 
			variant: "inset",
			component: "li",
		}
	};

	return (
		<List {...props.taskList}>
			{activities.map(([time, tasks]) => (
				<Fragment key={time}>
					<ListSubheader>
						{time}
					</ListSubheader>
					{tasks.map((task, index) => (
						<Fragment key={index}>
							<TaskItem {...task} />
						</Fragment>
					))}
					<Divider {...props.divider} />
				</Fragment>
			))}
		</List>
	);
}
 
TaskList.propTypes = {
	activities: PropTypes.array.isRequired
};

export default TaskList;
