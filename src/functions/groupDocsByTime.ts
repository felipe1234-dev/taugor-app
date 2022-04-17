import moment from "moment";
import translateDate from "./translateDate";
import { Timeline, Task } from "@local/interfaces";

export default function groupDocsByTime(docs: Array<Task>) : Timeline {
	const grouped: Timeline = {};
	const today     = moment();
	const yesterday = moment().subtract(1, "day");

	docs.forEach((doc) => {
		let groupName = "";
		const date    = new Date(doc.createdAt.seconds * 1000);

		if (today.diff(date, "days") === 0) {
			groupName = "Hoje";
		} else if (yesterday.diff(date, "days") === 0) {
			groupName = "Ontem";
		} else {
			groupName = translateDate(moment(date).fromNow());
		}

		if (!(groupName in grouped)) {
			grouped[groupName] = [];
		}

		const task = doc;
		
		grouped[groupName].push(task);
	});
    
    return grouped;
}; 