import { ChatData, ParsedMessage } from "../ChatParser";

export function analyzeMonths(chatData: ChatData): MonthData {
    const months: MonthData = {
        months: [],
    };
    for (let i = 0; i < 12; i++) {
        months.months.push({
            index: i,
            name: new Date(0, i).toLocaleString('default', { month: 'long' }),
            count: 0,
        });
    }
    chatData.messages.forEach((message: ParsedMessage) => {
        const month = message.dateTime.getMonth();
        months.months[month].count++;
    });
    return months;
}

export interface MonthData {
    months: {
        index: number,
        name: string,
        count: number,
    }[]
}