import { ChatData, ParsedMessage } from "../ChatParser";

export function analyzeHours(chatData: ChatData): HourData {
    const months: HourData = {
        hours: [],
    };
    for (let i = 0; i < 24; i++) {
        months.hours.push({
            index: i,
            count: 0,
        });
    }
    chatData.messages.forEach((message: ParsedMessage) => {
        const hour = message.dateTime.getHours();
        months.hours[hour].count++;
    });
    return months;
}

export interface HourData {
    hours: {
        index: number,
        count: number,
    }[]
}