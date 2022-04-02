export function truncate(string, n) {
	return string?.length > n ? string.substr(0, n - 1) + "..." : string;
}

export function getItemFromLocalStorage(getItemKey) {
	return JSON.parse(localStorage.getItem(getItemKey));
}

export function setItemFromLocalStorage(setItemKey, value) {
	return localStorage.setItem(setItemKey, JSON.stringify(value));
}

export function convertDateAndTime(param) {
	const dateAndTime = new Date(param);
	let hours = dateAndTime.getHours();
	let minutes = dateAndTime.getMinutes();
	if (minutes <= 9) {
		minutes = `0${minutes}`;
	}
	const month = dateAndTime.getUTCMonth() + 1;
	const year = dateAndTime.getFullYear();
	const date = dateAndTime.getDate();
	let meridian = "am";
	if (hours == 12) {
		meridian = "pm";
	}
	if (hours > 12) {
		hours = hours - 12;
		meridian = "pm";
	}

	if (hours == 0) {
		hours = 12;
		meridian = "am";
	}
	// console.log(`${date}/${month}/${year} ${hours}:${minutes}${meridian}`)

	return `${date}/${month}/${year} ${hours}:${minutes}${meridian}`;
}
convertDateAndTime();
