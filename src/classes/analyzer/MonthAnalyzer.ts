import { ChatData, ParsedMessage } from "../ChatParser";

export function analyzeMonths(chatData: ChatData): MonthData {
    const months: MonthData = {
        months: [],
    };
    chatData.messages.forEach((message: ParsedMessage) => {
        const month = message.dateTime.getMonth();
        if(months.months[month]) {
            months.months[month].count++;
        } else {
            months.months[month] = {
                index: month,
                name: message.dateTime.toLocaleString('default', { month: 'long' }),
                count: 1,
            };
        }
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