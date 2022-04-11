import moment from "moment";

const getEnv = (key) => process.env[`REACT_APP_${key}`];

const translateDate = (dateStr) => (
	dateStr
		.replace("day", "dia")
		.replace("months", "meses")
		.replace("month", "mês")
		.replace("year", "ano")
		.replace("minute", "minuto")
		.replace("second", "segundo")
		.replace("hour", "hora")
		.replace("ago", "atrás")
		.replace(/^a\s/, "1 ")
		.replace(/^an\s/, "1 ")
		.replace("a few", "alguns")
		.replace("Jan", "janeiro")
		.replace("Feb", "fevereiro")
		.replace("Mar", "março")
		.replace("Apr", "abril")
		.replace("May", "maio")
		.replace("Jun", "junho")
		.replace("Jul", "julho")
		.replace("Aug", "Agosto")
		.replace("Sept", "setembro")
		.replace("Oct", "outubro")
		.replace("Nov", "novembro")
		.replace("Dec", "dezembro")
);
        
const groupDocsByTime = (docs) => {
	const today = moment();
	const yesterday = moment().subtract(1, "day");
	const grouped = {};

	docs.docs.forEach((doc) => {
		const date = new Date(doc.data().createdAt.seconds * 1000);
		let groupName = "";

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

		grouped[groupName].push({ uuid: doc.id, ...doc.data() });
	});
    
    return grouped;
};

function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};

export { 
	getEnv, 
	translateDate, 
	groupDocsByTime, 
	stringToColor 
};