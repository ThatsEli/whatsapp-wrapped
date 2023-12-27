export function parseChatMessages(messages: string): ChatData {
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
		const dateTime = parseDate(line.split('] ')[0].slice(1));
		const username = line.split(']')[1].split(': ')[0];

		if(dateTime.getFullYear() != new Date(Date.now()).getFullYear()) continue;

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

function parseDate(str: string) {
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