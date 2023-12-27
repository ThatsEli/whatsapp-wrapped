import { ChatData, ParsedMessage } from "../ChatParser";

export function analyzeHours(chatData: ChatData): HourData {
    const months: HourData = {
        hours: [],
    };
    chatData.messages.forEach((message: ParsedMessage) => {
        const hour = message.dateTime.getHours();
        if(months.hours[hour]) {
            months.hours[hour].count++;
        } else {
            months.hours[hour] = {
                index: hour,
                count: 1,
            };
        }
    });
    return months;
}

export interface HourData {
    hours: {
        index: number,
        count: number,
    }[]
}