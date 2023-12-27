import { ChatData, ParsedMessage } from "../ChatParser";

export function analyzeDays(chatData: ChatData): DayData {
    const days: DayData = {
        days: [],
    };
    chatData.messages.forEach((message: ParsedMessage) => {
        const day = daysIntoYear(message.dateTime);
        if(days.days[day]) {
            days.days[day].count++;
        } else {
            days.days[day] = {
                index: day,
                count: 1,
            };
        }
    });
    return days;
}

function daysIntoYear(date: Date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

export interface DayData {
    days: {
        index: number,
        count: number,
    }[]
}