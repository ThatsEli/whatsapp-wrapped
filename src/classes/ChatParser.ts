export function parseChatMessages(messages: string): ChatData {
	if(messages.startsWith('[')) {
		return parseIosFile(messages);
	} else {
		return parseAndroidFile(messages);
	}
}

const numberStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const currentDate = new Date(Date.now());

function parseAndroidFile(messages: string): ChatData {
	const lines = messages.split('\n');
	const chatData: ChatData = {
		messages: [],
		usernames: [],
	};
	let lineRemainder = '';
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i] + '';
		if(line.split(':').length-1 < 2) continue;
		if(!(numberStrings.includes(line[0]) && numberStrings.includes(line[1]) && line[2] == '.' )) {
			lineRemainder += line;
			continue;
		} else {
			line += lineRemainder;
			lineRemainder = '';	
		}
		const message = line.split(': ')[1];
		const dateTime = parseDateAndroid(line.split(': ')[0].split(' - ')[0]);
		let username = line.split(': ')[0].split(' - ')[1];


		if(username.startsWith(' ')) username = username.slice(1);

		// only current year
		if(dateTime.getFullYear() != currentDate.getFullYear() && currentDate.getMonth() >= 6) continue;

		chatData.messages.push({
			message,
			dateTime,
			username
		});
		if(!chatData.usernames.includes(username)) {
			chatData.usernames.push(username);
		}
	}
	return chatData;
}

function parseDateAndroid(str: string) {
	// Split date and time
	const [datePart, timePart] = str.split(', ');

	// Reformat date from dd.mm.yy to mm/dd/yyyy
	let [day, month, year] = datePart.split('.');
	year = '20' + year; // Adjusting year from yy to yyyy

	// Combine date and time in a standard format
	const standardFormat = `${month}/${day}/${year} ${timePart}`;

	// Create a Date object
	return new Date(standardFormat);
}

function parseIosFile(messages: string): ChatData {
	const lines = messages.split('\n');
	const chatData: ChatData = {
		messages: [],
		usernames: [],
	};
	let lineRemainder = '';
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i] + '';
		if(!line.startsWith('[')) {
			lineRemainder += line;
			continue;
		} else {
			line += lineRemainder;
			lineRemainder = '';	
		}
		const message = line.split(']')[1].split(': ')[1];
		const dateTime = parseDateIos(line.split('] ')[0].slice(1));
		let username = line.split(']')[1].split(': ')[0];

		if(username.startsWith(' ')) username = username.slice(1);

		if(dateTime.getFullYear() != currentDate.getFullYear() && currentDate.getMonth() >= 6) continue;

		chatData.messages.push({
			message,
			dateTime,
			username
		});
		if(!chatData.usernames.includes(username)) {
			chatData.usernames.push(username);
		}
	}
	return chatData;
}


function parseDateIos(str: string) {
    // Split date and time
    const [datePart, timePart] = str.split(', ');

    // Reformat date from dd.mm.yy to mm/dd/yyyy
    let [day, month, year] = datePart.split('.');
    year = '20' + year; // Adjusting year from yy to yyyy

    // Combine date and time in a standard format
    const standardFormat = `${month}/${day}/${year} ${timePart}`;

    // Create a Date object
    return new Date(standardFormat);
}

export interface ChatData {
	messages: ParsedMessage[];
	usernames: string[];
}

export interface ParsedMessage {
	message: string;
	dateTime: Date;
	username: string;
}