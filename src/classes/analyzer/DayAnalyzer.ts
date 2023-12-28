import { ChatData, ParsedMessage } from "../ChatParser";

const currentYear = new Date(Date.now()).getFullYear();

export function analyzeDays(chatData: ChatData): DayData {
    const days: DayData = {
        days: [],
    };
    for (let i  = 0; i < 366; i++) {
        days.days.push({
            index: i,
            date: new Date(currentYear, 0, i),
            count: 0,
        });
    }
    chatData.messages.forEach((message: ParsedMessage) => {
        const day = daysIntoYear(message.dateTime);
        days.days[day].count++;
    });
    return days;
}

function daysIntoYear(date: Date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

export interface DayData {
    days: {
        index: number,
        date: Date,
        count: number,
    }[]
}